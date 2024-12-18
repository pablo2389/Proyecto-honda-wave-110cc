import { NextApiRequest, NextApiResponse } from 'next'; // Importa los tipos correctos
import { connectToDatabase } from '../../lib/mongo'; // Asegúrate de que esta importación esté bien

import { ObjectId } from 'mongodb'; // Importa el tipo ObjectId de MongoDB si es necesario para el manejo de IDs

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Esperamos la promesa y extraemos `db` del objeto devuelto
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    // Obtener todos los mensajes
    try {
      const messages = await db.collection('messages').find().sort({ timestamp: 1 }).toArray(); // Ordenar por timestamp
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los mensajes' });
    }
  } else if (req.method === 'POST') {
    // Guardar un nuevo mensaje
    const { text, user, imageUrl } = req.body;

    if (!text || !user) {
      return res.status(400).json({ message: 'El mensaje y el usuario son obligatorios' });
    }

    try {
      const newMessage = { 
        text, 
        user, 
        imageUrl, 
        timestamp: new Date() 
      };

      const result = await db.collection('messages').insertOne(newMessage); // Insertar mensaje

      // Devolver el mensaje insertado, directamente desde result
      res.status(201).json({
        _id: result.insertedId,
        ...newMessage, // Incluye los datos del nuevo mensaje
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al guardar el mensaje' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
