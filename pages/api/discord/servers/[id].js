// pages/api/discord/servers/[id].js
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    const guildResponse = await fetch(`https://discord.com/api/v10/guilds/${id}?with_counts=true`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    });

    if (!guildResponse.ok) {
      throw new Error('Failed to fetch server data');
    }

    const guildData = await guildResponse.json();

    const serverData = {
      id: guildData.id,
      name: guildData.name,
      icon: guildData.icon,
      memberCount: guildData.approximate_member_count,
      onlineCount: guildData.approximate_presence_count,
      description: guildData.description,
      banner: guildData.banner
    };

    res.json(serverData);
  } catch (error) {
    console.error('Error fetching server:', error);
    res.status(500).json({ error: 'Failed to fetch server data' });
  }
}
