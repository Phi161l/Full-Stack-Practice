import rawUsers from "@/data/users.json";
import { User } from "@/types/user";

const users: User[] = rawUsers as User[];

export function getUsers(): User[] {
  return users;
}
