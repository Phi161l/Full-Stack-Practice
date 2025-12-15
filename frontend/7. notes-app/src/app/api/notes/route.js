import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


const filePath = path.join(process.cwd(), "src/data/notes.json");

// GET all notes
export async function GET() {
  const data = await fs.readFileSync(filePath, "utf-8");

  const notes = JSON.parse(data);
  return NextResponse.json(notes);

}

// POST for new note
export async function POST(req) {
  const body = await req.json();

  const data = await fs.readFileSync(filePath, "utf-8");
  const notes = JSON.parse(data);

  const newNote = {
    id: Date.now(),
    title: body.title,
    content: body.content
  }

  notes.push(newNote);

  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

  return NextResponse.json(newNote, {status: 201});

}

