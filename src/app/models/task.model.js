import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    { 
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    requestedBy: {
      type: String,
      required: true,
      trim: true,
    },


    // optional: reference to user (if you want later)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin
    },
    date: {
      type: Date,
      default: Date.now,
    },

  },
  { timestamps: true } // optional but helpful for tracking users
);


export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);