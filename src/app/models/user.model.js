import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
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

    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "superadmin", "projectmanager"],
    },
    //admin only attributes
    isVerified: {
      type: Boolean,

    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // superadmin
    },

    // Onboarding & Business Information
    organizationName: {
      type: String,
      trim: true
    },
    userRole: {  // Renamed to avoid conflict with existing role field
      type: String,
      trim: true
    },
    businessCategory: {
      type: String,
      enum: [
        'Startup Founder / Business Owner',
        'Cafe / Restaurant / Retail Brand',
        'D2C / E-commerce Brand',
        'Dairy / FMCG / Manufacturing Brand',
        'Incubation Centre / Accelerator / E-Cell',
        'Government Body / Institution / University',
        'Personal Brand / Founder / CXO',
        ''
      ],
      default: ''
    },
    industry: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },

    // Lead Management
    leadStatus: {
      type: String,
      enum: ['visitor', 'lead', 'client'],
      default: 'visitor'
    },
    accountManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    // Brand Ownership
    ownsBrand: {
      type: Boolean,
      default: false
    },
    brands: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand'
    }]

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