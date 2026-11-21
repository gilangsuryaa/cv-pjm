import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { servicesToolDefinition, handleGetServices } from '@/tools/services.tool';
import { siteSettingsToolDefinition, handleGetSiteSettings } from '@/tools/siteSettings.tool';
import { faqsToolDefinition, handleGetFaqs } from '@/tools/faqs.tool';
import { acCalculatorToolDefinition, handleCalculateAcCapacity } from '@/tools/acCalculator.tool';
import { productsToolDefinition, handleGetProducts } from '@/tools/products.tool';
import { albumsToolDefinition, handleGetAlbums } from '@/tools/albums.tool';

// Nutaraline: gateway OpenAI-compatible yang meneruskan permintaan ke DeepSeek.
// Satu pertanyaan bisa memicu dua round-trip (pilih tool, lalu bawa hasil query
// database) yang masing-masing memakan waktu, jadi batas default Vercel dinaikkan.
export const maxDuration = 60;

// Rantai model: utama dipakai dulu, sisanya cadangan bila utama gagal
// (misal model dihapus penyedia seperti yang pernah terjadi pada DeepSeek).
// Semua model cadangan wajib mendukung function calling — cek GET /v1/models.
const MODEL_CHAIN = [
  process.env.NUTARALINE_MODEL || 'deepseek-v4.1-flash-1017',
  'glm-5.3-flash:flex',
  'glm-5.3-flash',
];
const MAX_TOKENS = 8192;

// Error yang masuk akal untuk dicoba ke model lain: model hilang/tidak ada,
// saldo/kuota model itu (402), rate limit (429), atau gangguan penyedia (5xx).
// Model yang hilang ternyata dilaporkan gateway sebagai 400 "model is not in
// this gateway catalog", jadi 400 dengan pesan tentang model ikut di-retry.
// 401 (kunci salah) dan 413 (input kepanjangan) tidak berguna di-retry.
function isRetryableModelError(err: unknown): boolean {
  if (err instanceof OpenAI.APIError) {
    if ([402, 404, 429, 500, 502, 503, 504].includes(err.status ?? 0)) return true;
    const msg = err.message.toLowerCase();
    return (err.status ?? 0) === 400 && (msg.includes('model') || msg.includes('catalog'));
  }
  // Koneksi ke gateway terputus (DNS, timeout, dll).
  return err instanceof OpenAI.APIConnectionError;
}

// maxRetries dimatikan mengikuti anjuran dokumentasi Nutaraline: permintaan yang
// sudah terkirim tetapi hasilnya belum jelas bisa tercatat dua kali di saldo.
// Client dibuat lazy: SDK openai melempar error saat modul dievaluasi bila apiKey
// kosong, dan `next build` ikut mengevaluasi modul route sebelum env terpasang.
let cachedClient: OpenAI | null = null;

function getAiClient() {
  if (!cachedClient) {
    cachedClient = new OpenAI({
      baseURL: 'https://nutaraline.co.uk/v1',
      apiKey: process.env.NUTARALINE_API_KEY as string,
      maxRetries: 0,
    });
  }
  return cachedClient;
}

async function executeTool(name: string, args: Record<string, unknown>) {
  try {
    switch (name) {
      case 'get_services':
        return await handleGetServices(args);
      case 'get_site_settings':
        return await handleGetSiteSettings();
      case 'get_faqs':
        return await handleGetFaqs(args);
      case 'calculate_ac_capacity':
        return await handleCalculateAcCapacity(args as unknown as { length: number; width: number });
      case 'get_products':
        return await handleGetProducts(args);
      case 'get_albums':
        return await handleGetAlbums(args);
      default:
        return { success: false, message: 'Tool tidak ditemukan' };
    }
  } catch (err: unknown) {
    console.error(`❌ Error saat eksekusi tool [${name}]:`, err);
    return { success: false, message: 'Gagal mengeksekusi kueri database.' };
  }
}

// Definisi tool di folder tools/ sudah berformat Chat Completions, jadi dipakai apa adanya.
const tools = [
  servicesToolDefinition,
  siteSettingsToolDefinition,
  faqsToolDefinition,
  acCalculatorToolDefinition,
  productsToolDefinition,
  albumsToolDefinition,
] as OpenAI.Chat.Completions.ChatCompletionTool[];

type ChatMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;

