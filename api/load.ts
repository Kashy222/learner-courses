import { kv } from '@vercel/kv';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const syncKey = req.query.syncKey;
      if (!syncKey) {
        return res.status(400).json({ error: 'Missing syncKey' });
      }
      
      const dataStr = await kv.get(syncKey);
      
      if (!dataStr) {
        return res.status(404).json({ error: 'SyncKey not found' });
      }
      
      return res.status(200).json({ data: typeof dataStr === 'string' ? JSON.parse(dataStr) : dataStr });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to load from KV' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
