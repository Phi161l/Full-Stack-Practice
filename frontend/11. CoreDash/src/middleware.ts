import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("coredash_session");

  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/dashboard/users") &&
    session?.value == "2"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
