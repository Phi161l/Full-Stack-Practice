"use server"

import fs from "fs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import path from "path"

const filePath = path.join(process.cwd(), "src/data/tasks.json")

function readTasks() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"))
}

function writeTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
}


export async function addTask(formdata) {
    const tasks = readTasks()

    const title = formdata.get("title")

    const newtask = {
        id: Date.now(),
        title: title,
        completed: false,
    }

    tasks.push(newtask)

    writeTasks(tasks)
}




export async function deleteTask(formdata) {
    const tasks = readTasks()
    const id = Number(formdata.get("id"))

    const updated = tasks.filter((t) => t.id !== id)

    writeTasks(updated)

    revalidatePath("/dashboard/tasks")
}




export async function updatedTask(id, title) {
    const tasks = readTasks()
    const index = tasks.findIndex((t) => t.id === id )

    if (index === -1) return null

    tasks[index] = {
        ...tasks[index],
        title: title
    }

    writeTasks(tasks)

    revalidatePath("/dashboard/tasks")
}