import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Import Tools dan Handlers Terpisah
import { servicesToolDefinition, handleGetServices } from '@/tools/services.tool';
import { siteSettingsToolDefinition, handleGetSiteSettings } from '@/tools/siteSettings.tool';
import { faqsToolDefinition, handleGetFaqs } from '@/tools/faqs.tool';
import { acCalculatorToolDefinition, handleCalculateAcCapacity } from '@/tools/acCalculator.tool';
import { productsToolDefinition, handleGetProducts } from '@/tools/products.tool';
import { portofoliosToolDefinition, handleGetPortofolios } from '@/tools/portofolios.tool';
import { testimonialsToolDefinition, handleGetTestimonials } from '@/tools/testimonials.tool';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Gabungkan semua definisi tool
// s
const tools = [
  servicesToolDefinition,
  siteSettingsToolDefinition,
  faqsToolDefinition,
  acCalculatorToolDefinition,
  productsToolDefinition,
  portofoliosToolDefinition,
  testimonialsToolDefinition,
];

// Router sederhana untuk mengarahkan panggil fungsi
async function executeTool(name: string, args: any) {
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
      return { error: 'Tool tidak ditemukan' };
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
    Anda adalah CS Virtual toko elektronik.
    ATURAN WAJIB PEMANGGILAN TOOL:
    1. Jika pengguna bertanya tentang "produk", "barang", "AC", "stok", atau "harga produk", Anda WAJIB memanggil tool 'get_products'.
    2. Jika pengguna bertanya tentang "testimoni", "ulasan", "review", atau "kepuasan pelanggan", Anda WAJIB memanggil tool 'get_testimonials'.
    3. Jika pengguna bertanya tentang "portofolio", "hasil kerja", "dokumentasi", atau "contoh proyek", Anda WAJIB memanggil tool 'get_portofolios'.

    Jangan menjawab berdasarkan asumsi sendiri, selalu gunakan data dari tool!
    `;

    const conversationMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    let response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: conversationMessages,
      tools: tools,
      tool_choice: 'auto',
    });

    let responseMessage = response.choices[0]?.message;

    if (responseMessage?.tool_calls) {
      conversationMessages.push(responseMessage as any);

      for (const toolCall of responseMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        // Eksekusi tool spesifik
        const toolResult = await executeTool(functionName, functionArgs);

        conversationMessages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        } as any);
      }

      const secondResponse = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: conversationMessages,
      });

      return NextResponse.json({
        message: secondResponse.choices[0]?.message?.content,
      });
    }

    return NextResponse.json({
      message: responseMessage?.content,
    });
  } catch (error: any) {
    console.error('Error Chatbot:', error);
    return NextResponse.json({ error: error?.message || 'Internal Server Error' }, { status: 500 });
  }
}