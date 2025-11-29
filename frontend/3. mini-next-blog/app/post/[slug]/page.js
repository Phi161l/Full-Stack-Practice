import styles from "./post.module.css";

export default async function Page({ params }) {
  const res = await fetch("http://localhost:3000/api/posts");
  const posts = await res.json();

  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <h2 className={styles.notFound}>Post not found</h2>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.content}>{post.content}</p>
    </div>
  );
}
