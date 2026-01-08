import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ServiceApplication } from "@/app/models/ServiceApplication.model";

// GET - Fetch all service applications (Admin only)
export async function GET(request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status");

        // Build filter query
        const filter = {};
        if (status && status !== "all") {
            filter.status = status;
        }

        const applications = await ServiceApplication.find(filter)
            .populate("serviceId", "title description category image")
            .populate("userId", "email")
            .populate("reviewedBy", "email")
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            applications,
            total: applications.length,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch applications" },
            { status: 500 }
        );
    }
}
