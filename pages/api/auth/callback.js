// pages/api/auth/callback.js
import jwt from 'jsonwebtoken';
import { authConfig } from '../../../config/auth';
import { logger } from '../../../utils/logger';

export default async function handler(req, res) {
  const { code } = req.query;

  logger.info('Auth callback started', { code: !!code });

  if (!code) {
    logger.error('No code provided');
    return res.redirect('/auth/error?error=no_code');
  }

  try {
    logger.info('Exchanging code for token');
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

    const tokenData = await tokenRes.text();
    logger.info('Token response', { status: tokenRes.status });
    
    if (!tokenRes.ok) {
      logger.error('Token error', { status: tokenRes.status, body: tokenData });
      return res.redirect('/auth/error?error=token_error');
    }

    const { access_token } = JSON.parse(tokenData);
    logger.info('Token obtained successfully');

    logger.info('Fetching user data');
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!userRes.ok) {
      const userError = await userRes.text();
      logger.error('User data error', { status: userRes.status, body: userError });
      return res.redirect('/auth/error?error=user_error');
    }

    const user = await userRes.json();
    logger.info('User data obtained', { userId: user.id });

    logger.info('Fetching guilds');
    const guildsRes = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!guildsRes.ok) {
      const guildsError = await guildsRes.text();
      logger.error('Guilds error', { status: guildsRes.status, body: guildsError });
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

    res.setHeader(
      'Set-Cookie',
      `auth_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );

    logger.info('Redirecting to complete page');
    return res.redirect('/auth/complete');

  } catch (error) {
    logger.error('Auth callback error', { 
      message: error.message,
      stack: error.stack 
    });
    return res.redirect('/auth/error?error=server_error');
  }
}
