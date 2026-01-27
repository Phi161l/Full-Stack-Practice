import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsers } from "./lib/fileStore";

const PUBLIC_ROUTES = ["/", "/login"];
const USER_BLOCKED_DASHBOARD_ROUTES = [
  "/dashboard/users",
  "/dashboard/logs",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Read session safely
  const sessionCookie = req.cookies.get("coredash_session");
  const sessionId = sessionCookie?.value;

  const users = getUsers();
  const user = sessionId
    ? users.find((u) => u.id === sessionId)
    : null;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // 2. Not authenticated → block dashboard
  if (!user && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. Authenticated → block login page
  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 4. Role-based access control
  if (
    user?.role === "user" &&
    USER_BLOCKED_DASHBOARD_ROUTES.some((route) =>
      pathname.startsWith(route)
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 5. Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
