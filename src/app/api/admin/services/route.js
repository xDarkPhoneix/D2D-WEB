import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Service } from "@/app/models/Service.model";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";

// GET - Fetch all services (Admin only) - Include inactive ones
export async function GET(request) {
    try {
        await connectDB();

        const session = await getServerSession(authoptions);

        if (!session || !session.user || session.user.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Admin access required." },
                { status: 403 }
            );
        }

        const services = await Service.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            services,
            total: services.length,
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch services" },
            { status: 500 }
        );
    }
}

// POST - Create new service
export async function POST(request) {
    try {
        await connectDB();

        const session = await getServerSession(authoptions);

        if (!session || !session.user || session.user.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Unauthorized. Admin access required." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { title, description, category, image, price } = body;

        // Validate required fields
        if (!title || !description || !category) {
            return NextResponse.json(
                { success: false, message: "Please fill all required fields" },
                { status: 400 }
            );
        }

        const newService = await Service.create({
            title,
            description,
            category,
            image: image || "/placeholder-service.jpg",
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
