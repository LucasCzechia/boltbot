// config/auth.js
import crypto from 'crypto';

const generateSessionSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const JWT_ROTATION_INTERVAL = 24 * 60 * 60 * 1000;
let currentJwtSecret = generateSessionSecret();

setInterval(() => {
  currentJwtSecret = generateSessionSecret();
}, JWT_ROTATION_INTERVAL);

export const authConfig = {
  discord: {
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackUrl: 'https://boltbot.app/api/auth/callback',
    scope: ['identify', 'guilds']
  },
  jwt: {
    getSecret: () => currentJwtSecret,
    expiresIn: '12h',
    refreshIn: '7d'
  },
  security: {
    rateLimiting: {
      windowMs: 15 * 60 * 1000,
      max: 100
    },
    cors: {
      origin: 'https://boltbot.app',
      methods: ['GET', 'POST'],
      credentials: true
    }
  }
};

export const validateRequest = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');

  try {
    const decoded = verify(token, authConfig.jwt.getSecret());
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
