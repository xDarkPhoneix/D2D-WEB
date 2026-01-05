import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
 
  
  
  const pathname = req.nextUrl.pathname;
  
  

  // Not logged in → redirect to login
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
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
  matcher: ["/dashboard/:path*", "/set-password"],
};
