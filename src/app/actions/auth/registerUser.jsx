"use server";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {
  const userCollection = dbConnect(collectionNames.userCollection);
  // validation;
  if (!userData) {
    return null;
  }

  const user = await userCollection.findOne({ email: userData?.email });
  if (!user) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const result = await userCollection.insertOne(userData);
    console.log(result);
  }
  return null;
};
