import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoptions } from "./auth";

export async function requireAdmin() {
  const session = await getServerSession(authoptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Forbidden: Admin access only" },
      { status: 403 }
    );
  }

  return null; // ✅ access granted
}
