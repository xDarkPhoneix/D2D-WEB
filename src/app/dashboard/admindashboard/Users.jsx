"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Lock, Unlock } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Modal from "./components/Modal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      console.log(data);
      
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- TOGGLE USER STATUS ---------------- */
  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}/status`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to update status");

      const updatedUser = await res.json();

      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updatedUser : u))
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  /* ---------------- FILTER USERS ---------------- */
  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Users Management
          </h1>
          <p className="text-gray-600">
            Total users: {users?.length}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-8 text-gray-500">Loading users...</p>
        ) : (
          <>
            <Table
              headers={[
                "Name",
                "Email",
                "Role",
                "Status",
                "Joined Date",
                "Actions",
              ]}
            >
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-sm">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                      <span className="font-semibold">{user?.name}</span>
                    </div>
                  </TableCell>

                  <TableCell>{user?.email}</TableCell>

                  <TableCell>
                    <Badge variant="info">{user?.role}</Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={user?.status === "active" ? "success" : "danger"}
                    >
                      {"active"}
                    </Badge>
                  </TableCell>

                  <TableCell>{user?.joinedDate}</TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewProfile(user)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`p-1.5 rounded-lg ${
                          user.status === "active"
                            ? "hover:bg-red-100"
                            : "hover:bg-green-100"
                        }`}
                      >
                        {user.status === "active" ? (
                          <Lock className="w-4 h-4 text-red-600" />
                        ) : (
                          <Unlock className="w-4 h-4 text-green-600" />
                        )}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </Table>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No users found
              </div>
            )}
          </>
        )}
      </Card>

      {/* User Profile Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="User Profile"
        size="md"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-3xl">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-600">
                  {selectedUser.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Role
                </label>
                <p>{selectedUser.role}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Status
                </label>
                <Badge
                  variant={
                    selectedUser.status === "active"
                      ? "success"
                      : "danger"
                  }
                >
                  {selectedUser.status}
                </Badge>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Joined Date
                </label>
                <p>{selectedUser.joinedDate}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  User ID
                </label>
                <p>{selectedUser.id}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
