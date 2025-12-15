import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/notes.json");

// UPDATE note
export async function PUT(request, { params }) {
  const { id: strid } = await params;  
  const id = Number(strid);    

  const body = await request.json();

  const data = fs.readFileSync(filePath, "utf-8");
  const notes = JSON.parse(data);

  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  notes[index].title = body.title;
  notes[index].content = body.content;

  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));

  return NextResponse.json(notes[index]);
}


// DELETE note
export async function DELETE(request, { params }) {
  console.log("jv")
  const { id: strid } = await params;  
  const id = Number(strid);    

  console.log(id)

  
  const data = fs.readFileSync(filePath, "utf-8");
  let notes = JSON.parse(data);

  const filtered = notes.filter((n) => n.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));

  return NextResponse.json({ message: "Deleted successfully" });
}
