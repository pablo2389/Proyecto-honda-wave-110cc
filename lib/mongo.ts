import { MongoClient } from 'mongodb';

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI!;
const options = {};

let client = new MongoClient(uri, options);
const clientPromise = client.connect();

if (process.env.NODE_ENV !== 'production') {
  global._mongoClientPromise = clientPromise;
}

export default clientPromise;
