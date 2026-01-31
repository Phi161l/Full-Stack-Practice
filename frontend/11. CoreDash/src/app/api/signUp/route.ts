import { getUserByEmail } from "@/lib/auth";
import { addUser, saveUsers } from "@/lib/fileStore";
import { User } from "@/types/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  

  const user = getUserByEmail(email);
  if (user) {
    return NextResponse.json(
      { success: false, message: "User already registered" },
      { status: 409 },
    );
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    role: "user",
  };

  addUser(newUser);

   return NextResponse.json(
    { success: true, message: "Signup successful", user: newUser },
    { status: 201 }
  );
}
