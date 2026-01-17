import { NextResponse } from "next/server";
import { getAuthUser } from "./lib/auth.js";

export async function proxy(req) {
  const user = await getAuthUser();

  const protectedPaths = [
    "/upload",
    "/api/upload",
    "/api/delete-upload",
    "/api/list-uploads",
  ];

  const guestOnlyPaths = [
    "/login",
    "/signup",
  ];

  
   const isGuestOnly  = guestOnlyPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if(user && isGuestOnly ){
    return NextResponse.redirect(new URL("/", req.url))
  }

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !user) {
    // API → 401
    if (req.nextUrl.pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Page → redirect
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
