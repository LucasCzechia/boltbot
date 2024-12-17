// pages/api/discord/servers/[id]/settings.js
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

    if (req.method === 'GET') {
      const response = await fetch(`${process.env.BOT_API_URL}/api/discord/servers/${id}/settings`, {
        headers: {
          Authorization: process.env.BOT_API_SECRET
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch settings');
      }

      const data = await response.json();
      return res.json(data);
    }

    if (req.method === 'PATCH') {
      const response = await fetch(`${process.env.BOT_API_URL}/api/discord/servers/${id}/settings`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BOT_API_SECRET
        },
        body: JSON.stringify(req.body)
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      return res.json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
