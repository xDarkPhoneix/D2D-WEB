import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/user.model";

export async function GET() {
  try {
    await connectDB();

    const counts = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    if (!counts) {
      return NextResponse.json(
        { error: "Failed to Count total users" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        counts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch user count",
      },
      { status: 500 }
    );
  }
}
