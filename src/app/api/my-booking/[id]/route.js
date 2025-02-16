import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const param = await params;
  const bookingCollection = dbConnect(collectionNames.bookingCollection);
  const query = { _id: new ObjectId(param.id) };
  // validation
  const session = await getServerSession(authOptions);
  const singleBooking = await bookingCollection.findOne(query);
  const isOwner = session?.user?.email === singleBooking?.email;
  if (!isOwner) {
    return NextResponse.json({ message: "Forbidden Action" });
  }

  return NextResponse.json(singleBooking);
};
export const PATCH = async (req, { params }) => {
  const param = await params;
  const body = await req.json();
  const bookingCollection = dbConnect(collectionNames.bookingCollection);
  const query = { _id: new ObjectId(param.id) };
  // validation
  const session = await getServerSession(authOptions);
  const currentBookingData = await bookingCollection.findOne(query);
  const isOwner = session?.user?.email === currentBookingData?.email;
  if (!isOwner) {
    return NextResponse.json({ message: "Forbidden Action" });
  }
  // update data
  const updatedData = {
    $set: { ...body },
  };
  const updateResponse = await bookingCollection.updateOne(query, updatedData);
  revalidatePath("/my-bookings");
  return NextResponse.json(updateResponse);
};
