import mongoose from "mongoose";
import { env } from "./env-config";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(env.mongoDb.uri, {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (e) {}
};
