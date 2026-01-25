import { ActivityLog } from "@/types/activity";
import { randomUUID } from "crypto";
import { appendLog } from "./fileStore";

export function logAction(action: string, performedBy: string) {
  const log: ActivityLog = {
    id: randomUUID(),
    action,
    performedBy,
    timestamp: new Date().toISOString(),
  };

  appendLog(log);
}
