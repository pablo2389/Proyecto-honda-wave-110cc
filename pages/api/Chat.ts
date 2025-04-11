// ✅ CORREGIDO
import clientPromise from '@/lib/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('blog');
  const collection = db.collection('chat');

  if (req.method === 'GET') {
    const messages = await collection.find({}).toArray();
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const message = req.body;
    await collection.insertOne(message);
    res.status(201).json({ message: 'Mensaje guardado' });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
