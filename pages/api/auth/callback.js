// pages/api/auth/callback.js
import { authConfig } from '../../../config/auth';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { code } = req.query;

  try {
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: authConfig.discord.clientId,
        client_secret: authConfig.discord.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: authConfig.discord.callbackUrl,
        scope: authConfig.discord.scope.join(' '),
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const tokens = await tokenResponse.json();

    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const userData = await userResponse.json();

    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const guildsData = await guildsResponse.json();

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
