import bcrypt from "bcrypt";
import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  console.log(email ,password);
  
  if (!password) {
    return NextResponse.json(
      { error: "Password required" },
      { status: 400 }
    );
  }

  await connectDB();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  if (user.password) {
    return NextResponse.json(
      { error: "Password already set" },
      { status: 400 }
    );
  }

  user.password = await bcrypt.hash(password, 10);
  user.provider = "credentials";
  await user.save();

  return NextResponse.json({ message: "Password set successfully" });
}
