import mongoose from "mongoose";

const connectUserDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log(`MongoDB Connected: ${process.env.MONGODB_URI}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectUserDB;
