import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI || '');
const clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    global._mongoClientPromise = client.connect();
    clientPromise = global._mongoClientPromise;
  }
} else {
  clientPromise = client.connect();
}

// Exporta clientPromise como exportación predeterminada
export default clientPromise;
