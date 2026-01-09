import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ContactSubmission } from "@/app/models/ContactSubmission";

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, phone, location, message } = body;

        if (!name || !email || !phone || !location || !message) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        const newSubmission = await ContactSubmission.create({
            name,
            email,
            phone,
            location,
            message,
        });

        return NextResponse.json(
            { message: "Submission successful", data: newSubmission },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
