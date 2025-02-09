import dbConnect, { collectionNames } from "@/lib/dbConnect";

export async function POST(req) {
  const userData = await req.json();
  const result = await dbConnect(collectionNames.userCollection).insertOne(
    userData
  );
  console.log(result);
  return Response.json(result);
}
