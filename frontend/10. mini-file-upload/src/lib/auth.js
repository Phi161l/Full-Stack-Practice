import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

export async function getAuthUser() {
  const cookieStore = await cookies();
  // console.log(cookieStore)
  const userId = cookieStore.get("userId")?.value;
  // console.log(userId)

  if (!userId) return null; 

  const filePath = path.join(process.cwd(), "src/data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = users.find((u) => String(u.id) === userId);

  return user || null;
}
