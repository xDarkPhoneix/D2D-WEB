import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {  
    name:{
       type: String,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum: ["user", "admin","superadmin","projectmanager"],
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    joinedDate: {
      type: String,
    },
   
    //admin only attributes
    isVerified:{
        type:Boolean,
        
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // superadmin
    },

  },
  { timestamps: true } // optional but helpful for tracking users
);


userSchema.index(
  { role: 1 },
  {
    unique: true,
    partialFilterExpression: { role: "superadmin" },
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);