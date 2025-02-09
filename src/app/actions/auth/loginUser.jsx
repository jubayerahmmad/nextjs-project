"use server";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async ({ email, password }) => {
  const userCollection = dbConnect(collectionNames.userCollection);
  const user = await userCollection.findOne({ email });
  if (!user) return null;

  const isPasswordOk = bcrypt.compare(user?.password, password);
  if (!isPasswordOk) return null;
  return user;
};
