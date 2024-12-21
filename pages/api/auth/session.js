// pages/api/auth/session.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "./[...nextauth]"
import crypto from "crypto"

function filterSensitiveData(session) {
  if (!session) return null

  return {
    user: {
      id: session.user.id,
      name: session.user.name,
      image: session.user.image
    },
    expires: session.expires
  }
}

function generateSessionFingerprint(session, userAgent) {
  if (!session?.user?.id) return null
  
  const data = `${session.user.id}:${userAgent}:${process.env.NEXTAUTH_SECRET}`
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
}

export default async function handler(req, res) {
  try {
    const userAgent = req.headers['user-agent']
    const session = await getServerSession(req, res, authOptions)
    
    if (req.method === 'GET') {
      const fingerprint = generateSessionFingerprint(session, userAgent)
      const safeSession = filterSensitiveData(session)
      
      if (safeSession) {
        safeSession.fingerprint = fingerprint
      }

      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      res.setHeader('Pragma', 'no-cache')
      res.setHeader('Expires', '0')
      
      return res.json(safeSession)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Session handler error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
