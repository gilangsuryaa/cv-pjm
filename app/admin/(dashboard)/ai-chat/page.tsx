'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  role: 'user' | 'assistant'
  content: string
  // Waktu respons dalam detik — berguna saat menguji kecepatan tiap model.
  seconds?: number
}

export default function AiChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend(e?: FormEvent, textOverride?: string) {
    e?.preventDefault()
    const text = textOverride ?? input
    if (!text.trim() || loading) return

    const userMessage: Message = { role: 'user', content: text }
    const history = [...messages, userMessage]
    setMessages(history)
    setInput('')
    setLoading(true)

    const startedAt = Date.now()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      const data = await res.json()
      const seconds = (Date.now() - startedAt) / 1000

      if (res.ok && data.message) {
        setMessages([...history, { role: 'assistant', content: data.message, seconds }])
      } else {
        setMessages([
          ...history,
          {
            role: 'assistant',
            content: `⚠️ Gagal (${res.status}): ${data.error ?? 'terjadi kesalahan server.'}`,
            seconds,
          },
        ])
      }
    } catch {
      setMessages([
        ...history,
        { role: 'assistant', content: '⚠️ Gagal menghubungi server. Periksa koneksi.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Tes Chatbot
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Coba chatbot langsung dengan model yang aktif di Pengaturan AI.
            Percakapan di sini tidak memengaruhi chatbot di halaman publik.
          </p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-900 hover:bg-gray-50"
          >
            Hapus Percakapan
          </button>
        )}
      </div>

      {/* Area percakapan */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="min-h-[400px] flex-1 space-y-4 overflow-y-auto p-6">
          {messages.length === 0 && !loading && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-medium text-gray-900">
                Belum ada pesan.
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Kirim pertanyaan untuk menguji chatbot, misalnya pertanyaan
                seputar produk, layanan, atau kontak.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-200 bg-gray-50 text-gray-900'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-line">{msg.content}</p>
                ) : (
                  <>
                    <div className="break-words [overflow-wrap:anywhere]">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-700 underline hover:text-blue-900"
                            >
                              {children}
                            </a>
                          ),
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          ul: ({ children }) => <ul className="my-2 list-disc list-inside space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="my-2 list-decimal list-inside space-y-1">{children}</ol>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>

                    {msg.seconds !== undefined && (
                      <p className="mt-2 text-xs text-gray-500">
                        {msg.seconds.toFixed(1)} detik
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                Menyusun jawaban...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Form input */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-3 border-t border-gray-200 bg-gray-50 p-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan uji coba..."
            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-md bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  )
}
