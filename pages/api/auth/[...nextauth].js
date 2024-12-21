// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { encode, decode } from 'next-auth/jwt'
import { randomBytes, createHash } from 'crypto'

const DISCORD_SCOPES = ['identify', 'email', 'guilds', 'guilds.join', 'guilds.members.read', 'bot', 'applications.commands']

const generatePKCE = () => {
  const verifier = randomBytes(32).toString('base64url')
  const challenge = createHash('sha256').update(verifier).digest('base64url')
  return { verifier, challenge }
}

async function refreshAccessToken(token) {
  try {
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })
    })

    const refreshedTokens = await response.json()
    if (!response.ok) throw refreshedTokens

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      error: null
    }
  } catch (error) {
    return { ...token, error: 'RefreshAccessTokenError' }
  }
}

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: DISCORD_SCOPES.join(' '),
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          code_challenge_method: 'S256',
          code_challenge: generatePKCE().challenge
        }
      },
      token: {
        async request({ client, params, checks, provider }) {
          const { verifier } = generatePKCE()
          const tokens = await client.oauthCallback(
            provider.callbackUrl,
            params,
            checks,
            { code_verifier: verifier, grant_type: 'authorization_code' }
          )
          return { tokens }
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
    updateAge: 30 * 60,
  },
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      return await encode({ token, secret, maxAge, encryption: true })
    },
    decode: async ({ secret, token }) => {
      return await decode({ token, secret, encryption: true })
    }
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : null
      }
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  callbacks: {
    async jwt({ token, account, trigger, session }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpires = Date.now() + account.expires_in * 1000
        token.error = null
      }

      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      if (token?.error) {
        throw new Error('RefreshAccessTokenError')
      }

      session.accessToken = token.accessToken
      session.error = token.error
      session.user.id = token.sub

      return session
    },
    async signIn({ account, profile }) {
      if (account.provider === "discord") {
        return profile.verified
      }
      return true
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith("/")) return baseUrl + url
      return baseUrl
    }
  },
  events: {
    async signIn({ user, isNewUser }) {
      console.log('User signed in:', {
        id: user.id,
        isNewUser,
        timestamp: new Date().toISOString()
      })
    },
    async signOut({ token }) {
      if (token?.accessToken) {
        try {
          await fetch('https://discord.com/api/oauth2/token/revoke', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${token.accessToken}&token_type_hint=access_token&client_id=${process.env.DISCORD_CLIENT_ID}&client_secret=${process.env.DISCORD_CLIENT_SECRET}`
          })
        } catch (error) {
          console.error('Error revoking token:', error)
        }
      }
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login/logout',
    error: '/auth/login/error',
  },
  debug: process.env.NODE_ENV === 'development'
}

export default NextAuth(authOptions)
