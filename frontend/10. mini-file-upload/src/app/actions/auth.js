"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const filePath = path.join(process.cwd(), "src/data/users.json");

//signUp
export async function signUp(formData) {
  const username = formData.get("username");
  const email = formData.get("email");

  if (!username || !email) {
    throw new Error("Missing fields");
  }

  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const exists = users.find((u) => u.email === email);
  if (exists) {
    throw new Error("User already Exists");
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
  };

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  redirect("/login");
}


//login
export async function login(formData) {
  const email = formData.get("email");

  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const user = users.find((u) => u.email === email);

  if (!user) {
    throw new Error("Invalid Email");
  }

  const cookieStore = await cookies()
  cookieStore.set("userId", String(user.id));


  redirect("/upload");
}

//logout
export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete("userId");

  redirect("/");
}
