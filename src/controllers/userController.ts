import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError } from "../middleware/errorMiddleware";
import asyncHandler from "express-async-handler";

const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const user = await User.findById(userId, "name email");

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.params?.id;
  const { role } = req.body;

  // Validate role
  if (!["user", "admin"].includes(role)) {
    throw new BadRequestError("Invalid role");
  }

  // Update user
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, select: "-password" } // return the updated document and exclude the password field
  );

  if (!user) {
    throw new BadRequestError("User not found");
  }

  res.status(200).json(user);
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req?.params?.id;

  const user = await User.findById(userId);

  if (user) {
    await User.findByIdAndDelete(userId);

    res.status(200).json({ msg: "user deleted successfully" });
  } else {
    res.status(400).json({ msg: "user not found" });
  }
});

export { getUser, updateUser, deleteUser };
