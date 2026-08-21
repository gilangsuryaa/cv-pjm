'use client';

import { useState, useRef, useEffect } from 'react';

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

  // Helper untuk merender Tautan Markdown [Teks](URL) agar rapi & tidak meluap (overflow)
  const renderFormattedContent = (content: string, isUser: boolean) => {
    const lines = content.split('\n');
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    return lines.map((line, lineIdx) => {
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = markdownLinkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }

        const label = match[1];
        const url = match[2];
        parts.push(
          <a
            key={match.index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold underline transition-colors ${
              isUser ? 'text-white hover:text-blue-100' : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            {label}
          </a>
        );

        lastIndex = markdownLinkRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return (
        <span key={lineIdx} className="block min-h-[1.25rem]">
          {parts.length > 0 ? parts : line}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* POPUP CHATBOT */}
      {isOpen && (
        <div className="mb-4 flex h-[520px] w-[350px] sm:w-[380px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-2xl bg-blue-600 px-4 py-3 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-none">Customer Service Virtual</h3>
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

          {/* Area Pesan */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-2">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-xs font-medium text-gray-700">Halo! Selamat datang.</p>
                <p className="text-[11px] text-gray-500 px-4">
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
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {/* Container Penjaga Layat & Overflow */}
                  <div className="break-words [overflow-wrap:anywhere] max-w-full overflow-hidden">
                    {renderFormattedContent(msg.content, msg.role === 'user')}
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

      {/* Floating Button Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 hover:bg-blue-700 hover:scale-110 active:scale-95 focus:outline-none"
        aria-label="Toggle Chat"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}