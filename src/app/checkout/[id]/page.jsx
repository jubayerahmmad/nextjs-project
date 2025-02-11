import CheckoutForm from "@/app/components/forms/CheckoutForm";

const CheckOutPage = async ({ params }) => {
  const p = await params;

  const res = await fetch(`http://localhost:3000/api/service/${p.id}`);
  const data = await res?.json();

  return (
    <div>
      <CheckoutForm data={data} />
    </div>
  );
};

export default CheckOutPage;
