// pages/api/comments.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { comment, image } = req.body;

    try {
      let imageUrl = '';

      if (image) {
        const uploadResult = await cloudinary.v2.uploader.upload(image, {
          folder: 'comments_images',
        });
        imageUrl = uploadResult.secure_url;
      }

      const { db } = await connectToDatabase();
      const newComment = { comment, imageUrl, createdAt: new Date() };

      await db.collection('comments').insertOne(newComment);

      res.status(201).json({ message: 'Comentario guardado exitosamente', data: newComment });
    } catch (error) {
      console.error('Error al guardar el comentario:', error);
      res.status(500).json({ message: 'Hubo un error al guardar el comentario' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
