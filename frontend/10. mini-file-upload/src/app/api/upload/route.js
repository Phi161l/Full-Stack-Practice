import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "src/public/uploads");
  const filePath = path.join(uploadDir, file.name);

  fs.writeFileSync(filePath, buffer);

  return new Response("File uploaded successfully", { status: 200 });
}
