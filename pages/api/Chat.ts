import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const chats = await db.collection('chat').find({}).toArray();
    return res.status(200).json(chats);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
