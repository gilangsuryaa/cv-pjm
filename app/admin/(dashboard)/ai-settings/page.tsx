'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function AiSettingsPage() {
  const supabase = createClient()

  const [models, setModels] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [newModel, setNewModel] = useState('')

  useEffect(() => {
    async function getAiSettings() {
      const { data, error } = await supabase
        .from('ai_settings')
        .select('model_chain')
        .eq('id', 1)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setModels((data?.model_chain as string[]) ?? [])
      }

      setLoading(false)
    }

    getAiSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function move(index: number, direction: -1 | 1) {
    setSuccess('')
    const target = index + direction
    if (target < 0 || target >= models.length) return

    const next = [...models]
    ;[next[index], next[target]] = [next[target], next[index]]
    setModels(next)
  }

  function remove(index: number) {
    setSuccess('')
    setModels(models.filter((_, i) => i !== index))
  }

  function addModel(e: FormEvent) {
    e.preventDefault()
    const id = newModel.trim()
    if (!id) return

    setSuccess('')
    if (models.includes(id)) {
      setError(`Model "${id}" sudah ada di daftar.`)
      return
    }

    setError('')
    setModels([...models, id])
    setNewModel('')
  }

  async function handleSave() {
    if (models.length === 0) {
      setError('Minimal harus ada satu model di daftar.')
      return
    }

    setSaving(true)
    setError('')
    setSuccess('')

    // .select() dibutuhkan agar RLS yang memblok update terlihat sebagai
    // hasil kosong, bukan diam-diam dianggap sukses.
    const { data, error } = await supabase
      .from('ai_settings')
      .update({ model_chain: models, updated_at: new Date().toISOString() })
      .eq('id', 1)
      .select('id')

    if (error) {
      setError(error.message)
    } else if (!data || data.length === 0) {
      setError('Gagal menyimpan: sesi login berakhir atau tidak punya akses. Coba login ulang.')
    } else {
      setSuccess('Pengaturan AI tersimpan.')
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Pengaturan AI</h1>
        <p className="mt-2 text-sm text-gray-600">Memuat...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Pengaturan AI
        </h1>

        <p className="mt-1 text-sm text-gray-600">
          Atur model AI yang dipakai chatbot. Model pertama dipakai utama; jika
          gagal (misal dihapus penyedia), chatbot otomatis mencoba model
          berikutnya sesuai urutan.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* Daftar model */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
          <p className="text-sm font-semibold text-gray-700">
            Urutan Model (Fallback)
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {models.map((model, index) => (
            <div
              key={model}
              className="flex items-center gap-3 px-6 py-3"
            >
              <span className="w-6 text-sm font-medium text-gray-500">
                {index + 1}.
              </span>

              <code className="flex-1 rounded bg-gray-100 px-3 py-1.5 text-sm text-gray-900">
                {model}
              </code>

              {index === 0 && (
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                  Utama
                </span>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Naikkan ${model}`}
                  className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(index, 1)}
                  disabled={index === models.length - 1}
                  aria-label={`Turunkan ${model}`}
                  className="rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => remove(index)}
                  disabled={models.length === 1}
                  aria-label={`Hapus ${model}`}
                  className="ml-2 rounded px-2 py-1 text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-900 disabled:opacity-30"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {models.length === 0 && (
            <div className="p-8 text-center text-sm text-gray-600">
              Belum ada model. Tambahkan minimal satu model ID.
            </div>
          )}
        </div>

        {/* Tambah model */}
        <form
          onSubmit={addModel}
          className="flex items-center gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4"
        >
          <input
            type="text"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            placeholder="Model ID, misal: glm-5.3-flash"
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            + Tambah Model
          </button>
        </form>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        ID model harus aktif di katalog Nutaraline dan mendukung function
        calling. Daftar lengkap: https://nutaraline.co.uk/docs
      </p>

      {/* Simpan */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>
    </div>
  )
}
