import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { ContactSubmission } from "@/app/models/ContactSubmission";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";

export async function GET(req) {
    try {
        const session = await getServerSession(authoptions);

        if (!session || !["admin", "superadmin"].includes(session.user.role)) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();
        const submissions = await ContactSubmission.find().sort({ createdAt: -1 });

        return NextResponse.json(
            { data: submissions },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching contact submissions:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
