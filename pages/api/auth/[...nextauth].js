// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { logger } from '../../../utils/logger';

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'identify email guilds'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login/error'
  },
  callbacks: {
    async jwt({ token, account, user }) {
        logger.info("JWT Callback Triggered - Parameters:", JSON.stringify({token, account, user}));
      if (account && user) {
       logger.debug("JWT Callback - User Data:", JSON.stringify(user));
        token.accessToken = account.access_token;
        token.global_name = user.global_name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.global_name = token.global_name;
      session.user.username = token.username;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    }
  }
}

export default NextAuth(authOptions)
