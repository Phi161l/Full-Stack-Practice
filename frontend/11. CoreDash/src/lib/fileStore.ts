import rawUsers from "@/data/users.json";
import { ActivityLog } from "@/types/activity";
import { User } from "@/types/user";
import logs from "@/data/activityLogs.json";
import fs from "fs";
import path from "path";

const users: User[] = rawUsers as User[];

const filePath = path.join(process.cwd(), "src/data/users.json");
const logsPath =  path.join(process.cwd(), "src/data/activityLogs.json");


export function getUsers(): User[] {
  return users;
}
 
export function saveUsers(newusers: User[]){
  fs.writeFileSync(filePath, JSON.stringify(newusers, null, 2));
}


export function getLogs(): ActivityLog[]{
  return logs;
}


export function appendLog(log: ActivityLog){
  const updated = [...logs, log]
  fs.writeFileSync(logsPath, JSON.stringify(updated, null, 2));
}

