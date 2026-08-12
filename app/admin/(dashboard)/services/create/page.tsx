'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function CreateServicePage() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleNameChange(value: string) {
    setName(value)
    setSlug(generateSlug(value))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const { error } = await supabase
      .from('services')
      .insert({
        name,
        slug,
        description: description || null,
        price: price ? Number(price) : null,
        status,
      })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin/services')
    router.refresh()
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Tambah Layanan</h1>
        <p>Tambahkan layanan baru.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '600px',
        }}
      >
        {/* Nama */}
        <div style={{ marginBottom: '16px' }}>
          <label>Nama Layanan</label>

          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Contoh: Service AC"
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '6px',
            }}
          />
        </div>

        {/* Slug */}
        <div style={{ marginBottom: '16px' }}>
          <label>Slug</label>

          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(generateSlug(e.target.value))}
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '6px',
            }}
          />

          <small>
            URL: /layanan/{slug}
          </small>
        </div>

        {/* Deskripsi */}
        <div style={{ marginBottom: '16px' }}>
          <label>Deskripsi</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Deskripsi layanan..."
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '6px',
            }}
          />
        </div>

        {/* Harga */}
        <div style={{ marginBottom: '16px' }}>
          <label>Harga</label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="75000"
            min="0"
            style={{
              display: 'block',
              width: '100%',
              padding: '10px',
              marginTop: '6px',
            }}
          />
        </div>

        {/* Status */}
        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />{' '}
            Aktif
          </label>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: '16px',
              padding: '10px',
              background: '#fee',
            }}
          >
            {error}
          </div>
        )}

        {/* Button */}
        <div>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            style={{
              marginRight: '10px',
            }}
          >
            Batal
          </button>

          <button type="submit" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Layanan'}
          </button>
        </div>
      </form>
    </div>
  )
}