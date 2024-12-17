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

// Exporta la función para la conexión
export default async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(); // Accedemos a la base de datos
  return { client, db }; // Devolvemos un objeto con el cliente y la base de datos
}
