// pages/api/discord/servers/index.js
import { getServerSession } from "next-auth/next"
import { authOptions } from '../../auth/[...nextauth]'
import { Redis } from "@upstash/redis"
import crypto from "crypto"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

const secureHash = (data) => {
  return crypto
    .createHash('sha256')
    .update(data + process.env.NEXTAUTH_SECRET)
    .digest('hex')
}

const encryptToken = (token) => {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  let encrypted = cipher.update(token, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag()
  
  return {
    data: encrypted,
    iv: iv.toString('hex'),
    tag: authTag.toString('hex')
  }
}

const decryptToken = (encrypted, iv, tag) => {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))
  decipher.setAuthTag(Buffer.from(tag, 'hex'))
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

const fetchDiscordApi = async (endpoint, token) => {
  const response = await fetch(`https://discord.com/api/v10/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'BoltBot (https://boltbot.app, 1.0.0)'
    }
  })
  
  if (!response.ok) {
    throw new Error(`Discord API error: ${response.status}`)
  }
  
  return response.json()
}

const cacheServers = async (userId, servers) => {
  const encrypted = encryptToken(JSON.stringify(servers))
  await redis.set(`servers:${userId}`, encrypted, { ex: 300 })
}

const getCachedServers = async (userId) => {
  const cached = await redis.get(`servers:${userId}`)
  if (!cached) return null
  
  return JSON.parse(decryptToken(cached.data, cached.iv, cached.tag))
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionId = req.headers['x-session-id']
  const sessionHash = req.headers['x-session-hash']

  if (!sessionId || !sessionHash || sessionHash !== secureHash(sessionId)) {
    return res.status(401).json({ error: 'Invalid session' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userId = session.user.id
    const cachedServers = await getCachedServers(userId)
    
    if (cachedServers) {
      return res.json(cachedServers)
    }

    const [userGuilds, botGuilds] = await Promise.all([
      fetchDiscordApi('users/@me/guilds', session.accessToken),
      fetchDiscordApi('users/@me/guilds', process.env.DISCORD_BOT_TOKEN)
    ])

    const adminGuilds = await Promise.all(
      userGuilds
        .filter(guild => (BigInt(guild.permissions) & BigInt(0x8)) === BigInt(0x8))
        .map(async (guild) => {
          const isBotPresent = botGuilds.some(botGuild => botGuild.id === guild.id)
          let memberCount = 0
          let onlineCount = 0

          if (isBotPresent) {
            try {
              const guildData = await fetchDiscordApi(
                `guilds/${guild.id}?with_counts=true`,
                process.env.DISCORD_BOT_TOKEN
              )
              memberCount = guildData.approximate_member_count
              onlineCount = guildData.approximate_presence_count
            } catch (error) {
              console.error(`Failed to fetch member count for guild ${guild.id}:`, error)
            }
          }

          return {
            id: guild.id,
            name: guild.name,
            icon: guild.icon,
            memberCount,
            onlineCount,
            botPresent: isBotPresent,
          }
        })
    )

    await cacheServers(userId, adminGuilds)
    res.json(adminGuilds)
  } catch (error) {
    console.error('Error fetching servers:', error)
    res.status(500).json({ error: 'Failed to fetch servers' })
  }
}
