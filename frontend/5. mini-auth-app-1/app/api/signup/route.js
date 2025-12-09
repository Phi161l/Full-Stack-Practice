import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersPath = path.join(process.cwd(), "data", "users.json");

export async function POST(request) {
  const { email, password } = await request.json();

  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  const exists = users.find((u) => u.email === email);

  if (exists) {
    return NextResponse.json({ ok: false, message: "User already exists" });
  }

  users.push({ email, password });

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  return NextResponse.json({ ok: true });
}
