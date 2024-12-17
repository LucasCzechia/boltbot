// pages/api/discord/servers/[id].js
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;

    if (req.method === 'GET') {
      const [serverResponse, botGuildsResponse] = await Promise.all([
        fetch(`https://discord.com/api/v10/guilds/${id}?with_counts=true`, {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        }),
        fetch('https://discord.com/api/v10/users/@me/guilds', {
          headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          },
        }),
      ]);

      if (!serverResponse.ok) {
        throw new Error('Failed to fetch server');
      }

      const serverData = await serverResponse.json();
      const botGuilds = await botGuildsResponse.json();
      const botPresent = botGuilds.some(guild => guild.id === id);

      res.json({
        id: serverData.id,
        name: serverData.name,
        icon: serverData.icon,
        banner: serverData.banner,
        description: serverData.description,
        memberCount: serverData.approximate_member_count,
        onlineCount: serverData.approximate_presence_count,
        botPresent
      });
    } else if (req.method === 'PATCH') {
      // Handle settings update
      const settings = req.body;
      
      // TODO: Update settings in database
      
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
