import jwt from "jsonwebtoken";
import { Response, Request } from "express";

const generateToken = (res: Response, userId: string) => {
  const jwtSecret = process.env.JWT_SECRET || "";
  const token = jwt.sign({ userId }, jwtSecret, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
  return token;
};

const clearToken = (req: Request, res: Response) => {
  if (req?.cookies && req?.cookies.jwt) {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Successfully logged out" });
  } else {
    res.status(200).json({ message: "You are already logged out" });
  }
};

export { generateToken, clearToken };
