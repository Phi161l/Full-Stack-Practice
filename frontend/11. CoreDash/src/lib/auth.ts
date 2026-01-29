import { cookies } from "next/headers";
import rawUsers from "@/data/users.json";
import { User } from "@/types/user";

const SESSION_KEY = "coredash_session";
const users: User[] = rawUsers as User[];

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export async function createSession(userId: string) {
  (await cookies()).set(SESSION_KEY, userId, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 
  });

  return true;
}

export async function getSessionUser(): Promise<User | null> {
  const userId = (await cookies()).get(SESSION_KEY)?.value;
  if (!userId) return null;

  const user = users.find((u) => u.id === userId) ?? null;
  return user;
}

export async function destroySession() {
  (await cookies()).delete(SESSION_KEY);
}

export async function currSession() {
  const user = await getSessionUser();

  return user;
}
