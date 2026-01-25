"use server";

import { getUsers, saveUsers } from "@/lib/fileStore";
import { Role } from "@/types/user";

export async function deleteUser(id: string) {
  const users = getUsers().filter((u) => u.id !== id);

  saveUsers(users);
}

export async function changeRole(id: string, role: Role) {
  const users = getUsers().map((u) => (u.id === id ? { ...u, role } : u));

  saveUsers(users);
}
