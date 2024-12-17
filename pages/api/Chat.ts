import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, se utiliza una promesa global para evitar nuevas conexiones.
  let globalWithMongo = global as typeof globalThis & { _mongoClientPromise: Promise<MongoClient> };
  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

// Función para conectarse a la base de datos
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db();
  return { client, db };
}
