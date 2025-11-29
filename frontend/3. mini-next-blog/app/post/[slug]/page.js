export default async function Page({ params }) {
  const res = await fetch('http://localhost:3000/api/posts');
  const posts = await res.json();

  const {slug} = await params
  const post = posts.find(p => p.slug === slug);

  if (!post) return <h2>Post not found</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}
