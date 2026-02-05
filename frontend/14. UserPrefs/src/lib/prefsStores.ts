import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "prefs.json"
);

export function getPrefs() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}
