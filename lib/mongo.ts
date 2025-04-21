import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

declare global {
  // Definir la variable global correctamente, sin necesidad de @ts-ignore
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>;
    }
  }
}

// Usamos el operador de coalescencia nula para reutilizar la promesa existente o crear una nueva
const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ?? (global._mongoClientPromise = new MongoClient(uri, options).connect());

export default clientPromise;
