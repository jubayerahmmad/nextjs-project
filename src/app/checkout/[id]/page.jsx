import CheckoutForm from "@/app/components/forms/CheckoutForm";

const CheckOutPage = async ({ params }) => {
  const p = await params;

  const res = await fetch(
    `https://car-doctor-smoky.vercel.app/api/service/${p.id}`
  );
  const data = await res?.json();

  return (
    <div>
      <CheckoutForm data={data} />
    </div>
  );
};

export default CheckOutPage;
