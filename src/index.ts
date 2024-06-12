import express from "express";
import connectUserDB from "./db/userDB";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";

import { userMiddleware, adminMiddleware } from "./middleware/authMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import { Types } from "mongoose";

dotenv.config();

interface UserBasicInfo {
  _id: Types.ObjectId;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}

const app = express();
const port = process.env.PORT || 8000;
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(bodyParser.json()); // To recognize the req obj as a json obj
app.use(bodyParser.urlencoded({ extended: true })); // To recognize the req obj as strings or arrays. extended true to handle nested objects also

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(authRouter); // public routes
app.use("/api/users", userMiddleware, userRouter); // protected routes
app.use("/api/admin", adminMiddleware, adminRouter); // protected routes

app.use(errorHandler);

connectUserDB();

app.get("/", (req, res) => {
  res.send("home page.");
});
