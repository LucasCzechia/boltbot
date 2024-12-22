// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname

    if (path.startsWith('/dashboard') && !req.nextauth.token) {
      const loginUrl = new URL('/auth/login', req.url)
      loginUrl.searchParams.set('from', path)
      return NextResponse.redirect(loginUrl)
    }

    if (path.startsWith('/auth') && req.nextauth.token) {
      return NextResponse.redirect(new URL('/dashboard/servers', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith('/dashboard')) {
          return !!token
        }
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}
