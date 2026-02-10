import fs from "fs";
import path from "path";
import { z } from "zod";

const PrefsSchema = z.object({
  theme: z.enum(["light", "dark"]),
  notification: z.boolean(),
  language: z.enum(["en", "am", "ar"]),
});

const filePath = path.join(process.cwd(), "src/data/prefs.json");

export function getPrefs() {
  const data = fs.readFileSync(filePath, "utf-8");
  const parsed = JSON.parse(data);

  const result = PrefsSchema.safeParse(parsed);
  if (!result.success) {
    console.error("Invalid prefs.json, using defaults");
    return { theme: "light", notification: true, language: "en" };
  }

  return result.data;
}

export function savePrefs(newPrefs: any) {
  fs.writeFileSync(filePath, JSON.stringify(newPrefs, null, 2));
}
