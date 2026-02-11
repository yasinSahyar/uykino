import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/sazkino";

export async function connectDatabase() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Database already connected");
      return;
    }

    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      w: "majority",
    });

    console.log("Database connected successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

export async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (error) {
    console.error("Database disconnection failed:", error);
    throw error;
  }
}
