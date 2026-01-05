import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    description:{
      type: String,
      required: true,
      trim:true
    },
    status: {
      type: String,
      trim: true,
      enum:["pending","onHold","approved","rejected"],
      default:"pending"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin
    },

  },
  { timestamps: true } // optional but helpful for tracking users
);


export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);