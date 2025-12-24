import fs from "fs";
import path from "path";
import {deleteUser}  from "../../../actions/users"
import Link from "next/link";

export default function UsersPage() {
  const filePath = path.join(process.cwd(), "src/data/users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <div>
      <h2>Users</h2>

      <table cellPadding="8">
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
              <td style={{display: "flex"} }>
                <Link href={`/dashboard/users/${user.id}`}> View </Link> 
                <form action={deleteUser} style={{marginLeft: 5}}>
                    <input type="hidden" name="id" value={user.id} />
                    <button> Delete </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
