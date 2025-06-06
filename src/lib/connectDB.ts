import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("Please define MONGODB connection string in the .env.local file");
}

interface MongooseCache {
  conn: typeof mongoose | null,
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof global & { mongoose?: MongooseCache };
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null};

const connectDB = async () => {
  if (cached.conn) {
    console.log("Database already connected.");
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      const options = {
        dbName: "learn-english"
      }
      cached.promise = mongoose.connect(MONGO_URI, options).then(mongoose => mongoose);
    } catch (error) {
      console.log("Error connecting to the database", error);
      throw error;
    }
  }

  console.log("Database connection established.");
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB; 