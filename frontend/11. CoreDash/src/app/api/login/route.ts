import { NextResponse } from "next/server";
import { createSession, getUserByEmail } from "@/lib/auth";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = getUserByEmail(email);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Email not registered" },
      { status: 401 },
    );
  }

  await createSession(user.id);

  return NextResponse.json(
    { success: true, message: "Login successful" },
    { status: 200 },
  );
}
