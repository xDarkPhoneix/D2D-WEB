import { NextResponse } from "next/server";


import { connectDB } from "@/app/lib/db";
import { Job } from "@/app/models/job.model";

/* GET single job */
export async function GET(req, { params }) {
  try {
    await connectDB();
    const job = await Job.findById(params.id);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ message: "Error fetching job" }, { status: 500 });
  }
}

/* PATCH → edit job */
export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const updates = await req.json();

    const job = await Job.findByIdAndUpdate(params.id, updates, {
      new: true,
    });

    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ message: "Failed to update job" }, { status: 500 });
  }
}

/* DELETE → soft delete */
export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    await Job.findByIdAndUpdate(params.id, { isActive: false });

    return NextResponse.json({ message: "Job removed" });
  } catch {
    return NextResponse.json({ message: "Failed to delete job" }, { status: 500 });
  }
}
