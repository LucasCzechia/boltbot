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
          redirect_uri: process.env.VERCEL_URL 
            ? `https://${process.env.VERCEL_URL}/api/auth/callback/discord`
            : 'http://localhost:3000/api/auth/callback/discord'
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.tokenType = account.token_type;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.tokenType = token.tokenType;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export default NextAuth(authOptions);
