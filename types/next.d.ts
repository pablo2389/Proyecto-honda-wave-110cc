// types/next.d.ts
import { IncomingMessage } from 'http';

declare global {
  namespace NodeJS {
    interface IncomingMessage {
      file?: Express.Multer.File; // Agrega la propiedad 'file' al tipo IncomingMessage
    }
  }
}