function buildSystemInstruction() {
  return `
    Anda adalah CS Virtual toko elektronik bernama CV PRIMA JAYA MANDIRI, perusahaan yang bergerak di bidang penjualan dan layanan elektronik khususnya AC.
    Sapa pelanggan yang berkunjung ke toko virtual ini dengan ramah dan informatif. Tanyakan kebutuhan mereka terkait produk elektronik, terutama AC, dan berikan rekomendasi yang sesuai.

    ATURAN DOKUMEN & LINK:
    1. Ketika merekomendasikan PRODUK dari database, SELALU sematkan link clickable dengan format Markdown:
       [nama_produk](https://cv-pjm.vercel.app/products/{id})
       Contoh: Saya rekomendasikan [Daikin 1 PK Inverter](https://cv-pjm.vercel.app/products/5) dengan harga terjangkau.
       WAJIB gunakan ID produk dari database. Link harus bisa langsung diklik user.

    2. Ketika memberikan nomor WhatsApp/telepon, SELALU gunakan format clickable wa.me:
       📱 WhatsApp: [0851 9428 8390](https://wa.me/6285194288390)
       Atau saat user tertarik produk:
       Klik [Chat WhatsApp](https://wa.me/6285194288390?text=Saya%20tertarik%20dengan%20AC%20split) untuk konsultasi lebih lanjut.
       Format: https://wa.me/{kode_negara}{nomor_tanpa_0}
       Contoh nomor 0851 9428 8390 -> https://wa.me/6285194288390

    3. Ketika memberikan link Google Maps, gunakan format clickable: 
       📍 **Lokasi:** [Buka di Google Maps](https://www.google.com/maps?q=-6.8463066,108.8097641&z=17&hl=id)

    PANDUAN MEMBUAT REKOMENDASI PRODUK:
    - Tampilkan nama produk, harga, spesifikasi (PK, daya, brand) dalam format tersusun.
    - Sertakan link produk yang clickable setelah nama produk.
    - Contoh format: 
      "Berikut rekomendasi AC untuk Anda:
      1. [AC Daikin 1 PK Inverter](https://cv-pjm.vercel.app/products/5) - Rp 2.500.000
         • Brand: Daikin
         • Kapasitas: 1 PK
         • Tipe: Inverter
      
      Tertarik? [Hubungi kami via WhatsApp](https://wa.me/6285194288390)"

    ATURAN UTAMA LINDUNGI DATA DATABASE:
    1. HANYA GUNAKAN DATA DATABASE: Anda HANYA BOLEH memberikan informasi harga, produk, atau layanan berdasarkan data dari tool database Supabase.
    2. JIKA DATA TIDAK ADA DI DATABASE:
        Halo! Mohon maaf, untuk saat ini rincian biaya [nama layanan/produk] belum tercantum di dalam katalog kami.
        
        Karena kebutuhan [nama layanan/produk] setiap bangunan berbeda-beda (tergantung luas area, titik stopkontak, dan jalur kabel), kami sarankan untuk berkonsultasi langsung dengan tim teknis kami.
        
        Hubungi kami untuk penawaran & estimasi harga gratis:
        📲 WhatsApp CS: 0817 263 597
        📞 Telepon: 0231 831 597
        
        Tim kami siap membantu menghitung estimasi biaya sesuai kebutuhan lokasi Anda!

    PEMANGGILAN TOOL:
    1. Jika bertanya tentang "layanan", "instalasi", "cuci AC", "pasang AC", "servis", panggil tool 'get_services'.
    2. Jika bertanya tentang "produk", "barang", "AC", "stok", "harga produk", panggil tool 'get_products'.
    3. Jika bertanya tentang "kontak", "alamat", "WhatsApp", panggil tool 'get_site_settings'.
    4. Jika bertanya tentang "garansi", "pembayaran", panggil tool 'get_faqs'.
    5. Jika bertanya tentang "portofolio", "hasil kerja", "proyek", atau "dokumentasi pengerjaan", panggil tool 'get_albums'.
    6. Jika bertanya saran ukuran AC/ruangan, panggil tool 'calculate_ac_capacity'.

    Tugas kamu fokus pada topik terkait produk elektronik, terutama AC, dan memberikan informasi yang akurat serta relevan.
    Jangan berikan jawaban yang tidak relevan dengan topik ini. Jika pertanyaan pengguna tidak terkait dengan produk elektronik atau AC, arahkan mereka untuk menghubungi layanan pelanggan kami.
    `;
}

