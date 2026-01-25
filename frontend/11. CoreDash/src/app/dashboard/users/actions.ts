"use server";

import { getUsers, saveUsers } from "@/lib/fileStore";
import { logAction } from "@/lib/logger";
import { Role } from "@/types/user";

export async function deleteUser(id: string, adminEmail: string) {
  const users = getUsers().filter((u) => u.id !== id);

  saveUsers(users);

  logAction(`Deleted user ${id}`, adminEmail);
}

export async function changeRole(id: string, role: Role, adminEmail: string) {
  const users = getUsers().map((u) => (u.id === id ? { ...u, role } : u));

  saveUsers(users);

  logAction(`changed role of user ${id} to ${role}`, adminEmail)
}


