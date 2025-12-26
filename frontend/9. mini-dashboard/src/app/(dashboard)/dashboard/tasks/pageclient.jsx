"use client";

import { completeTask } from "../../../actions/tasks";

export default function TaskCheckbox({ task }) {

  async function toggleTask() {
    await completeTask(task.id, !task.completed);
  }

  return (
    <input
      type="checkbox"
      checked={task.completed}  
      onChange={toggleTask}   
    />
  );
}
