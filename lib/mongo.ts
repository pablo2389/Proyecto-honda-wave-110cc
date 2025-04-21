import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

declare global {
  // Solo usamos esto si no está ya definido
  // @ts-ignore: Evita conflicto de tipos en compilaciones posteriores
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Creamos el cliente solo una vez y lo reutilizamos
const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ?? (global._mongoClientPromise = new MongoClient(uri, options).connect());

export default clientPromise;
