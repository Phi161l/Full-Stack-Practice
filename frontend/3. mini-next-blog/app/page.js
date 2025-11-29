import Link from "next/link";
import fs from "fs";
import path from "path";
import styles from "./home.module.css";

const postsFilePath = path.join(process.cwd(), "data", "posts.json");

function getPosts() {
  const jsonData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(jsonData);
}

export default function HomePage() {
  const posts = getPosts();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Posts</h2>
      <ul className={styles.postList}>
        {posts.map((p) => (
          <li key={p.slug} className={styles.postItem}>
            <Link href={`/post/${p.slug}`} className={styles.postLink}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
