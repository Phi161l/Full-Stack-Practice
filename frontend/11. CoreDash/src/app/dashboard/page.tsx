import { currSession } from "@/lib/auth";
import { getUsers } from "@/lib/fileStore";

export default async function DashboardPage() {
  const loggedUser = await currSession();
  if (!loggedUser)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      </div>
    );

  const users = getUsers();

  const total = users.length;
  const admins = users.filter((u) => u.role === "admin").length;
  const normalUsers = users.filter((u) => u.role === "user").length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Welcome, <span className="font-medium">{loggedUser.email}</span>
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition">
          <h3 className="text-gray-500 text-sm mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{total}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition">
          <h3 className="text-gray-500 text-sm mb-2">Admins</h3>
          <p className="text-3xl font-bold text-green-600">{admins}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transform transition">
          <h3 className="text-gray-500 text-sm mb-2">Normal Users</h3>
          <p className="text-3xl font-bold text-purple-600">{normalUsers}</p>
        </div>
      </div>
    </div>
  );
}
