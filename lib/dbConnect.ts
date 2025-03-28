"use server";

// This file will set up the Mongo DB Connection

import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  const MONGODB_URI =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI_PROD
      : process.env.MONGODB_URI_DEV;

  console.log(MONGODB_URI);

  if (!MONGODB_URI) {
    throw new Error("MongoDB URI is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(MONGODB_URI!, {
      // Options are no longer required in recent versions
    });
    connection.isConnected = db.connections[0].readyState === 1;
    console.log("Database connected");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};

export default dbConnect;
