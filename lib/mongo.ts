import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('⚠️ La variable de entorno MONGODB_URI no está definida.');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client = new MongoClient(uri, options);
let clientPromise: Promise<MongoClient>;

// Tipado global solo en desarrollo
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB); // nombre de la DB
  return { client, db };
}
