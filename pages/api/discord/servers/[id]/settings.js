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

    switch (req.method) {
      case 'GET': {
        const botResponse = await fetch(`${process.env.BOT_API_URL}/settings/${id}`, {
          headers: {
            Authorization: process.env.BOT_API_SECRET
          }
        });

        if (!botResponse.ok) {
          return res.json({
            botName: 'BoltBot',
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
            personality: 'default'
          });
        }

        const settings = await botResponse.json();
        return res.json(settings);
      }

      case 'PATCH': {
        const settings = req.body;
        const botResponse = await fetch(`${process.env.BOT_API_URL}/settings/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: process.env.BOT_API_SECRET
          },
          body: JSON.stringify(settings)
        });

        if (!botResponse.ok) {
          return res.status(500).json({ error: 'Failed to update settings' });
        }

        return res.json({ success: true });
      }

      default:
        res.setHeader('Allow', ['GET', 'PATCH']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
