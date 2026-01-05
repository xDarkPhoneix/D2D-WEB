import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

export async function GET(req) {

  await connectDB();

  const pendingAdmins = await User.find({
    role: "admin",
    isVerified: false,
  });

  if(!pendingAdmins){
      return NextResponse.json(
           { error: "Failed to fecth Admins" },
           { status: 403 }
         );
  }
return NextResponse.json({ message: "Admin Fetched successfully",pendingAdmins });
}
