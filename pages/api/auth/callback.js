// pages/api/auth/callback.js
import { authConfig } from '../../../config/auth';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { code } = req.query;
  console.log('Received code:', code);

  try {
    const tokenParams = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'https://boltbot.app/api/auth/callback',
      scope: 'identify guilds',
    });

    console.log('Token request params:', tokenParams.toString());

    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: tokenParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('Token response status:', tokenResponse.status);
    const tokens = await tokenResponse.json();
    console.log('Token response:', tokens);

    if (!tokenResponse.ok) {
      throw new Error(`Discord token error: ${tokens.error}`);
    }

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const userData = await userResponse.json();
    console.log('User data:', userData);

    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const guildsData = await guildsResponse.json();
    console.log('Guilds count:', guildsData.length);

    const sessionToken = jwt.sign(
      {
        userId: userData.id,
        username: userData.username,
        guilds: guildsData,
      },
      authConfig.jwt.getSecret(),
      { expiresIn: authConfig.jwt.expiresIn }
    );

    res.setHeader(
      'Set-Cookie',
      `auth_token=${sessionToken}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${60 * 60 * 12}`
    );
    
    res.redirect('/auth/complete');
  } catch (error) {
    console.error('Auth error:', error);
    res.redirect('/auth/error');
  }
}
