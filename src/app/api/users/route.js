import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/user.model";

import { NextResponse } from "next/server";


export async function GET() {
  try {
    await connectDB();

    const users = await User.find({}).sort({ createdAt: -1 });

    const formattedUsers = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      joinedDate: user.createdAt.toISOString().split("T")[0],
    }));

    return NextResponse.json(formattedUsers, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        
        
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
