import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const p = await params;
  //   console.log("from get api", p);
  const servicesCollection = dbConnect(collectionNames.serviceCollection);
  const data = await servicesCollection.findOne({ _id: new ObjectId(p?.id) });

  return NextResponse.json(data);
};

export const DELETE = async (req, { params }) => {
  const p = await params;
  const bookingCollection = dbConnect(collectionNames.bookingCollection);
  const query = { _id: new ObjectId(p.id) };
  const session = await getServerSession(authOptions);

  // validations
  const currentBooking = await bookingCollection.findOne(query);
  const isOwnerOK = session?.user?.email === currentBooking.email;
  if (!isOwnerOK) {
    return NextResponse.json({ message: "Forbidden Action" });
  }
  // delete booking
  const deleteBooking = await bookingCollection.deleteOne(query);
  revalidatePath("/my-bookings");
  return NextResponse.json(deleteBooking);
};
