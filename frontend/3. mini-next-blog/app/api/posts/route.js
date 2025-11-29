import fs from "fs";
import path from "path";

const postsFilePath = path.join(process.cwd(), "data", "posts.json");

function getPosts() {
  const jsonData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(jsonData);
}

function savePost(newPost) {
  const posts = getPosts();
  posts.push(newPost);
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}



// get endpoint
export async function GET() {
  const posts = getPosts(); // read posts from JSON
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}

//post endpoint
export async function POST(request) {
  const body = await request.json();
  const slug = body.title.toLowerCase().replace(/\s+/g, "-");

  const newPost = {
    slug,
    title: body.title,
    content: body.content,
  };

  savePost(newPost); // append new post to JSON

  return new Response(JSON.stringify({ success: true, slug }), {
    headers: { "Content-Type": "application/json" },
  });
}
