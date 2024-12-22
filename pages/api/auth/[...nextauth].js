// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login/error'
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  events: {
    async signOut() {
      try {
        if (typeof window !== 'undefined') {
          localStorage.clear()
          sessionStorage.clear()
          document.cookie.split(";").forEach(function(c) { 
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
          })
        }
      } catch (error) {
        console.error('Logout cleanup error:', error)
      }
    }
  }
}

export default NextAuth(authOptions)
