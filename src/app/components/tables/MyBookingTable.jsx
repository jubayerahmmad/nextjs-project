import DeleteButton from "@/app/my-bookings/comps/DeleteButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

const MyBookingTable = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Service Image</TableHead>
          <TableHead>Service Name</TableHead>
          <TableHead>Service Date</TableHead>
          <TableHead>Service Price</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <Image
                src={item.service_img}
                height={50}
                width={50}
                className="rounded-lg"
                alt={item.service_name}
              />
            </TableCell>
            <TableCell>{item.service_name}</TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.service_price}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.address}</TableCell>
            <TableCell>
              <div className="flex gap-2 items-center">
                <Link href={`/my-bookings/${item._id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <DeleteButton id={item._id.toString()} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MyBookingTable;
