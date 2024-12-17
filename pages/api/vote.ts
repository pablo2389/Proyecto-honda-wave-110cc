// pages/api/vote.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { vote } = req.body;

    // Validar que el voto esté presente
    if (!vote) {
      return res.status(400).json({ message: 'Voto no válido' });
    }

    // Aquí podrías guardar el voto en la base de datos o hacer otra acción
    console.log(`Voto recibido: ${vote}`);

    // Responder con un mensaje de éxito
    res.status(200).json({ message: 'Voto registrado correctamente' });
  } else {
    // Si la petición no es POST, respondemos con un error 405 (Método no permitido)
    res.status(405).json({ message: `Método ${req.method} no permitido` });
  }
}
