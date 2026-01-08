import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ServiceApplication } from "@/app/models/ServiceApplication.model";

// GET - Fetch specific application details
export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = params;

        const application = await ServiceApplication.findById(id)
            .populate("serviceId", "title description category image price")
            .populate("userId", "email")
            .populate("reviewedBy", "email");

        if (!application) {
            return NextResponse.json(
                { success: false, message: "Application not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            application,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching application:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch application" },
            { status: 500 }
        );
    }
}
