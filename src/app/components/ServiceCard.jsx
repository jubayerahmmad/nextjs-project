import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ServiceCard = ({ service }) => {
  return (
    <Card className="border hover:shadow-lg transition-all cursor-pointer">
      <img
        src={service?.img}
        alt="service image"
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <CardContent className="p-4 font-bold">
        <h3 className="text-lg">{service.title}</h3>
        <div className="flex justify-between">
          <p className="text-red-500 font-medium">Price: {service.price}</p>
          <Link href={`services/${service._id}`}>
            <ArrowRight className="text-red-500" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
