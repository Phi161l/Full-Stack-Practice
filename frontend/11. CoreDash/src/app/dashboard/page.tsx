import { currSession } from "@/lib/auth";
import {getUsers} from "@/lib/fileStore";

export default async function DashboardPage() {
  const loggedUser = await currSession();
  const users = getUsers()

  const total = users.length;
  const admins = users.filter( (u)=> u.role === "admin").length;
  const normalUsers = users.filter( (u)=> u.role === "user").length

  return (
    <>
      <h1 style={{marginBottom: 35}}> DashboardPage </h1> 
      {/* <h2 style={{marginBottom: 35}} > Welcome {loggedUser.email}</h2> */}
      
      <div>
        <p>Total Users: {total}</p>
        <p>Admins: {admins}</p>
        <p>Normal Users: {normalUsers}</p>
      </div>
    </>
  );
}
