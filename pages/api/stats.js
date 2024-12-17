import { QuickDB } from 'quick.db';
const db = new QuickDB({
  filePath: '/tmp/json.sqlite', 
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader !== process.env.BOT_API_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      await db.set('botStats', req.body);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update stats' });
    }
  } else if (req.method === 'GET') {
    try {
      const stats = await db.get('botStats');
      if (!stats) {
        return res.status(404).json({ error: 'Stats not found' });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
