import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./errorMiddleware";

const userMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;

    if (!token) {
      throw new AuthenticationError("Token not found");
    }

    const jwtSecret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      throw new AuthenticationError("UserId not found");
    }

    const user = await User.findById(decoded.userId, "_id name email");

    if (!user) {
      throw new AuthenticationError("User not found");
    }

    req.user = user;
    next();
  }
);

const adminMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt;

    if (!token) {
      throw new AuthenticationError("Token not found");
    }

    const jwtSecret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      throw new AuthenticationError("UserId not found");
    }

    const user = await User.findById(decoded.userId, "_id name email role");

    if (user?.role !== "admin") {
      throw new AuthenticationError("Unauthorized");
    }

    req.user = user;
    console.log(req.user);

    next();
  }
);

export { userMiddleware, adminMiddleware };
