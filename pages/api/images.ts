// pages/api/images.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb'; // asegurate que esta ruta sea correcta

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connectToDatabase();
    const images = await db.collection('imagenes').find().sort({ createdAt: -1 }).toArray();

    // ✅ IMPORTANTE: devolver un objeto con clave "images"
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    res.status(500).json({ error: 'Error al obtener las imágenes' });
  }
}
