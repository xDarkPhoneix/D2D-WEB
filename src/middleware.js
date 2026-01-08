import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NEXTAUTH_SECRET } from "@/auth-secret";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });


  const pathname = req.nextUrl.pathname;



  // Not logged in → redirect to login
  // All dashboard routes now require authentication
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Authenticated user should not access /login
  if (token && pathname === "/login") {
    const redirectUrl = token.role === "admin"
      ? "/dashboard/admindashboard"
      : "/dashboard/userdashboard";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Google user without password → force set-password
  if (token && !token.hasPassword && !pathname.startsWith("/set-password")) {
    return NextResponse.redirect(new URL("/set-password", req.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token.role === "admin" && !token.isVerified) {
      return NextResponse.redirect(
        new URL("/not-approved", req.url)
      );
    }
  }

  return NextResponse.next();
}

// Apply middleware only to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/set-password", "/login"],
};
