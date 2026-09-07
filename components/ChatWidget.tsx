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
  }, [messages, loading, isOpen]);

  const handleSendMessage = async (textToSend?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: query };
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
        <div className="mb-4 flex h-[580px] w-[360px] sm:w-[400px] flex-col rounded-3xl border border-slate-100 bg-white/95 backdrop-blur-md shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-6 overflow-hidden">
          
          {/* Header Popup Premium */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 px-5 py-4 text-white shadow-md">
            <div className="flex items-center gap-3">
              {/* Avatar Logo */}
              <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/30 bg-white p-1 shadow-sm transition-transform hover:scale-105">
                <Image
                  src="/popup.png"
                  alt="PJM Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm tracking-wide text-white">PJM Assistant</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300 border border-emerald-400/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <span className="text-[11px] text-blue-100/90 font-normal">CV Prima Jaya Mandiri</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-white/70 transition-all hover:bg-white/10 hover:text-white active:scale-95"
              title="Tutup Chat"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Area Pesan Chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 scrollbar-thin scrollbar-thumb-slate-200">
            {/* WELCOME SCREEN ESTETIK */}
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-full text-center px-3 py-4 space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-lg"></div>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-800">Halo! Ada yang bisa kami bantu? 👋</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[260px] leading-relaxed">
                    Saya asisten virtual PJM, siap membantu seputar paket cuci AC, pasang baru, maupun kalkulasi PK AC.
                  </p>
                </div>

                {/* Quick Recommendation Chips */}
                <div className="w-full space-y-2 pt-2">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pertanyaan Populer</p>
                  <div className="flex flex-col gap-1.5">
                    {[
                      '📌 Lokasi toko & nomor kontak',
                      '🔧 Biaya jasa cuci & pasang AC',
                      '🧮 Hitung kapasitas AC ruangan',
                    ].map((item, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(item)}
                        className="w-full text-left text-xs bg-white hover:bg-blue-50/80 text-slate-700 hover:text-blue-600 border border-slate-200/80 hover:border-blue-200 px-3.5 py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99] font-medium flex items-center justify-between group"
                      >
                        <span>{item}</span>
                        <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* MESSAGE LIST */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start items-end'}`}
              >
                {/* Avatar Bot */}
                {msg.role === 'assistant' && (
                  <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm mb-0.5">
                    <Image
                      src="/popup.png"
                      alt="PJM Avatar"
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs shadow-md shadow-blue-500/10 font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/60 shadow-sm rounded-bl-xs'
                  }`}
                >
                  <div className="break-words [overflow-wrap:anywhere]">
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
                            >
                              {children}
                            </a>
                          ),
                          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                          ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1 text-slate-700">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1 text-slate-700">{children}</ol>,
                          strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-blue-500 pl-3 italic text-slate-600 my-2 bg-blue-50/50 py-1.5 rounded-r-lg">
                              {children}
                            </blockquote>
                          ),
                          table: ({ children }) => (
                            <div className="my-3 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                              <table className="w-full text-left text-xs border-collapse">{children}</table>
                            </div>
                          ),
                          thead: ({ children }) => <thead className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">{children}</thead>,
                          th: ({ children }) => <th className="p-2.5 border-r border-slate-200 last:border-r-0 whitespace-nowrap">{children}</th>,
                          td: ({ children }) => <td className="p-2.5 border-t border-r border-slate-100 last:border-r-0 whitespace-nowrap">{children}</td>,
                          tr: ({ children }) => <tr className="hover:bg-slate-50 transition-colors">{children}</tr>,
                          hr: () => <hr className="my-3 border-slate-200" />,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* INDIKATOR LOADING TYPING */}
            {loading && (
              <div className="flex justify-start items-end gap-2.5">
                <div className="relative h-7 w-7 flex-shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm mb-0.5">
                  <Image
                    src="/popup.png"
                    alt="PJM Avatar"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200/80 rounded-2xl rounded-bl-xs px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Chat */}
          <div className="p-3.5 border-t border-slate-100 bg-white">
            <form onSubmit={(e) => handleSendMessage(undefined, e)} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan Anda..."
                disabled={loading}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:opacity-95 active:scale-95 disabled:opacity-40 disabled:active:scale-100 transition-all flex-shrink-0"
                aria-label="Kirim Pesan"
              >
                <svg className="w-4 h-4 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9-7-9-7-9 7 9 7zm0 0v-7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tombol Melayang Toggle dengan Logo PJM */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white p-1 shadow-[0_10px_25px_rgba(0,0,0,0.15)] ring-2 ring-blue-600/20 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none group"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          // Ikon X saat Chat Terbuka
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-inner">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ) : (
          // Logo PJM saat Chat Tertutup
          <div className="relative h-full w-full overflow-hidden rounded-full border border-slate-100">
            <Image
              src="/logo.png"
              alt="PJM Assistant"
              fill
              sizes="56px"
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
      </button>
    </div>
  );
}