import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const param = await params;

  const bookingCollection = dbConnect(collectionNames.bookingCollection);
  const query = { _id: new ObjectId(param.id) };
  const singleBooking = await bookingCollection.findOne(query);
  return NextResponse.json(singleBooking);
};
export const PATCH = async (req, { params }) => {
  const param = await params;
  const body = await req.json();
  const bookingCollection = dbConnect(collectionNames.bookingCollection);
  const query = { _id: new ObjectId(param.id) };
  const updatedData = {
    $set: { ...body },
  };
  const updateResponse = await bookingCollection.updateOne(query, updatedData);
  revalidatePath("/my-bookings");
  return NextResponse.json(updateResponse);
};
