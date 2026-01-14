import fs from "fs";
import path from "path";
import { getAuthUser } from "../../../lib/auth";

export async function GET() {
  user = getAuthUser();
  if (!user) {
    return Response({ error: "Authorized" }, { status: 401 });
  }
  
  const dataPath = path.join(process.cwd(), "src/data/uploads.json");
  const uploads = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  return Response.json({ files: uploads });
}
