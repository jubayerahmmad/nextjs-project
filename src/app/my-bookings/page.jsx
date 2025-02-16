import dbConnect, { collectionNames } from "@/lib/dbConnect";
import MyBookingTable from "../components/tables/MyBookingTable";

export default async function MyBookings() {
  const bookingsCollection = dbConnect(collectionNames.bookingCollection);
  const data = await bookingsCollection.find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-6">My Bookings</h1>
      <div className="border rounded-xl">
        <MyBookingTable data={data} />
      </div>
    </div>
  );
}
