import rawUsers from "@/data/users.json";
import { User } from "@/types/user";
import fs from "fs";
import path from "path";

const users: User[] = rawUsers as User[];

const filePath = path.join(process.cwd(), "src/data/users.json");



export function getUsers(): User[] {
  return users;
}

export function saveUsers(newusers: User[]){
  fs.writeFileSync(filePath, JSON.stringify(newusers, null, 2));
}