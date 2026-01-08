import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ServiceApplication } from "@/app/models/ServiceApplication.model";

// PATCH - Update application status (Admin only)
export async function PATCH(request, { params }) {
    try {
        await connectDB();

        const { id } = params;
        const body = await request.json();
        const { status, adminNotes, reviewedBy } = body;

        // Validate status
        if (!status || !["pending", "accepted", "rejected"].includes(status)) {
            return NextResponse.json(
                { success: false, message: "Invalid status" },
                { status: 400 }
            );
        }

        const updateData = {
            status,
            adminNotes,
            reviewedBy,
            reviewedAt: new Date(),
        };

        const updatedApplication = await ServiceApplication.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
            .populate("serviceId", "title description category")
            .populate("userId", "email")
            .populate("reviewedBy", "email");

        if (!updatedApplication) {
            return NextResponse.json(
                { success: false, message: "Application not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Application status updated successfully",
            application: updatedApplication,
        }, { status: 200 });
    } catch (error) {
        console.error("Error updating application:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update application" },
            { status: 500 }
        );
    }
}
