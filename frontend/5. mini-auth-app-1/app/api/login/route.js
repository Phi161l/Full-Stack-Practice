import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { generateToken } from "../../../lib/auth.js";

const usersPath = path.join(process.cwd(), "data", "users.json");

export async function POST(request) {
  const { email, password } = await request.json();

  const users = JSON.parse(fs.readFileSync(usersPath, "utf8"));

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ ok: false, message: "Invalid credentials" });
  }

  const token = generateToken();

  const response = NextResponse.json({ ok: true });

  response.cookies.set("session", token, {
    httpOnly: true,
    path: "/",
  });

  console.log(response)
 
  return response;
}
