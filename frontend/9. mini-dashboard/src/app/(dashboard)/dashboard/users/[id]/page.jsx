import fs from "fs";
import path from "path";

export default async function UserDetailPage({ params }) {
  const { id } = await params;

  const filePath = path.join(process.cwd(), "src/data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return <h2>User not found</h2>;
  }

  return (
    <div>
      <h2>User Details</h2>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}







