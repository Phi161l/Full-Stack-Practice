import fs from "fs";
import path from "path";

export async function GET() {
  const dataPath = path.join(process.cwd(), "src/data/uploads.json");
  const uploads = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  return Response.json({ files: uploads });
}
