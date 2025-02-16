"use client";

import { useSession } from "next-auth/react";

const CheckoutForm = ({ data }) => {
  const { data: session } = useSession();
  // console.log(session);

  const handleBookService = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;
    const bookingPayload = {
      // Session
      customerName: name,
      email,
      // User Inputs
      date,
      phone,
      address,
      // Extra information
      service_id: data._id,
      service_name: data.title,
      service_img: data.img,
      service_price: data.price,
    };

    // console.log(bookingPayload);

    const res = await fetch("https://car-doctor-smoky.vercel.app/api/service", {
      method: "POST",
      body: JSON.stringify(bookingPayload),
    });

    const postedResponse = await res.json();
    // console.log(postedResponse);
    form.reset();
  };

  return (
    <div className="my-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl mb-4">
          Book Service : {data?.title}
        </h2>
        <form onSubmit={handleBookService}>
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
                defaultValue={data?.price}
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
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
            <div className="">
              <label className="font-bold">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
            <div className="">
              <label className="font-bold">Present Address</label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="px-3 py-1.5 focus:border-teal-600 rounded-md outline-none border w-full"
              />
            </div>
          </div>
          <div className="mt-6">
            <input
              className="px-4 py-2 rounded-lg border bg-gray-200 cursor-pointer font-bold"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
