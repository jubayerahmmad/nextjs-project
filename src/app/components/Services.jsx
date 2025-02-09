import dbConnect, { collectionNames } from "@/lib/dbConnect";
import ServiceCard from "./ServiceCard";

const Services = async () => {
  const servicesCollection = dbConnect(collectionNames.serviceCollection);
  const data = await servicesCollection.find({}).toArray();
  return (
    <div className="max-w-7xl mx-auto my-6">
      <h2 className="text-center font-bold text-3xl mb-4">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
