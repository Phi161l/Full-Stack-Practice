import { NextResponse } from "next/server";
import { getPrefs, savePrefs } from "@/src/lib/prefsStores";

export async function POST(req: Request) {
  const updates = await req.json();
  const prefs = getPrefs();

  const newPrefs = {
    ...prefs,
    ...updates,
  };

  savePrefs(newPrefs);

  return NextResponse.json(newPrefs);
}
