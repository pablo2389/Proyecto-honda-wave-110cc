import { NextApiRequest, NextApiResponse } from 'next';

// Array en memoria para almacenar los comentarios (puede ser reemplazado por una base de datos)
const comments: string[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Devuelve los comentarios almacenados
    res.status(200).json({ comments });
  } else if (req.method === 'POST') {
    const { text } = req.body;

    // Validar que el comentario no esté vacío
    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Comentario vacío no permitido' });
    }

    // Agregar el comentario al array
    comments.push(text);

    // Responder con un mensaje de éxito
    res.status(200).json({ message: 'Comentario registrado correctamente' });
  } else {
    // Método no permitido
    res.status(405).json({ message: 'Método no permitido' });
  }
}
