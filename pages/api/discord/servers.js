// pages/api/discord/servers/index.js
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

    const [userGuildsResponse, botGuildsResponse] = await Promise.all([
      fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      }),
      fetch('https://discord.com/api/v10/users/@me/guilds', {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      })
    ])

    if (!userGuildsResponse.ok || !botGuildsResponse.ok) {
      throw new Error('Failed to fetch guilds')
    }

    const userGuilds = await userGuildsResponse.json()
    const botGuilds = await botGuildsResponse.json()

    const adminGuilds = await Promise.all(
      userGuilds
        .filter((guild) => (BigInt(guild.permissions) & BigInt(0x8)) === BigInt(0x8))
        .map(async (guild) => {
          const isBotPresent = botGuilds.some((botGuild) => botGuild.id === guild.id)
          let memberCount = 0
          let onlineCount = 0
          let banner = null
          let description = null

          if (isBotPresent) {
            try {
              const guildResponse = await fetch(`https://discord.com/api/v10/guilds/${guild.id}?with_counts=true`, {
                headers: {
                  Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`
                }
              })
              if (guildResponse.ok) {
                const guildData = await guildResponse.json()
                memberCount = guildData.approximate_member_count || 0
                onlineCount = guildData.presence_count || 0
                banner = guildData.banner
                description = guildData.description
              }
            } catch (error) {
              console.error(`Failed to fetch member count for guild ${guild.id}:`, error)
            }
          }

          return {
            id: guild.id,
            name: guild.name,
            icon: guild.icon,
            banner: banner,
            memberCount,
            onlineCount,
            description,
            botPresent: isBotPresent
          }
        })
    )

    res.json(adminGuilds)
  } catch (error) {
    console.error('Error fetching servers:', error)
    res.status(500).json({ error: 'Failed to fetch servers' })
  }
}
