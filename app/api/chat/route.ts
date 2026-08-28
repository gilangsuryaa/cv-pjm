import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

import { servicesToolDefinition, handleGetServices } from '@/tools/services.tool';
import { siteSettingsToolDefinition, handleGetSiteSettings } from '@/tools/siteSettings.tool';
import { faqsToolDefinition, handleGetFaqs } from '@/tools/faqs.tool';
import { acCalculatorToolDefinition, handleCalculateAcCapacity } from '@/tools/acCalculator.tool';
import { productsToolDefinition, handleGetProducts } from '@/tools/products.tool';
import { portofoliosToolDefinition, handleGetPortofolios } from '@/tools/portofolios.tool';
import { testimonialsToolDefinition, handleGetTestimonials } from '@/tools/testimonials.tool';

// Inisialisasi Google Gen AI Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

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
      case 'get_portofolios':
        return await handleGetPortofolios(args);
      case 'get_testimonials':
        return await handleGetTestimonials(args);
      default:
        return { success: false, message: 'Tool tidak ditemukan' };
    }
  } catch (err: unknown) {
    console.error(`❌ Error saat eksekusi tool [${name}]:`, err);
    return { success: false, message: 'Gagal mengeksekusi kueri database.' };
  }
}

// Konversi Tool Definitions ke format Function Declarations yang dikenali SDK Gemini
const functionDeclarations = [
  servicesToolDefinition,
  siteSettingsToolDefinition,
  faqsToolDefinition,
  acCalculatorToolDefinition,
  productsToolDefinition,
  portofoliosToolDefinition,
  testimonialsToolDefinition,
].map((tool: Record<string, unknown>) => {
  // Jika definisi tool Anda sudah berformat OpenAPI / JSON Schema bawaan
  if (tool.function) {
    const fn = tool.function as { name: string; description: string; parameters: unknown };
    return {
      name: fn.name,
      description: fn.description,
      parameters: fn.parameters,
    };
  }
  return tool;
});

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY belum diset di .env.local');
      return NextResponse.json(
        { error: 'GEMINI_API_KEY tidak terdeteksi.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const inputMessages = body.messages || [];

    const systemInstruction = `
    Anda adalah CS Virtual toko elektronik bernama CV PRIMA JAYA MANDIRI, perusahaan yang bergerak di bidang penjualan dan layanan elektronik khususnya AC.
    Sapa pelanggan yang berkunjung ke toko virtual ini dengan ramah dan informatif. Tanyakan kebutuhan mereka terkait produk elektronik, terutama AC, dan berikan rekomendasi yang sesuai.

    ATURAN DOKUMEN & LINK:
    1. Ketika memberikan link Google Maps, SELALU gunakan format ringkas: 
        📍 **Lokasi:** [Buka di Google Maps](https://www.google.com/maps?q=-6.8463066,108.8097641&z=17&hl=id)
        DILARANG menempelkan URL panjang tanpa penutup format Markdown.

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
    5. Jika bertanya tentang "testimoni", "ulasan", panggil tool 'get_testimonials'.
    6. Jika bertanya tentang "portofolio", "hasil kerja", panggil tool 'get_portofolios'.
    7. Jika bertanya saran ukuran AC/ruangan, panggil tool 'calculate_ac_capacity'.

    Tugas kamu fokus pada topik terkait produk elektronik, terutama AC, dan memberikan informasi yang akurat serta relevan.
    Jangan berikan jawaban yang tidak relevan dengan topik ini. Jika pertanyaan pengguna tidak terkait dengan produk elektronik atau AC, arahkan mereka untuk menghubungi layanan pelanggan kami.
    `;

    // Konversi riwayat obrolan dari format OpenAI/Groq (user, assistant, tool) ke format Gemini Contents (user, model)
    const contents: Record<string, unknown>[] = inputMessages.map((msg: { role: string; content?: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content || '' }],
    }));

    // Pemanggilan awal ke Gemini
    const initialResponse = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations }],
      },
    });

    // Cek apakah Gemini meminta pemanggilan function/tool
    const functionCalls = initialResponse.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      // Masukkan respon model yang meminta eksekusi tool ke riwayat percakapan
      contents.push(initialResponse.candidates?.[0]?.content as Record<string, unknown>);

      const toolResponseParts = [];

      for (const call of functionCalls) {
        const toolResult = await executeTool(call.name ?? '', call.args as Record<string, unknown>);

        // Tambahkan hasil eksekusi tool sebagai part 'functionResponse'
        toolResponseParts.push({
          functionResponse: {
            name: call.name,
            response: { result: toolResult },
          },
        });
      }

      // Masukkan hasil tool balik ke percakapan dengan role 'user'
      contents.push({
        role: 'user',
        parts: toolResponseParts,
      });

      // Panggil kembali Gemini dengan membawa data hasil tool
      const secondResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents,
        config: {
          systemInstruction,
          tools: [{ functionDeclarations }],
        },
      });

      return NextResponse.json({
        message:
          secondResponse.text ||
          'Mohon maaf, terjadi kendala saat memproses jawaban.',
      });
    }

    return NextResponse.json({
      message: initialResponse.text || 'Mohon maaf, tidak ada respon.',
    });
  } catch (error: unknown) {
    console.error('❌ ERROR DETECTED DI ROUTE CHAT:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}