import rawUsers from "@/data/users.json";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export const users: User[] = rawUsers as User[];
const SESSION_KEY = "coredash_session";

const mock = {
    "id": "2",
    "email": 98,
    "role": "user"
  }


export function getUserByEmail(email: Number): User | undefined {
  console.log(typeof(email))
  return mock
}


export async function createSession(userId: string) {
  (await cookies()).set(SESSION_KEY, userId, {
    httpOnly: true,
    path: "/",
  });
}


export async function getSessionUser(): Promise<User | null> {
  const userId = (await cookies()).get(SESSION_KEY)?.value;
  if (!userId) return null;

  return users.find((u) => u.id === userId) ?? null;

}


export async function destroySession() {
  (await cookies()).delete(SESSION_KEY);
}




