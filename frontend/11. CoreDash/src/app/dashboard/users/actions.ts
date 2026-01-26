"use server";

import { currSession } from "@/lib/auth";
import { getUsers, saveUsers } from "@/lib/fileStore";
import { logAction } from "@/lib/logger";
import { Role } from "@/types/user";

export async function deleteUser(id: string) {
  const loggedAdmin = await currSession();
  const adminEmail = loggedAdmin.email;
  const users = getUsers().filter((u) => u.id !== id);

  saveUsers(users);

  logAction(`Deleted user ${id}`, adminEmail);
}

export async function changeRole(id: string, role: Role) {
  const loggedAdmin = await currSession();
  const adminEmail = loggedAdmin.email;
  const users = getUsers().map((u) => (u.id === id ? { ...u, role } : u));

  saveUsers(users);

  logAction(`changed role of user ${id} to ${role}`, adminEmail);
}
