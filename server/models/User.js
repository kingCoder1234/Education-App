import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
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
      enum: ["user", "admin", "teacher"],
      default: "user",
    },
    mainrole: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: "false",
    },
    subscription: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);
