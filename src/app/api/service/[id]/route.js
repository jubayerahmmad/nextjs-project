import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const p = await params;
  //   console.log("from get api", p);

  const servicesCollection = dbConnect(collectionNames.serviceCollection);
  const data = await servicesCollection.findOne({ _id: new ObjectId(p?.id) });

  return NextResponse.json(data);
};
