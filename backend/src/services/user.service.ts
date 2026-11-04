import User from "../models/user.model.ts";
import bcrypt from "bcrypt";


interface CreateUserPayload {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  emailId: string;
  userName: string;
  password: string;
}


export const createUser = async (
  userData: CreateUserPayload
) => {

  const existingUser = await User.findOne({
    $or: [
      { emailId: userData.emailId },
      { userName: userData.userName },
      { mobileNumber: userData.mobileNumber }
    ]
  });


  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }


  const hashedPassword = await bcrypt.hash(
    userData.password,
    10
  );


  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });


  return user;
};