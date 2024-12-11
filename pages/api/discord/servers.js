// pages/api/discord/servers.js
import { getServerSession } from "next-auth/next"
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const userGuildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    })

    const botGuildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
      }
    })

    if (!userGuildsResponse.ok || !botGuildsResponse.ok) {
      throw new Error('Failed to fetch guilds')
    }

    const userGuilds = await userGuildsResponse.json()
    const botGuilds = await botGuildsResponse.json()
    const botGuildIds = botGuilds.map(guild => guild.id)

    const adminGuilds = userGuilds
      .filter(guild => (BigInt(guild.permissions) & BigInt(0x8)) === BigInt(0x8))
      .map(guild => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        memberCount: guild.approximate_member_count || 0,
        botPresent: botGuildIds.includes(guild.id)
      }))

    res.json(adminGuilds)
  } catch (error) {
    console.error('Error fetching servers:', error)
    res.status(500).json({ error: 'Failed to fetch servers' })
  }
}
