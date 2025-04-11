import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Acá se usa directamente:
  const { db } = await connectToDatabase(); // ✅ Aquí estás accediendo a la base de datos

  if (req.method === 'GET') {
    const mensajes = await db.collection('messages').find().toArray();
    return res.status(200).json(mensajes);
  }

  if (req.method === 'POST') {
    const nuevoMensaje = req.body;
    await db.collection('messages').insertOne(nuevoMensaje);
    return res.status(201).json({ message: 'Mensaje guardado correctamente' });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Método ${req.method} no permitido`);
}
