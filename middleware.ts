// middleware.ts
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

const rateLimit = async (req) => {
  const ip = req.headers.get('x-forwarded-for')
  const key = `rate_limit:${ip}`
  const limit = 100
  const window = 60

  try {
    const count = await redis.incr(key)
    await redis.expire(key, window)
    
    return count <= limit
  } catch {
    return true
  }
}

const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "img-src 'self' data: https: blob:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://discord.com/api/; " +
    "frame-src 'none'; " +
    "object-src 'none';",
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
}

export async function middleware(req) {
  const token = await getToken({ req })
  const isAuth = !!token
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')
  
  if (!await rateLimit(req)) {
    return new NextResponse(JSON.stringify({ error: 'Too many requests' }), { 
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const response = NextResponse.next()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard/servers', req.url))
    }
    return response
  }

  if (!isAuth && !isAuthPage && !req.nextUrl.pathname.startsWith('/api/auth')) {
    const redirectUrl = new URL('/auth/login', req.url)
    redirectUrl.searchParams.set('from', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  if (isApiRoute && !isAuth && !req.nextUrl.pathname.startsWith('/api/auth')) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { 
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/api/:path*'
  ]
}
