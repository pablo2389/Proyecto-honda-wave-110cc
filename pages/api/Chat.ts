import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

const clientPromise: Promise<MongoClient> = 
  process.env.NODE_ENV === 'development'
    ? (() => {
        const globalWithMongo = global as typeof globalThis & {
          _mongoClientPromise?: Promise<MongoClient>;
        };
        if (!globalWithMongo._mongoClientPromise) {
          globalWithMongo._mongoClientPromise = client.connect();
        }
        return globalWithMongo._mongoClientPromise;
      })()
    : client.connect();

// Función para conectarse a la base de datos
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db();
  return { client, db };
}
