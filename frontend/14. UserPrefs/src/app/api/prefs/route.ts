import { NextResponse } from "next/server";
import { getPrefs, savePrefs } from "@/src/lib/prefsStores";
import { z } from "zod";

const PrefsSchema = z.object({
  theme: z.enum(["light", "dark"]),
  notification: z.boolean(),
  language: z.enum(["en", "am", "ar"]),
});

export async function GET(req: Request) {
  const prefs = getPrefs();
  return NextResponse.json(prefs);
}

export async function POST(req: Request) {
  const updates = await req.json();
  
  // vailidate input
  const parsed = PrefsSchema.partial().parse(updates);

  
  const prefs = getPrefs();

  const newPrefs = {
    ...prefs,
    ...updates,
  };

  savePrefs(newPrefs);

  return NextResponse.json(newPrefs);
}
