import fs from "fs";
import path from "path";

const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return new Response("Only image files are allowed", { status: 400 });
  }

  // Validate size
  if (file.size > MAX_SIZE) {
    return new Response("File size exceeds 2MB limit", { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "public/uploads");

  const uniqueName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, uniqueName);

  fs.writeFileSync(filePath, buffer);

  return new Response(
    JSON.stringify({ filename: uniqueName }),
    { status: 200 }
  );
}
