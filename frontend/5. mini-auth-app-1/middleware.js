import { NextResponse } from "next/server";

export function middleware(req) {
  console.log(req)
  const session = req.cookies.get("session");
  console.log(session)

  const isAuth = !!session;

  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/", "/login", "/signup"];
  const isPublic = publicPaths.includes(pathname);

  if (!isPublic && !isAuth) {
    // User is trying to access a protected page without session
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if ((pathname === "/login" || pathname === "/signup") && isAuth) {
    // Logged-in users shouldn’t see login/signup
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard", "/about"],
};
