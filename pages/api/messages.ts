import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db('blog');
  const collection = db.collection('messages');

  if (req.method === 'POST') {
    const { title, imageUrl } = req.body;
    const result = await collection.insertOne({ title, imageUrl });
    res.status(201).json(result);
  } else if (req.method === 'GET') {
    const messages = await collection.find({}).toArray();
    res.status(200).json(messages);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
