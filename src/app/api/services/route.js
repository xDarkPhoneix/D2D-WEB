import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Service } from "@/app/models/Service.model";

// GET - Fetch all active services
export async function GET() {
    try {
        await connectDB();

        const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            services,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch services" },
            { status: 500 }
        );
    }
}

// POST - Create new service (Admin only)
export async function POST(request) {
    try {
        await connectDB();

        const body = await request.json();
        const { title, description, category, image, price } = body;

        // Validate required fields
        if (!title || !description) {
            return NextResponse.json(
                { success: false, message: "Title and description are required" },
                { status: 400 }
            );
        }

        const newService = await Service.create({
            title,
            description,
            category,
            image,
            price,
        });

        return NextResponse.json({
            success: true,
            message: "Service created successfully",
            service: newService,
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create service" },
            { status: 500 }
        );
    }
}
