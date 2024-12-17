// pages/api/discord/servers/[id]/index.js
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const { id } = req.query;
    const userGuilds = await fetch('https://discord.com/api/v10/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    }).then(r => r.json());

    const hasAccess = userGuilds.some(guild => 
      guild.id === id && (guild.owner || (BigInt(guild.permissions) & BigInt(0x8)) === BigInt(0x8))
    );

    if (!hasAccess) {
      return res.status(403).json({ error: 'No permission to access this server' });
    }

    const botResponse = await fetch(`${process.env.BOT_API_URL}/api/discord/servers/${id}/settings`, {
      headers: {
        Authorization: process.env.BOT_API_SECRET
      }
    });

    const settings = await botResponse.json();
    return res.json(settings);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
