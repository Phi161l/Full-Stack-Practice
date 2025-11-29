import { posts } from "@/data/posts";

export async function GET() {
  return new Response(JSON.stringify(posts), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();
  const slug = body.title.toLowerCase().replace(/\s+/g, "-");

  posts.push({
    slug,
    title: body.title,
    content: body.content,
  });

  return new Response(JSON.stringify({ success: true, slug }), {
    headers: { "Content-Type": "application/json" },
  });
}



