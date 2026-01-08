import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ServiceApplication } from "@/app/models/ServiceApplication.model";
import { getServerSession } from "next-auth";

// GET - Fetch current user's service applications
export async function GET(request) {
    try {
        await connectDB();

        // Get user session (you'll need to implement authentication)
        // For now, we'll add a userId query parameter
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "User ID is required" },
                { status: 400 }
            );
        }

        const applications = await ServiceApplication.find({ userId })
            .populate("serviceId", "title description category image")
            .populate("userId", "email")
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            applications,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching service applications:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch applications" },
            { status: 500 }
        );
    }
}

// POST - Submit new service application
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const {
            userId,
            serviceId,
            fullName,
            email,
            phone,
            companyName,
            projectDescription,
            budgetRange,
            preferredStartDate,
            additionalNotes,
        } = body;

        // Validate required fields
        if (!userId || !serviceId || !fullName || !email || !phone || !projectDescription) {
            return NextResponse.json(
                { success: false, message: "Please fill all required fields" },
                { status: 400 }
            );
        }

        const newApplication = await ServiceApplication.create({
            userId,
            serviceId,
            fullName,
            email,
            phone,
            companyName,
            projectDescription,
            budgetRange,
            preferredStartDate,
            additionalNotes,
            status: "pending",
        });

        // Populate service details for response
        await newApplication.populate("serviceId", "title description category");

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully",
            application: newApplication,
        }, { status: 201 });
    } catch (error) {
        console.error("Error submitting application:", error);
        return NextResponse.json(
            { success: false, message: "Failed to submit application" },
            { status: 500 }
        );
    }
}
