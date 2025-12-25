import fs from 'fs'
import path from "path"
import {updatedTask}  from "../../../../../actions/tasks"

export default async function editTaskPage({params}){
    const {id} = await params

    const filePath = path.join(process.cwd(), "src/data/tasks.json");
    const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
    
    const task = tasks.find((t) => t.id === Number(id))

    async function update(formdata){
        "use server"
        const title = formdata.get("title")
        await updatedTask(task.id, title)
    }

    return (
        <form action={update}>
            <input type="text" name="title" defaultValue={task.title } /> <br /> <br />
            <button> Update </button>
        </form>
    )
}