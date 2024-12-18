// pages/api/discord/servers/[id]/settings.js
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../../auth/[...nextauth]';
import { QuickDB } from 'quick.db';

const db = new QuickDB({
  filePath: '/tmp/json.sqlite'
});

const DEFAULT_SETTINGS = {
  botName: 'BoltBot⚡',
  contextLength: 15,
  tools: {
    browseInternet: true,
    generateImages: true,
    currencyConverter: true,
    weather: true,
    time: true,
    reactEmojis: true,
    createFiles: true,
    runPython: true,
    googleImages: true
  },
  features: {
    imageRecognition: true,
    fileHandling: true
  },
  personality: 'default'
};

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: serverId } = req.query;

    // GET request - Fetch settings
    if (req.method === 'GET') {
      const settings = await db.get(`server_settings_${serverId}`);
      return res.json(settings || DEFAULT_SETTINGS);
    }

    // PATCH request - Update settings
    if (req.method === 'PATCH') {
      const newSettings = req.body;
      await db.set(`server_settings_${serverId}`, newSettings);
      return res.json({ success: true, settings: newSettings });
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'PATCH']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });

  } catch (error) {
    console.error('Settings handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
