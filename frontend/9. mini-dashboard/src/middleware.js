import { NextResponse } from "next/server";

export function middleware(request) {
  const isLoggedIn = true;     // simulate auth for now
  const { pathname } = request.nextUrl;

  if ( pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

}


export const config = {
  matcher: ["/dashboard/:path*"],
};
