import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/data/tasks.json");

// UPDATE task
export async function PUT(request, { params }) {
  const {id} = await params;
  const body = await request.json();

  const data = fs.readFileSync(filePath, "utf-8");
  const tasks = JSON.parse(data);

  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  tasks[index].title = body.title;
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

  return NextResponse.json(tasks[index]);
}


// DELETE task
export async function DELETE(_, { params }) {
  const { id } = await params; 

  const data = fs.readFileSync(filePath, "utf-8");
  const tasks = JSON.parse(data).filter(task => task.id !== Number(id));

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

  return NextResponse.json({ success: true });
}
