import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/data/tasks.json");

// GET all tasks
export async function GET() {
  const data = fs.readFileSync(filePath, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

// POST new task
export async function POST(request) {
  const body = await request.json();
  const data = fs.readFileSync(filePath, "utf-8");
  const tasks = JSON.parse(data);

  const newTask = {
    id: Date.now(),
    title: body.title,
    completed: false
  };


  tasks.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

  return NextResponse.json(newTask, { status: 201 });
}
