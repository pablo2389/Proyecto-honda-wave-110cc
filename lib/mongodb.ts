import { MongoClient } from 'mongodb';

// URI de conexión a MongoDB desde las variables de entorno
const client = new MongoClient(process.env.MONGODB_URI || '');

let clientPromise: Promise<MongoClient>;

// En desarrollo, aseguramos que no se haga múltiples conexiones a la base de datos
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

// Función para obtener la conexión a la base de datos
export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB); // Nombre de la base de datos en MongoDB
  return { client, db };    
}
