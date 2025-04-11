// ✅ CORREGIDO
import clientPromise from '@/lib/mongo';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('blog');
  const messages = db.collection('messages');

  if (req.method === 'GET') {
    const result = await messages.find({}).toArray();
    res.status(200).json(result);
  } else if (req.method === 'POST') {
    const newMessage = req.body;
    await messages.insertOne(newMessage);
    res.status(201).json({ message: 'Mensaje agregado' });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
