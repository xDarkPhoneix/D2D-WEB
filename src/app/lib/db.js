import mongoose from "mongoose";

const MONGODB_UR = process.env.MONGODB_URL;
if (!MONGODB_UR) {
  throw new Error("Please Give Mongo URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    console.log("✅ Using existing DB connection:", mongoose.connection.name);
    return cached.conn;
  }

  if (!cached.promise) {
    const opt = {
      bufferCommands: true,
      maxPoolSize: 5,
    };
    cached.promise = mongoose
      .connect(MONGODB_UR, opt)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB database:", mongoose.connection.name);
    console.log("📦 Host:", mongoose.connection.host);
    console.log("🧱 Collections:",Object.keys(mongoose.connection.collections));
  } catch (error) {
    cached.promise = null;
    throw new Error("Check Database File");
  }

  return cached.conn;
}
export default connectDB;
