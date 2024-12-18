// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'identify email guilds',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return `${baseUrl}/dashboard/servers`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
    signOut: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
