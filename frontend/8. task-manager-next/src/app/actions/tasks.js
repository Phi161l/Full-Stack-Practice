"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



const filePath = path.join(process.cwd(), "src/data/tasks.json");

function readTasks() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

// ADD tasks
export async function addTask(formData) {
  const title = formData.get("title");
  const tasks = readTasks();

  tasks.push({
    id: Date.now(),
    title,
    completed: false,
  });

  writeTasks(tasks);
  revalidatePath("/");
  redirect("/")
}

// UPDATE (title or completed)
export async function updateTask(id, data) {
  const tasks = readTasks();

  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...data };
    writeTasks(tasks);
  }

  revalidatePath("/");
  redirect("/")
}

// DELETE
export async function deleteTask(id) {
  const tasks = readTasks().filter((t) => t.id !== id);
  writeTasks(tasks);
  revalidatePath("/");
}
