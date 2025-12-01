import { promises as fs } from "fs";
import path from "path";

// Path to the users.json file
const filePath = path.join(process.cwd(), "data", "users.json");

// GET → return all users
export async function GET() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    return Response.json(users);
  } catch (err) {
    return Response.json({ error: "Failed to read users" }, { status: 500 });
  }
}

// POST → add new user
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, Phone, canTeach, wantToLearn } = body;

    // Basic validation
    if (!name || !Phone || !canTeach || !wantToLearn) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // Read existing data
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    // Add new user
    users.push({
      name,
      Phone,
      canTeach,
      wantToLearn,
    });

    // Save updated JSON
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return Response.json({ message: "User added successfully" });
  } catch (err) {
    return Response.json({ error: "Failed to add user" }, { status: 500 });
  }
}
