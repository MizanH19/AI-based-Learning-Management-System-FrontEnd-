import Navbar from "../../components/common/Navbar";
import { getAllUsers,disableUser,enableUser } from "../../api/admin.api";
import { useEffect,useState } from "react";

const AdminUsers = () => {
  const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadUsersData = async () => {
        try {
          const users = await getAllUsers()
          setUser(users)

  
        } catch (err) {
          console.error("Failed to load admin dashboard data", err);
        } finally {
          setLoading(false);
        }
      };
  
      loadUsersData();
    }, []);

    const handleToggleStatus = async (userId, isActive) => {
      try {
        console.log(userId);
        
        if (isActive) {
          const res=await disableUser(userId);
          console.log(res);
          
        } else {
          await enableUser(userId);
        }

        // update UI locally (NO refetch)
        setUser((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, isActive: !isActive } : u
          )
        );
      } catch (err) {
        alert("Failed to update user status");
      }
    };


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
                    <button
                      onClick={() => handleToggleStatus(user._id, user.isActive)}
                      className={`px-3 py-1 rounded text-xs font-medium transition
                        ${
                          user.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                    >
                      {user.isActive ? "Active" : "Disabled"}
                    </button>

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

                <button
                  onClick={() => handleToggleStatus(user._id, user.isActive)}
                  className={`mt-3 px-3 py-1 rounded text-xs font-medium
                    ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {user.isActive ? "Disable User" : "Enable User"}
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminUsers;
