import Link from "next/link";
import fs from "fs";
import path from "path";

const postsFilePath = path.join(process.cwd(), "data", "posts.json");

function getPosts() {
  const jsonData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(jsonData);
}

export default function HomePage() {
  const posts = getPosts();

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/post/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
