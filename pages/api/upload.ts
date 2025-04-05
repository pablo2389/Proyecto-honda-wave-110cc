// /pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import os from 'os';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// 📁 Crear ruta temporal segura
const upload = multer({
  dest: path.join(os.tmpdir()),
});

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(500).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  },
});

handler.use(upload.single('image')); // ⬅️ El input debe tener name="image"

handler.post(async (req: NextApiRequest & { file: Express.Multer.File }, res) => {
  try {
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'motos_110_blog',
    });

    fs.unlinkSync(filePath); // ✅ Limpieza del archivo temporal

    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db(process.env.MONGODB_DB);
    await db.collection('imagenes').insertOne({
      url: result.secure_url,
      createdAt: new Date(),
    });

    await client.close();

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error('Error al subir imagen:', err);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});

// ⛔️ Desactivamos bodyParser porque multer se encarga del form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
