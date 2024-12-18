// middleware.ts 
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isDashboard = req.nextUrl.pathname.startsWith('/dashboard');

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
