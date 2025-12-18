import fs from "fs";
import path from "path";
import {updateTask} from "../../actions/tasks"


const filePath = path.join(process.cwd(), "src/data/tasks.json");

export default async function EditTaskPage({ params }) {
  const {id} = await params
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const task = tasks.find((t) => t.id === Number(id));

  return (
    <form
      action={async (formData) => {
        "use server";
        await updateTask(task.id, {
          title: formData.get("title"),
        });
      }}
    >
      <input name="title" defaultValue={task.title} />
      <button>Update</button>
    </form>
  );
}



