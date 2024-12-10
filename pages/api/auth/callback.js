// pages/api/auth/callback.js
import jwt from 'jsonwebtoken';
import { authConfig } from '../../../config/auth';
import { logger } from '../../../utils/logger';

export default async function handler(req, res) {
  const { code } = req.query;

  logger.info('Auth callback started', { hasCode: !!code });

  if (!code) {
    logger.error('No code provided');
    return res.redirect('/auth/error?error=no_code');
  }

  try {
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://boltbot.app/api/auth/callback',
      }),
    });

    if (!tokenRes.ok) {
      const error = await tokenRes.text();
      logger.error('Token error', { status: tokenRes.status, error });
      return res.redirect('/auth/error?error=token_error');
    }

    const { access_token } = await tokenRes.json();
    logger.info('Token obtained successfully');

    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userRes.ok) {
      logger.error('User data error', { status: userRes.status });
      return res.redirect('/auth/error?error=user_error');
    }

    const user = await userRes.json();
    logger.info('User data obtained', { userId: user.id });

    const guildsRes = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!guildsRes.ok) {
      logger.error('Guilds error', { status: guildsRes.status });
      return res.redirect('/auth/error?error=guilds_error');
    }

    const guilds = await guildsRes.json();
    logger.info('Guilds obtained', { count: guilds.length });

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        guilds: guilds
      },
      authConfig.jwt.getSecret(),
      { expiresIn: authConfig.jwt.expiresIn }
    );

    logger.info('Session token created');

    const cookieString = [
      `auth_token=${token}`,
      'Path=/',
      'Max-Age=43200',
      'SameSite=Lax',
      process.env.NODE_ENV === 'production' ? 'Secure' : '',
    ].filter(Boolean).join('; ');

    res.setHeader('Set-Cookie', cookieString);
    logger.info('Set auth cookie, redirecting');
    
    return res.redirect('/auth/complete');

  } catch (error) {
    logger.error('Auth callback error', error);
    return res.redirect('/auth/error?error=server_error');
  }
}
