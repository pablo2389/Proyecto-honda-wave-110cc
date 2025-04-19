import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';
import { MongoClient } from 'mongodb';
import fs from 'fs';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Función para manejar la carga de archivos y la respuesta
export const config = {
  api: {
    bodyParser: false, // Necesario para usar formidable
  },
};

// Handler de la API
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Crear una nueva instancia de formidable
    const form = new IncomingForm();
    form.uploadDir = './tmp'; // Directorio temporal para guardar archivos
    form.keepExtensions = true; // Mantener extensiones de archivo

    // Procesar el formulario
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error al procesar el archivo:', err);
        return res.status(500).json({ error: 'Error al procesar el archivo' });
      }

      // Verificar si el archivo existe
      const file = files.image && Array.isArray(files.image) ? files.image[0] : files.image;
      if (!file) {
        return res.status(400).json({ error: 'No se recibió ninguna imagen' });
      }

      try {
        // Subir la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: 'motos_110_blog',
        });

        // Conectar a MongoDB y guardar la URL de la imagen
        const client = new MongoClient(process.env.MONGODB_URI!);
        await client.connect();
        const db = client.db(process.env.MONGODB_DB);
        await db.collection('imagenes').insertOne({
          url: result.secure_url,
          createdAt: new Date(),
        });
        await client.close();

        // Eliminar el archivo temporal después de procesarlo
        fs.unlinkSync(file.filepath);

        res.status(200).json({ url: result.secure_url });
      } catch (error) {
        console.error('Error al subir:', error);
        res.status(500).json({ error: 'Error al subir imagen a Cloudinary o MongoDB' });
      }
    });
  } else {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
