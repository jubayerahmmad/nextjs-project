"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    // return console.log(id);
    const res = await fetch(`http://localhost:3000/api/service/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    router.refresh();
    console.log(data);
  };
  return (
    <Button onClick={handleDelete} variant="destructive">
      Delete
    </Button>
  );
};

export default DeleteButton;
