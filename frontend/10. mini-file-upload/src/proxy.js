import { NextResponse } from "next/server";
import { getAuthUser } from "./lib/auth.js";

export async function proxy(req) {
  const user = await getAuthUser();
  console.log(user)

  const protectedPaths = [
    "/upload",
    "/api/upload",
    "/api/delete-upload",
    "/api/list-uploads",
  ];

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
