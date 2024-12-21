// pages/api/discord/servers/[id]/settings.js
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]"
import { Redis } from "@upstash/redis"
import crypto from "crypto"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

const DEFAULT_SETTINGS = {
  botName: "BoltBot⚡",
  contextLength: 15,
  tools: {
    BrowseInternet: true,
    GenerateImages: true,
    CurrencyConverter: true,
    GetWeather: true,
    GetTime: true,
    ReactEmojis: true,
    CreateFiles: true,
    RunPython: true,
    GoogleImages: true
  },
  features: {
    ImageRecognition: true,
    FileHandling: true
  },
  personality: "default"
}

const verifyPermissions = async (userId, serverId) => {
  const cacheKey = `perms:${userId}:${serverId}`
  const cached = await redis.get(cacheKey)

  if (cached) {
    return JSON.parse(cached)
  }

  const response = await fetch(
    `https://discord.com/api/v10/guilds/${serverId}/members/${userId}`,
    {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'User-Agent': 'BoltBot (https://boltbot.app, 1.0.0)'
      }
    }
  )

  if (!response.ok) {
    throw new Error('Failed to verify permissions')
  }

  const member = await response.json()
  const permissions = BigInt(member.permissions)
  const hasPermission = (permissions & BigInt(0x8)) === BigInt(0x8)

  await redis.set(cacheKey, JSON.stringify(hasPermission), { ex: 300 })
  return hasPermission
}

const encryptSettings = (data) => {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return {
    data: encrypted,
    iv: iv.toString('hex'),
    tag: authTag.toString('hex')
  }
}

const decryptSettings = (encrypted, iv, tag) => {
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'))
  decipher.setAuthTag(Buffer.from(tag, 'hex'))
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return JSON.parse(decrypted)
}

const validateSettings = (settings) => {
  const schema = {
    botName: (val) => typeof val === 'string' && val.length >= 1 && val.length <= 32,
    contextLength: (val) => Number.isInteger(val) && val >= 1 && val <= 30,
    tools: (val) => val && typeof val === 'object',
    features: (val) => val && typeof val === 'object',
    personality: (val) => ['default', 'assistant', 'fancy'].includes(val)
  }

  for (const [key, validator] of Object.entries(schema)) {
    if (settings[key] && !validator(settings[key])) {
      throw new Error(`Invalid ${key}`)
    }
  }

  return true
}

const sanitizeSettings = (settings) => {
  const clean = {}
  const htmlRegex = /<[^>]*>/g

  for (const [key, value] of Object.entries(settings)) {
    if (typeof value === 'string') {
      clean[key] = value.replace(htmlRegex, '').trim()
    } else if (typeof value === 'object') {
      clean[key] = sanitizeSettings(value)
    } else {
      clean[key] = value
    }
  }

  return clean
}

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id: serverId } = req.query
    if (!serverId?.match(/^\d+$/)) {
      return res.status(400).json({ error: 'Invalid server ID' })
    }

    const hasPermission = await verifyPermissions(session.user.id, serverId)
    if (!hasPermission) {
      return res.status(403).json({ error: 'Insufficient permissions' })
    }

    const settingsKey = `settings:${serverId}`

    if (req.method === 'GET') {
      const cached = await redis.get(settingsKey)
      let settings = DEFAULT_SETTINGS

      if (cached) {
        settings = decryptSettings(cached.data, cached.iv, cached.tag)
      }

      return res.json(settings)
    }

    if (req.method === 'PATCH') {
      const csrfToken = req.headers['x-csrf-token']
      const storedToken = req.cookies['csrf-token']

      if (!csrfToken || csrfToken !== storedToken) {
        return res.status(403).json({ error: 'Invalid CSRF token' })
      }

      const updates = sanitizeSettings(req.body)
      validateSettings(updates)

      const cached = await redis.get(settingsKey)
      let currentSettings = DEFAULT_SETTINGS

      if (cached) {
        currentSettings = decryptSettings(cached.data, cached.iv, cached.tag)
      }

      const newSettings = {
        ...currentSettings,
        ...updates,
        tools: {
          ...currentSettings.tools,
          ...updates.tools
        },
        features: {
          ...currentSettings.features,
          ...updates.features
        }
      }

      const encrypted = encryptSettings(newSettings)
      await redis.set(settingsKey, encrypted, { ex: 86400 })

      await redis.zadd(
        `audit:${serverId}:settings`,
        Date.now(),
        JSON.stringify({
          userId: session.user.id,
          timestamp: new Date().toISOString(),
          changes: updates
        })
      )

      return res.json({
        success: true,
        settings: newSettings
      })
    }

    res.setHeader('Allow', ['GET', 'PATCH'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })

  } catch (error) {
    console.error('Settings handler error:', error)
    
    if (error.message.startsWith('Invalid')) {
      return res.status(400).json({ error: error.message })
    }
    
    return res.status(500).json({ error: 'Internal server error' })
  }
}
