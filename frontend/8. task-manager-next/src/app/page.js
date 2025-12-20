import fs from "fs";
import path from "path";
import HomePage from "./page.client.js";

const filePath = path.join(process.cwd(), "src/data/tasks.json");

export default function Page() {
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return <HomePage initialTasks={tasks} />;
}
