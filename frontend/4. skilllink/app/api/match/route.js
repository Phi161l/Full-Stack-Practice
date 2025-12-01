import { promises as fs } from "fs";
import path from "path";
import { buildGraph, bfsMatches } from "../../utils/matching.js";

// Path to users.json
const filePath = path.join(process.cwd(), "data", "users.json");

export async function POST(request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    // Read all users
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    // Check if user exists
    const userExists = users.some(u => u.name === name);
    if (!userExists) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Build graph and find matches
    const graph = buildGraph(users);
    const matches = bfsMatches(name, graph);

    return Response.json({ matches });
  } catch (err) {
    return Response.json({ error: "Failed to find matches" }, { status: 500 });
  }
}
