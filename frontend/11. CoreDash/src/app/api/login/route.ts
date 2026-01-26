import { NextResponse } from "next/server";
import { createSession, getUserByEmail } from "@/lib/auth";

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = getUserByEmail(email);

  if (!user) {
    return NextResponse.json({ error: "Invalid email" }, { status: 401 });
  }

  await createSession(user.id);

  return NextResponse.json({ success: true ,  "jksdf": "vksld", hello: "world"});
}
