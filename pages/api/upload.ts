import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import { promisify } from 'util';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    form.uploadDir = '/tmp';
    form.keepExtensions = true;

    const parseForm = promisify(form.parse);

    try {
      const { fields, files } = await parseForm(req);

      const file = files.image && Array.isArray(files.image) ? files.image[0] : files.image;
      if (!file) {
        return res.status(400).json({ error: 'No se recibió ninguna imagen' });
      }

      const result = await cloudinary.uploader.upload(file.filepath, {
        folder: 'motos_110_blog',
      });

      const client = new MongoClient(process.env.MONGODB_URI!);
      await client.connect();
      const db = client.db(process.env.MONGODB_DB);
      await db.collection('imagenes').insertOne({
        url: result.secure_url,
        createdAt: new Date(),
      });
      await client.close();

      fs.unlinkSync(file.filepath);

      res.status(200).json({ url: result.secure_url });
    } catch (err) {
      console.error('Error al procesar:', err);
      res.status(500).json({ error: 'Error en la carga de la imagen' });
    }
  } else {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
