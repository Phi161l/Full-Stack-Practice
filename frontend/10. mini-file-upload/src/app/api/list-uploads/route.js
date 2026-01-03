import fs from "fs";
import path from "path"

export async function GET() {
    const uploadDir = path.join(process.cwd(), "public/uploads")
     
    if (!fs.existsSync(uploadDir)) return new Response(JSON.stringify({ files: [] }));

    const files = fs.readdirSync(uploadDir)
    const response = new Response(JSON.stringify({files}), {status: 200})
    return response
}