"use server";

// This file will set up the Mongo DB Connection

// lib/dbConnect.ts
import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("Already connected to the database.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
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
