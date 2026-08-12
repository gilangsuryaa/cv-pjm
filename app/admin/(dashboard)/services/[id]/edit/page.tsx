'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export default function EditServicePage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()

  const id = params.id as string

  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState(true)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getService() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setName(data.name)
      setSlug(data.slug)
      setDescription(data.description ?? '')
      setPrice(data.price?.toString() ?? '')
      setStatus(data.status)

      setLoading(false)
    }

    getService()
  }, [id])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setSaving(true)
    setError('')

    const { error } = await supabase
      .from('services')
      .update({
        name,
        slug,
        description: description || null,
        price: price ? Number(price) : null,
        status,
      })
      .eq('id', id)

    if (error) {
      setError(error.message)
      setSaving(false)
      return
    }

    router.push('/admin/services')
    router.refresh()
  }

  if (loading) {
    return <p>Memuat data...</p>
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Edit Layanan</h1>
        <p>Ubah informasi layanan.</p>
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
            onChange={(e) => {
              const value = e.target.value
              setName(value)
              setSlug(generateSlug(value))
            }}
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

        <button
          type="button"
          onClick={() => router.back()}
          disabled={saving}
          style={{
            marginRight: '10px',
          }}
        >
          Batal
        </button>

        <button type="submit" disabled={saving}>
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  )
}