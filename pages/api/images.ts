import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ruta de la carpeta 'images' dentro de 'public'
    const imagesDir = path.join(process.cwd(), 'public', 'images');

    // Leer todos los archivos en la carpeta
    const files = fs.readdirSync(imagesDir);

    // Filtrar las imágenes, eliminando la imagen 9 y la 5 (omitidas)
    const images = files.filter((file) => !['moto5.png', 'moto9.png'].includes(file))
                        .map(file => `/images/${file}`); // Crear las rutas accesibles

    // Devolver las imágenes como un array en un objeto JSON
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error al obtener las imágenes:', error);
    res.status(500).json({ error: 'Error al obtener las imágenes' });
  }
}
