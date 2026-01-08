import mongoose from "mongoose";

const serviceApplicationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        fullName: {
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
        companyName: {
            type: String,
            trim: true,
        },
        projectDescription: {
            type: String,
            required: true,
        },
        budgetRange: {
            type: String,
            trim: true,
        },
        preferredStartDate: {
            type: Date,
        },
        additionalNotes: {
            type: String,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending",
        },
        adminNotes: {
            type: String,
        },
        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        reviewedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

export const ServiceApplication =
    mongoose.models.ServiceApplication ||
    mongoose.model("ServiceApplication", serviceApplicationSchema);
