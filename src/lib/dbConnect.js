import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
  serviceCollection: "test-services",
  userCollection: "test-users",
};

export default function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_NAME).collection(collectionName);
}
