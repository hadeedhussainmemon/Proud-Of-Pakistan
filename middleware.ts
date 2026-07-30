import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  // Protect Admin CMS pathways
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/api/auth/signin", nextUrl));
    }
    
    const userRole = (req.auth.user as any)?.role;
    if (userRole !== "Admin") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
