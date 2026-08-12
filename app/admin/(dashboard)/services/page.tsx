import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import DeleteServiceButton from './delete-service-button'

export default async function ServicesPage() {
  const supabase = await createClient()

  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div>
        <h1>Layanan</h1>
        <p>Gagal mengambil data layanan.</p>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1>Layanan</h1>
          <p>Kelola layanan yang ditampilkan di website.</p>
        </div>

        <Link href="/admin/services/create">
          <button>+ Tambah Layanan</button>
        </Link>
      </div>

      {services.length === 0 ? (
        <p>Belum ada layanan.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <th align="left">Nama</th>
              <th align="left">Slug</th>
              <th align="left">Harga</th>
              <th align="left">Status</th>
              <th align="left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>

                <td>{service.slug}</td>

                <td>
                  {service.price
                    ? `Rp ${Number(service.price).toLocaleString('id-ID')}`
                    : '-'}
                </td>

                <td>
                  {service.status ? 'Aktif' : 'Nonaktif'}
                </td>

                <td>
                    <Link href={`/admin/services/${service.id}/edit`}>
                        Edit
                    </Link>{' '}
                    
                    <DeleteServiceButton id={service.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}