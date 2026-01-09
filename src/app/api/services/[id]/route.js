import { requireAdmin } from "@/app/lib/admin-auth";
import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/models/task.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid service ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const service = await Task.findById(id);

    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch service" },
      { status: 500 }
    );
  }
}
