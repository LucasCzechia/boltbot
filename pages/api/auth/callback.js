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

// pages/auth/complete.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthComplete() {
  const router = useRouter();

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    try {
      const token = getCookie('auth_token');
      console.log('Looking for auth token...');

      if (token) {
        window.localStorage.setItem('token', token);
        document.cookie = 'auth_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.replace('/dashboard');
      } else {
        router.replace('/auth/error?reason=no_token');
      }
    } catch (error) {
      console.error('Error completing auth:', error);
      router.replace('/auth/error?reason=complete_error');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ffcc00] mx-auto"></div>
        <p className="mt-4 text-white">Almost there...</p>
        <p className="mt-2 text-sm text-gray-400">Completing your login</p>
      </div>
    </div>
  );
}

// pages/auth/error.js
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AuthError() {
  const router = useRouter();
  const { reason, error } = router.query;

  const getErrorMessage = () => {
    switch(reason || error) {
      case 'no_token':
        return 'No authentication token was found';
      case 'complete_error':
        return 'Error completing authentication';
      case 'token_error':
        return 'Error exchanging Discord code';
      case 'user_error':
        return 'Error fetching user data';
      case 'guilds_error':
        return 'Error fetching servers';
      default:
        return 'There was a problem authenticating with Discord';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#ffcc00] mb-4">Authentication Error</h1>
        <p className="text-white mb-2">{getErrorMessage()}</p>
        <p className="text-gray-400 text-sm mb-6">Please try again or contact support if the issue persists.</p>
        <div className="space-y-4">
          <Link 
            href="/api/auth/discord" 
            className="block w-full bg-[#ffcc00] text-[#0a0a0a] px-6 py-2 rounded-full font-semibold hover:bg-[#ff9900] transition-all"
          >
            Try Again
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-transparent border border-[#ffcc00] text-[#ffcc00] px-6 py-2 rounded-full font-semibold hover:bg-[#ffcc00] hover:text-[#0a0a0a] transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
              }
