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

interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  emailId?: string;
  userName?: string;
  password?: string;
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

export const loginUser = async (userName: string, password: string) => {
  const user = await User.findOne({ userName });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid username or password");
  }

  return user;
};

export const updateUser = async (
  userId: string,
  userData: UpdateUserPayload
) => {
  const updates = { ...userData };

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const deleteUser = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error("User not found");
  }
};