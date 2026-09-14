import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Gerbang utama panel admin. Dijalankan sebelum route apa pun di /admin
// dirender, termasuk saat pindah halaman dari sisi client, sehingga
// pengunjung yang belum login tidak pernah menerima UI admin sama sekali.
//
// Di Next 16 konvensi `middleware.ts` sudah diganti menjadi `proxy.ts`.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )

          response = NextResponse.next({ request })

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // getUser() memvalidasi token ke server Supabase, bukan sekadar membaca
  // cookie, jadi sesi palsu tidak bisa lolos. Sekalian menyegarkan token
  // yang hampir kedaluwarsa, yang tidak bisa dilakukan Server Component.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/admin/login'
    loginUrl.search = ''

    return NextResponse.redirect(loginUrl)
  }

  return response
}

export const config = {
  // Hanya route admin, dan halaman login sendiri dikecualikan supaya
  // tidak terjadi redirect berputar.
  matcher: ['/admin/((?!login).*)'],
}
