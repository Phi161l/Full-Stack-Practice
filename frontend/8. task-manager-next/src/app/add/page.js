import { addTask } from "../actions/tasks";

export default function AddTaskPage() {
  return (
    <form action={addTask}>
      <input type="text" name="title" placeholder="Task title" required />
      <button> Add Task </button>
    </form>
  );
}

