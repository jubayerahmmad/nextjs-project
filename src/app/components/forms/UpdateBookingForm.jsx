"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateBookingForm = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(data);

  const handleUpdateBooking = async (e) => {
    e.preventDefault();

    const form = e.target;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const bookingPayload = {
      // User Inputs
      date,
      phone,
      address,
    };

    // return console.log(bookingPayload);

    const res = await fetch(
      `https://car-doctor-smoky.vercel.app/api/my-booking/${data._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(bookingPayload),
      }
    );

    const updatedResponse = await res.json();
    console.log(updatedResponse);
    toast.success("Data Updated");
    router.push("/my-bookings");
    form.reset();
  };

  return (
    <div className="my-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl mb-4">
          Book Service : {data?.title}
        </h2>
        <form onSubmit={handleUpdateBooking}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
              <label className="font-bold">Name</label>
              <input
                defaultValue={session?.user?.name}
                readOnly
                type="text"
                name="name"
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>

            <div className="">
              <label className="font-bold">Email</label>
              <input
                defaultValue={session?.user?.email}
                readOnly
                type="text"
                name="email"
                placeholder="email"
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
            <div className="">
              <label className="font-bold">Due amount</label>
              <input
                type="text"
                defaultValue={data?.service_price}
                readOnly
                name="price"
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
            <div className="">
              <label className="font-bold">Date</label>
              <input
                type="date"
                name="date"
                defaultValue={data?.date}
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
            <div className="">
              <label className="font-bold">Phone</label>
              <input
                type="text"
                name="phone"
                defaultValue={data.phone}
                placeholder="Your Phone"
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
            <div className="">
              <label className="font-bold">Present Address</label>
              <input
                type="text"
                name="address"
                defaultValue={data.address}
                placeholder="Your Address"
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
          </div>
          <div className="mt-6">
            <input
              className="px-4 py-2 rounded-lg border bg-gray-200 cursor-pointer font-bold"
              type="submit"
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBookingForm;
