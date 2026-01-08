import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Job } from "@/app/models/job.model";


/* GET → list all jobs */
export async function GET() {
  try {
    await connectDB();
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch jobs" }, { status: 500 });
  }
}

/* POST → create new job */
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body);
    

    const job = await Job.create({
      ...body,
      createdBy: body.createdBy, // admin user id
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create job" ,error}, { status: 500 });
  }
}
