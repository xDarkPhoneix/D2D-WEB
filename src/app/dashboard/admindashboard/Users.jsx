"use client"
import { useState } from "react";
import { Search, Eye, Lock, Unlock } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Modal from "./components/Modal";
import { mockUsers } from "./mockdata.js";

export default function Users() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "active" ? "blocked" : "active",
            }
          : u
      )
    );
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
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
            Total users: {users.length}
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

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
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="font-semibold">{user.name}</span>
                </div>
              </TableCell>

              <TableCell>{user.email}</TableCell>

              <TableCell>
                <Badge variant="info">{user.role}</Badge>
              </TableCell>

              <TableCell>
                <Badge
                  variant={
                    user.status === "active" ? "success" : "danger"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>

              <TableCell>{user.joinedDate}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProfile(user)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>

                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      user.status === "active"
                        ? "hover:bg-red-100"
                        : "hover:bg-green-100"
                    }`}
                    title={
                      user.status === "active"
                        ? "Block User"
                        : "Unblock User"
                    }
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
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
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
                <h3 className="text-2xl font-bold text-gray-900">
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
                <p className="text-gray-900 mt-1">
                  {selectedUser.role}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Status
                </label>
                <div className="mt-1">
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
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Joined Date
                </label>
                <p className="text-gray-900 mt-1">
                  {selectedUser.joinedDate}
                </p>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  User ID
                </label>
                <p className="text-gray-900 mt-1">
                  {selectedUser.id}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
