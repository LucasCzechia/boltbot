// middleware.ts 
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isAuth = req.nextUrl.pathname.startsWith('/auth');
      const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

      if (isAuth) {
        return true;
      }

      if (isDashboard) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/:path*']
};
