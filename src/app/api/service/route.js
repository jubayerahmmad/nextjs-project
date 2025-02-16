import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const bookingCollection = dbConnect(collectionNames.bookingCollection);
export const GET = async (req) => {
  const { user } = await getServerSession(authOptions);
  if (user) {
    console.log(user);
    const email = user?.email;
    const result = await bookingCollection.find({ email }).toArray();
    return NextResponse.json(result);
  }
};

export const POST = async (req) => {
  const body = await req.json();
  const result = await bookingCollection.insertOne(body);
  return NextResponse.json(result);
};
