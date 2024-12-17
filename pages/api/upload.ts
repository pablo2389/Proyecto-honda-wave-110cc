import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';  // No es necesario importar tipos explícitamente
import multer from 'multer';

// Configuración de multer para almacenar las imágenes subidas
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Aquí se almacenarán las imágenes
    filename: (req, file, cb) => cb(null, file.originalname), // Nombre original del archivo
  }),
});

// Crear un manejador de rutas con next-connect
const handler = nextConnect();

// Usamos upload.single('image') si estás subiendo una sola imagen
handler.use(upload.single('image'));

// Manejo de solicitud POST para agregar un comentario
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: 'El comentario no puede estar vacío.' });
  }

  // Lógica para manejar el comentario (guardar, mostrar, etc.)
  console.log('Nuevo comentario recibido:', comment);

  // Simular respuesta exitosa
  res.status(200).json({ message: 'Comentario agregado correctamente', comment });
});

export default handler;
