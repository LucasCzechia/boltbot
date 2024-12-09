// pages/api/auth/discord.js
import { authConfig } from '@/config/auth';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${authConfig.discord.clientId}&redirect_uri=${encodeURIComponent(authConfig.discord.callbackUrl)}&response_type=code&scope=${authConfig.discord.scope.join('%20')}`;

  res.redirect(discordAuthUrl);
}
