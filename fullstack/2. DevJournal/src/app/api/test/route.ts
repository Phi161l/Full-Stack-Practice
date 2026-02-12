import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";

export async function GET() {
  await connectDB();
  return NextResponse.json({ message: "Database connected" });
}
