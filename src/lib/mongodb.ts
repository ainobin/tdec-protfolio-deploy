import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

if (!process.env.MONGODB_DB_NAME) {
  throw new Error('Please add your MongoDB database name to .env');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

const options = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 10000,
  maxPoolSize: 20,
  minPoolSize: 2,
  retryWrites: true,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Helper function to get the database
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

// Helper function to get a collection
export async function getCollection<T = any>(collectionName: string) {
  const db = await getDatabase();
  return db.collection<T>(collectionName);
}
