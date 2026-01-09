import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Service } from "@/app/models/Service.model";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/lib/auth";

// PATCH - Update service (Admin only)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const session = await getServerSession(authoptions);

    if (!session || !session.user || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 403 }
      );
    }

    const { id } = await params;

    const body = await request.json();
    const { title, description, category, image, price, isActive } = body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(image !== undefined && { image }),
        ...(price !== undefined && { price }),
        ...(isActive !== undefined && { isActive }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return NextResponse.json(
        { success: false, message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Service updated successfully",
        service: updatedService,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update service" },
      { status: 500 }
    );
  }
}
