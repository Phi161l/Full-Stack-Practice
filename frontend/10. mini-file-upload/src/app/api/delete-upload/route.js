import fs from "fs";
import path from "path";
import cloudinary from "../../../lib/cloudinary";
import {getAuthUser} from "../../../lib/auth"
import { error } from "console";

const dataPath = path.join(process.cwd(), "src/data/uploads.json");

export async function POST(req) {
  user = getAuthUser();
  if (!user ){
    return Response.json({error: "Authorized "}, {status: 401})
  }
  
  const { id, url } = await req.json();

  const publicID = url.split("/").pop().split(".")[0];

  await cloudinary.uploader.destroy(`uploads/${publicID}`);

//   cloudinary.uploader.destroy("public_id", (error, result) => {
//   console.log(result);
// });


  const uploads = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const updated = uploads.filter((u) => u.id !== id);

  fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2));

  return Response.json({success: true});
}
