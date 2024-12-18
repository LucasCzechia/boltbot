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
};

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: serverId } = req.query;

    if (req.method === 'GET') {
      const settings = await db.get(`server_settings_${serverId}`);
      return res.json({
        ...DEFAULT_SETTINGS,
        ...settings
      });
    }

    if (req.method === 'PATCH') {
      const currentSettings = await db.get(`server_settings_${serverId}`) || {};
      const newSettings = req.body;
      
      const updatedSettings = {
        ...DEFAULT_SETTINGS,
        ...currentSettings,
        ...newSettings,
        tools: {
          ...DEFAULT_SETTINGS.tools,
          ...(currentSettings.tools || {}),
          ...(newSettings.tools || {})
        },
        features: {
          ...DEFAULT_SETTINGS.features,
          ...(currentSettings.features || {}),
          ...(newSettings.features || {})
        }
      };

      await db.set(`server_settings_${serverId}`, updatedSettings);
      return res.json({ 
        success: true, 
        settings: updatedSettings 
      });
    }

    res.setHeader('Allow', ['GET', 'PATCH']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });

  } catch (error) {
    console.error('Settings handler error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
