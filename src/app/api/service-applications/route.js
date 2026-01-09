import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ServiceApplication } from "@/app/models/ServiceApplication.model";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";

// GET - Fetch current user's service applications
export async function GET(request) {
    try {
        await connectDB();

        const session = await getServerSession(authoptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Please login." },
                { status: 401 }
            );
        }

        const applications = await ServiceApplication.find({ userId: session.user.id })
            .populate("serviceId", "title description category image price")
            .populate("userId", "email name")
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

        const session = await getServerSession(authoptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Please login to apply." },
                { status: 401 }
            );
        }

        const body = await request.json();
        const {
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
        if (!serviceId || !fullName || !email || !phone || !projectDescription) {
            return NextResponse.json(
                { success: false, message: "Please fill all required fields" },
                { status: 400 }
            );
        }

        const newApplication = await ServiceApplication.create({
            userId: session.user.id,
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
            message: "Application submitted successfully! We'll get back to you soon.",
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
