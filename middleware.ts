// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/dashboard` requires authentication
      if (req.nextUrl.pathname.startsWith('/dashboard')) {
        return !!token
      }
      return true
    },
  },
})

export const config = {
  matcher: ['/dashboard/:path*']
}
