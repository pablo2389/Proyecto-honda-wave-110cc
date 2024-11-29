import { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary usando las variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL?.split('@')[1]?.split(':')[0] || '',
  api_key: process.env.CLOUDINARY_URL?.split(':')[1]?.split('/')[0] || '',
  api_secret: process.env.CLOUDINARY_URL?.split(':')[2]?.split('@')[0] || '',
});

type ResponseData = {
  url?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    try {
      // Asegúrate de que recibas el campo 'imagePath' en el cuerpo de la solicitud
      const { imagePath } = req.body;

      if (!imagePath) {
        return res.status(400).json({ error: 'No se recibió el archivo de imagen' });
      }

      // Subir la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: 'tus_imagenes', // Carpeta en Cloudinary donde se guardarán las imágenes
        public_id: `imagen_unica_${Date.now()}`, // Genera un ID único para cada imagen
      });

      // Responder con la URL segura de la imagen subida
      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.error('Error al subir la imagen: ', error);
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }
  } else {
    // Solo permite el método POST
    res.status(405).json({ error: 'Método no permitido' });
  }
}
