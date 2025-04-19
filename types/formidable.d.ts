declare module 'formidable' {
    import { IncomingMessage } from 'http';
  
    export class IncomingForm {
      uploadDir: string;
      keepExtensions: boolean;
      parse(req: IncomingMessage, callback: (err: any, fields: any, files: any) => void): void;
      // Otros métodos que uses de formidable...
    }
  }
  