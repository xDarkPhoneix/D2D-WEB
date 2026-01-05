import { getToken } from "next-auth/jwt";
import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = await getToken({ req });
  console.log(token);
  console.log(token.role);
  

  // 🔐 Only superadmin allowed
  if (!token || token.role !== "superadmin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 403 }
    );
  }

  const { adminId } = await req.json();
  await connectDB();

  const admin = await User.findById(adminId);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json(
      { error: "Invalid admin user" },
      { status: 400 }
    );
  }

  admin.isVerified = true;
  admin.verifiedBy = token.id;
  admin.verifiedAt = new Date();

  await admin.save();

  return NextResponse.json({ message: "Admin verified successfully" });
}
