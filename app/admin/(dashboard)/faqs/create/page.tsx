'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CreateFaqPage() {
  const router = useRouter()
  const supabase = createClient()

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState(true)

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('faqs')
      .insert({
        question,
        answer,
        status,
      })

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/admin/faqs')
    router.refresh()
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Tambah FAQ
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Tambahkan pertanyaan dan jawaban yang sering ditanyakan pelanggan.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6"
      >
        {/* Question */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Pertanyaan
          </label>

          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Contoh: Apakah tersedia layanan service AC?"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Answer */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Jawaban
          </label>

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            rows={6}
            placeholder="Tulis jawaban FAQ..."
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          <input
            id="status"
            type="checkbox"
            checked={status}
            onChange={(e) =>
              setStatus(e.target.checked)
            }
            className="h-4 w-4 rounded border-gray-300"
          />

          <label
            htmlFor="status"
            className="text-sm font-medium text-gray-700"
          >
            Aktifkan FAQ
          </label>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={saving}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan FAQ'}
          </button>
        </div>
      </form>
    </div>
  )
}