// pages/api/discord/servers/[id]/settings.js
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const app = require('express')();
const { QuickDB } = require('quick.db');
const db = new QuickDB();

app.get('/api/discord/servers/:id/settings', async (req, res) => {
  try {
    const { id } = req.params;
    const settings = await db.get(`settings_${id}`);
    
    if (!settings) {
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

    return res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/discord/servers/:id/settings', async (req, res) => {
  try {
    const { id } = req.params;
    const settings = req.body;

    await db.set(`settings_${id}`, settings);
    return res.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    return res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = app;
