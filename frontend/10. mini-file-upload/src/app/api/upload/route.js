import cloudinary from "../../../lib/cloudinary.js";

const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response("No file uploaded", { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return new Response("Invalid file type", { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return new Response("File too large", { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    ).end(buffer);
  });

  return Response.json({
    url: result.secure_url,
  });
}
