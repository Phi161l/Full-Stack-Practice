import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { Journal } from "@/src/models/Journal";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  await connectDB();

  const session = (await getServerSession(
    authOptions as any,
  )) as Session | null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const journals = await Journal.find({ user: session.user?.email }).sort({
    createdAt: -1,
  });

  return NextResponse.json(journals);
}

export async function POST(req: Request) {
  await connectDB();

  //   const session = await getServerSession(authOptions as any);
  const session = (await getServerSession(
    authOptions as any,
  )) as Session | null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await req.json();

  const journal = await Journal.create({
    title,
    content,
    user: session.user?.email,
  });

  return NextResponse.json(journal);
}
