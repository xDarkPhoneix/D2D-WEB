import mongoose from "mongoose";

const contactSubmissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "contacted", "resolved"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export const ContactSubmission =
    mongoose.models.ContactSubmission ||
    mongoose.model("ContactSubmission", contactSubmissionSchema);
