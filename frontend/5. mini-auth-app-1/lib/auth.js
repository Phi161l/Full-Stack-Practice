import { cookies } from "next/headers";

export function generateToken() {
  return Math.random().toString(36).substring(2);
}

export function setSession(token) {
  cookies().set("session", token, {
    httpOnly: true,
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}

