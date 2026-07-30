import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const protectedPaths = ["/admin", "/profile", "/personalities/submit"];
  const isProtected = protectedPaths.some((p) => nextUrl.pathname.startsWith(p));

  if (isProtected) {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
    
    // Admin specific check
    if (nextUrl.pathname.startsWith("/admin")) {
      const userRole = (req.auth.user as any)?.role;
      if (userRole !== "Admin") {
        return NextResponse.redirect(new URL("/", nextUrl));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/personalities/submit/:path*"],
};
