import UpdateBookingForm from "@/app/components/forms/UpdateBookingForm";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export default async function BookingUpdatePage({ params }) {
  const param = await params;

  const bookingCollection = dbConnect(collectionNames.bookingCollection);
  const singleData = await bookingCollection.findOne({
    _id: new ObjectId(param.id),
  });
  //   const res = await fetch(`https://localhost:3000/api/my-booking/${param.id}`);
  //   const singleData = await res.json();
  return (
    <div>
      <UpdateBookingForm data={JSON.parse(JSON.stringify(singleData))} />
    </div>
  );
}
