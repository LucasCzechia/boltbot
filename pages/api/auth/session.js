// pages/api/auth/session.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "./[...nextauth]"

export default async function handler(req, res) {
  try {
    res.setHeader('Content-Type', 'application/json');
    const session = await getServerSession(req, res, authOptions)
    
    if (session) {
      const safeSession = {
        user: {
          id: session.user.id,
          name: session.user.name,
          globalName: session.user.display_name || session.user.globalName, 
          image: session.user.image,
        },
      }

      if (session.token?.picture?.includes("discord")) {
        safeSession.user.id = session.token.sub;
      }
      
      return res.json(safeSession)
    }
    
    return res.json(null)
  } catch (error) {
    console.error('Session error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
