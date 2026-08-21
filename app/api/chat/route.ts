import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

import { servicesToolDefinition, handleGetServices } from '@/tools/services.tool';
import { siteSettingsToolDefinition, handleGetSiteSettings } from '@/tools/siteSettings.tool';
import { faqsToolDefinition, handleGetFaqs } from '@/tools/faqs.tool';
import { acCalculatorToolDefinition, handleCalculateAcCapacity } from '@/tools/acCalculator.tool';
import { productsToolDefinition, handleGetProducts } from '@/tools/products.tool';
import { portofoliosToolDefinition, handleGetPortofolios } from '@/tools/portofolios.tool';
import { testimonialsToolDefinition, handleGetTestimonials } from '@/tools/testimonials.tool';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

const tools = [
  servicesToolDefinition,
  siteSettingsToolDefinition,
  faqsToolDefinition,
  acCalculatorToolDefinition,
  productsToolDefinition,
  portofoliosToolDefinition,
  testimonialsToolDefinition,
];

async function executeTool(name: string, args: any) {
  try {
    switch (name) {
      case 'get_services':
        return await handleGetServices(args);
      case 'get_site_settings':
        return await handleGetSiteSettings();
      case 'get_faqs':
        return await handleGetFaqs(args);
      case 'calculate_ac_capacity':
        return await handleCalculateAcCapacity(args);
      case 'get_products':
        return await handleGetProducts(args);
      case 'get_portofolios':
        return await handleGetPortofolios(args);
      case 'get_testimonials':
        return await handleGetTestimonials(args);
      default:
        return { success: false, message: 'Tool tidak ditemukan' };
    }
  } catch (err: any) {
    console.error(`❌ Error saat eksekusi tool [${name}]:`, err);
    return { success: false, message: 'Gagal mengeksekusi kueri database.' };
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error('❌ GROQ_API_KEY belum diset di .env.local');
      return NextResponse.json(
        { error: 'GROQ_API_KEY tidak terdeteksi.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const inputMessages = body.messages || [];

    const systemPrompt = `
    Anda adalah Customer Service Virtual resmi toko elektronik & pemeliharaan AC.

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
    `;
    // Buat daftar percakapan dasar
    const conversation: any[] = [
      { role: 'system', content: systemPrompt },
      ...inputMessages,
    ];

    // Response awal dari Groq
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: conversation,
      tools: tools as any,
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0]?.message;

    // Jika AI memilih menggunakan Tool Call
    if (responseMessage?.tool_calls && responseMessage.tool_calls.length > 0) {
      // Masukkan respon assistant beserta spesifikasi tool_calls ke riwayat
      conversation.push({
        role: 'assistant',
        content: responseMessage.content || null,
        tool_calls: responseMessage.tool_calls,
      });

      // Proses tiap tool call
      for (const toolCall of responseMessage.tool_calls) {
        let functionArgs = {};
        if (toolCall.function.arguments) {
          try {
            functionArgs = JSON.parse(toolCall.function.arguments);
          } catch (e) {
            functionArgs = {};
          }
        }

        const toolResult = await executeTool(toolCall.function.name, functionArgs);

        // Masukkan hasil ke percakapan dengan role 'tool'
        conversation.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        });
      }

      // Kirim kembali riwayat utuh ke Groq untuk menyusun jawaban akhir
      const secondResponse = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: conversation,
      });

      return NextResponse.json({
        message:
          secondResponse.choices[0]?.message?.content ||
          'Mohon maaf, terjadi kendala saat memproses jawaban.',
      });
    }

    return NextResponse.json({
      message: responseMessage?.content || 'Mohon maaf, tidak ada respon.',
    });
  } catch (error: any) {
    console.error('❌ ERROR DETECTED DI ROUTE CHAT:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}