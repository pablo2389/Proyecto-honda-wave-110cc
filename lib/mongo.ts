// ✅ CORREGIDO
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env');
}

if (globalWithMongo._mongoClientPromise) {
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  globalWithMongo._mongoClientPromise = clientPromise;
}

export default clientPromise;
