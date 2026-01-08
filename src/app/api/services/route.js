import { requireAdmin } from "@/app/lib/admin-auth";
import { connectDB } from "@/app/lib/db";
import { Task } from "@/app/models/task.model";
import { NextResponse } from "next/server";


export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    await connectDB();
    const services = await Task.find().sort({ createdAt: -1 });
    return NextResponse.json(services);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