function statusForGatewayError(status: number | undefined, message: string) {
  switch (status) {
    case 401:
    case 403:
      return { httpStatus: 502, error: 'Kunci API penyedia ditolak. Hubungi admin situs.' };
    case 402:
      return { httpStatus: 503, error: 'Kuota layanan AI habis. Hubungi admin situs.' };
    case 413:
      return { httpStatus: 413, error: 'Percakapan terlalu panjang. Mulai chat baru.' };
    case 429:
      return { httpStatus: 429, error: 'Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.' };
    default:
      return { httpStatus: 502, error: message };
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.NUTARALINE_API_KEY) {
      console.error('❌ NUTARALINE_API_KEY belum diset di .env.local');
      return NextResponse.json(
        { error: 'NUTARALINE_API_KEY tidak terdeteksi.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const inputMessages: { role: string; content?: string }[] = body.messages || [];

    const messages: ChatMessage[] = [
      { role: 'system', content: buildSystemInstruction() },
      ...inputMessages
        .filter((msg) => msg.content && msg.content.trim().length > 0)
        .map<ChatMessage>((msg) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content as string,
        })),
    ];

    const ai = getAiClient();

    // Coba tiap model di rantai sampai satu berhasil. Tool dieksekusi ulang per
    // percobaan, tapi query Supabase murah dan hasilnya selalu segar.
    let lastModelError: unknown = null;

    for (const model of MODEL_CHAIN) {
      try {
        // Round-trip pertama: model memutuskan perlu tool atau tidak.
        const initialResponse = await ai.chat.completions.create({
          model,
          messages,
          tools,
          tool_choice: 'auto',
          max_tokens: MAX_TOKENS,
        });

        const initialMessage = initialResponse.choices[0]?.message;
        // Hanya tool call bertipe 'function' yang bisa dieksekusi; tipe 'custom' dilewati.
        const toolCalls = (initialMessage?.tool_calls ?? []).filter(
          (call): call is OpenAI.Chat.Completions.ChatCompletionMessageFunctionToolCall =>
            call.type === 'function'
        );

        if (toolCalls.length === 0) {
          return NextResponse.json({
            message: initialMessage?.content || 'Mohon maaf, tidak ada respon.',
          });
        }

        // Simpan pesan assistant yang meminta tool apa adanya (content bisa null).
        messages.push({
          role: 'assistant',
          content: initialMessage?.content ?? null,
          tool_calls: toolCalls,
        });

        // Nutaraline hanya meneruskan permintaan tool, eksekusinya tetap di sini.
        for (const call of toolCalls) {
          let parsedArgs: Record<string, unknown> = {};
          try {
            parsedArgs = call.function.arguments ? JSON.parse(call.function.arguments) : {};
          } catch {
            console.error(`❌ Argumen tool tidak valid [${call.function.name}]:`, call.function.arguments);
          }

          const toolResult = await executeTool(call.function.name, parsedArgs);

          messages.push({
            role: 'tool',
            tool_call_id: call.id,
            content: JSON.stringify(toolResult),
          });
        }

        // Round-trip kedua: model menyusun jawaban dari data database.
        const secondResponse = await ai.chat.completions.create({
          model,
          messages,
          tools,
          max_tokens: MAX_TOKENS,
        });

        return NextResponse.json({
          message:
            secondResponse.choices[0]?.message?.content ||
            'Mohon maaf, terjadi kendala saat memproses jawaban.',
        });
      } catch (err: unknown) {
        lastModelError = err;

        if (!isRetryableModelError(err)) throw err;

        const status = err instanceof OpenAI.APIError ? err.status : '-';
        console.warn(`⚠️ Model [${model}] gagal (status ${status}), mencoba model cadangan berikutnya...`);
      }
    }

    // Semua model di rantai gagal — lempar error terakhir agar masuk handler umum.
    throw lastModelError;
  } catch (error: unknown) {
    console.error('❌ ERROR DETECTED DI ROUTE CHAT:', error);

    if (error instanceof OpenAI.APIError) {
      const mapped = statusForGatewayError(error.status, error.message);
      return NextResponse.json({ error: mapped.error }, { status: mapped.httpStatus });
    }

    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
