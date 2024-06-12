import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";

enum Roles {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document<any> {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  token: String;
  comparePassword: (enteredPassword: string) => boolean;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Roles,
    default: "user",
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
