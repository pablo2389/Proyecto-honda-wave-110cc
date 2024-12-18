import { MongoClient } from 'mongodb';

// URI de conexión a MongoDB desde las variables de entorno
const client = new MongoClient(process.env.MONGODB_URI || '');

let clientPromise: Promise<MongoClient>;

// En desarrollo, utilizamos una promesa global para evitar múltiples conexiones.
if (process.env.NODE_ENV === 'development') {
  // Establecemos el tipo global para evitar problemas con múltiples conexiones en desarrollo
  let globalWithMongo = global as typeof globalThis & { _mongoClientPromise: Promise<MongoClient> };
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

// Función para obtener la conexión a la base de datos
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB); // Obtiene la base de datos desde las variables de entorno
  return { client, db };  // Devuelve el cliente y la base de datos
}
