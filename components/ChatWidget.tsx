'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (res.ok && data.message) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.message }]);
      } else {
        setMessages([
          ...updatedMessages,
          { role: 'assistant', content: 'Maaf, terjadi masalah saat menghubungkan ke server. Silakan coba lagi.' },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'Maaf, gagal mengirim pesan. Periksa koneksi internet Anda.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* JENDELA POPUP CHATBOT */}
      {isOpen && (
        <div className="mb-4 flex h-[550px] w-[360px] sm:w-[420px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300">
          
          {/* Header Popup */}
          <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 px-4 py-3 text-white shadow-sm">
            <div className="flex items-center gap-3">
              {/* Mini Avatar Logo di Header */}
              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/30 bg-white p-0.5">
                <Image
                  src="/popup.png"
                  alt="PJM Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-none">PJM Virtual Assistant</h3>
                <span className="text-[11px] text-blue-100">Toko Elektronik & Layanan AC</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/80 transition-colors hover:bg-blue-700 hover:text-white"
              title="Tutup Chat"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Area Pesan Chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {/* TAMPILAN AWAL / WELCOME SCREEN DENGAN LOGO */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-3 px-2">
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl p-2 bg-white shadow-md border border-gray-100 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="PJM Virtual Assistant"
                    width={112}
                    height={112}
                    priority
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-800">Selamat Datang!</h4>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">PJM Virtual Assistant</p>
                </div>
                <p className="text-xs text-gray-500 max-w-[280px] leading-relaxed">
                  Ada yang bisa kami bantu seputar produk elektronik, layanan servis AC, harga, atau saran ukuran AC?
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  <div className="break-words [overflow-wrap:anywhere] max-w-full overflow-hidden">
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-line">{msg.content}</p>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
                            >
                              {children}
                            </a>
                          ),
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>,
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-blue-500 pl-3 italic text-gray-600 my-2 bg-blue-50/50 py-1 rounded-r-md">
                              {children}
                            </blockquote>
                          ),
                          table: ({ children }) => (
                            <div className="my-3 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                              <table className="w-full text-left text-xs border-collapse">{children}</table>
                            </div>
                          ),
                          thead: ({ children }) => <thead className="bg-blue-50 text-blue-900 border-b border-gray-200">{children}</thead>,
                          th: ({ children }) => <th className="p-2 font-semibold border-r border-gray-200 last:border-r-0 whitespace-nowrap">{children}</th>,
                          td: ({ children }) => <td className="p-2 border-t border-r border-gray-100 last:border-r-0 whitespace-nowrap">{children}</td>,
                          tr: ({ children }) => <tr className="hover:bg-gray-50/80 transition-colors">{children}</tr>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-2xl px-4 py-2.5 text-xs text-gray-500 shadow-sm">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:0.4s]"></span>
                  <span className="ml-1 text-[11px]">Memproses...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Chat */}
          <div className="p-3 border-t bg-white rounded-b-2xl">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan Anda..."
                className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 font-medium bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tombol Melayang Toggle dengan Logo PJM */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-1.5 shadow-xl ring-2 ring-blue-600 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          // Ikon X saat Chat Terbuka
          <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-white">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ) : (
          // Logo PJM saat Chat Tertutup
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src="/logo.png"
              alt="PJM Assistant"
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
        )}
      </button>
    </div>
  );
}