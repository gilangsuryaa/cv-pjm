// Kompresi gambar di sisi browser, dijalankan sebelum file diunggah ke
// Supabase Storage. Tujuannya supaya foto dari kamera HP (biasanya 3-8 MB)
// tidak dikirim mentah-mentah ke pengunjung situs.

export type CompressResult = {
  file: File
  originalSize: number
  compressedSize: number
  compressed: boolean
}

export type CompressOptions = {
  // Sisi terpanjang gambar setelah dikecilkan. Gambar yang sudah lebih kecil
  // dari ini tidak diperbesar.
  maxDimension?: number
  quality?: number
}

// Format yang tidak boleh disentuh: vektor, animasi, dan ikon.
// Menggambar ulang lewat canvas akan merusak ketiganya.
const SKIP_MIME = new Set([
  'image/svg+xml',
  'image/gif',
  'image/x-icon',
  'image/vnd.microsoft.icon',
  'image/avif',
])

// Batas ukuran file mentah yang boleh dipilih. Dibuat longgar karena hasil
// akhirnya akan dikompres dulu; batas ini hanya penjaga supaya browser tidak
// kehabisan memori saat memproses file raksasa.
export const MAX_SOURCE_BYTES = 20 * 1024 * 1024

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export async function compressImage(
  file: File,
  { maxDimension = 1600, quality = 0.82 }: CompressOptions = {}
): Promise<CompressResult> {
  const asIs: CompressResult = {
    file,
    originalSize: file.size,
    compressedSize: file.size,
    compressed: false,
  }

  if (SKIP_MIME.has(file.type) || typeof createImageBitmap !== 'function') {
    return asIs
  }

  let bitmap: ImageBitmap

  try {
    // imageOrientation memastikan foto HP yang punya EXIF rotasi tidak
    // tersimpan dalam posisi miring.
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return asIs
  }

  try {
    const scale = Math.min(
      1,
      maxDimension / Math.max(bitmap.width, bitmap.height)
    )

    const width = Math.max(1, Math.round(bitmap.width * scale))
    const height = Math.max(1, Math.round(bitmap.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) return asIs

    context.drawImage(bitmap, 0, 0, width, height)

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/webp', quality)
    )

    // Kalau hasilnya tidak lebih kecil, file aslinya saja yang dipakai.
    if (!blob || blob.size >= file.size) return asIs

    // Browser yang tidak bisa mengencode WebP diam-diam jatuh ke PNG,
    // jadi tipe sebenarnya diambil dari blob-nya, bukan diasumsikan.
    const mime = blob.type || 'image/webp'
    const extension = EXTENSION_BY_MIME[mime] ?? 'webp'
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'image'

    return {
      file: new File([blob], `${baseName}.${extension}`, {
        type: mime,
        lastModified: Date.now(),
      }),
      originalSize: file.size,
      compressedSize: blob.size,
      compressed: true,
    }
  } catch {
    return asIs
  } finally {
    bitmap.close()
  }
}
