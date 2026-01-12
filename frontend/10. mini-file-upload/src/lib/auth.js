import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export function getAuthUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) return null;

  const filePath = path.join(process.cwd(), "src/data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = users.find((u) => String(u.id) === userId);

  return user || null;
}
