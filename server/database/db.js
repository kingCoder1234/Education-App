import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MY_MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Connection String:", process.env.MY_MONGODB_URI);
    process.exit(1);
  }
};

export default connectDb;
