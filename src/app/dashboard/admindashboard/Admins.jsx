"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch pending admin requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/auth/pendingadmins");
      setRequests(res.data.pendingAdmins || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load admin requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔹 Accept / Reject admin request
  const updateStatus = async (adminId, isVerified) => {
    try {
      await axios.post(`/api/auth/adminverification`, {
        isVerified,
        adminId
      });

      // 🔁 Optimistic UI update
      setRequests((prev) =>
        prev.map((req) =>
          req.adminId === adminId ? { ...req, isVerified } : req
        )
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to update status"
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading admin requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Requests</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-b">
                <td className="p-4 font-medium">{req.name}</td>
                <td className="p-4 text-gray-600">{req.email}</td>
                <td className="p-4">{req.role}</td>

                {/* ✅ STATUS */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      req.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {req.isVerified ? "Approved" : "Pending"}
                  </span>
                </td>

                {/* ✅ ACTIONS */}
                <td className="p-4 space-x-2">
                  {!req.isVerified && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(req._id, true)
                        }
                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(req._id, false)
                        }
                        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <p className="p-6 text-center text-gray-500">
            No admin requests found
          </p>
        )}
      </div>
    </div>
  );
}

export default Admin;
