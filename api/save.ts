import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    try {
      const { syncKey, data } = req.body;
      if (!syncKey || !data) {
        return res.status(400).json({ error: 'Missing syncKey or data' });
      }
      
      // Store the data string in KV under the syncKey
      await redis.set(syncKey, JSON.stringify(data));
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to save to KV' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
