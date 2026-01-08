import { connectDB } from "@/app/lib/db";
import { Job } from "@/app/models/job.model";
import { NextResponse } from "next/server";


export async function PATCH(req, { params }) {
  try {
    await connectDB();
    await params
    const { status } = await req.json();

    if (!["open", "closed"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    console.log("params",params);
    

    const job = await Job.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    return NextResponse.json(job);
  } catch {
    return NextResponse.json({ message: "Failed to update status" }, { status: 500 });
  }
}
