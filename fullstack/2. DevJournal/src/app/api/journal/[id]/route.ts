import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { Journal } from "@/src/models/Journal";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await connectDB();

  const session = (await getServerSession(
    authOptions as any,
  )) as Session | null;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id  = (await params).id;

  await Journal.findOneAndDelete({
    _id: id,
    user: session.user?.email,
  });

  return NextResponse.json({ message: "Deleted" });
}
