import fs from "fs";
import path from "path";

export default function UsersPage() {
  const filePath = path.join(process.cwd(), "src/data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <div>
      <h2>Users</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button>View</button>{" "}
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
