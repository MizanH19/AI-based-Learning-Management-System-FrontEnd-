import Navbar from "../../components/common/Navbar";

const AdminUsers = () => {
  // Mock users (later from backend)
  const users = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      role: "student",
      status: "active"
    },
    {
      id: 2,
      name: "Anjali Verma",
      email: "anjali@gmail.com",
      role: "student",
      status: "blocked"
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@corelearn.com",
      role: "admin",
      status: "active"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">
          User Management
        </h1>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block bg-white rounded border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Role</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded border"
            >
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>

              <div className="flex justify-between mt-3 text-sm">
                <span className="capitalize">
                  Role: {user.role}
                </span>

                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminUsers;
