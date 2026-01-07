"use client"
import { useState } from "react";
import { Search, FileText, Download } from "lucide-react";
import Card from "@/app/dashboard/admindashboard/components/Card";
import Table, { TableRow, TableCell } from "@/app/dashboard/admindashboard/components/Table";
import Badge from "@/app/dashboard/admindashboard/components/Card";
import { mockApplications } from "./mockdata.js";

export default function Applications() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = (id, newStatus) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const filteredApplications = applications.filter(
    (app) =>
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "shortlisted":
        return <Badge variant="success">Shortlisted</Badge>;
      case "rejected":
        return <Badge variant="danger">Rejected</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Job Applications
        </h1>
        <p className="text-gray-600">
          Review and manage all job applications
        </p>
      </div>

      {/* Table Card */}
      <Card className="p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by applicant name, job, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Applications Table */}
        <Table
          headers={[
            "Applicant Name",
            "Email",
            "Job Applied For",
            "Experience",
            "Resume",
            "Status",
            "Applied Date",
          ]}
        >
          {filteredApplications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">
                      {app.applicantName.charAt(0)}
                    </span>
                  </div>
                  <span className="font-semibold">
                    {app.applicantName}
                  </span>
                </div>
              </TableCell>

              <TableCell>{app.email}</TableCell>
              <TableCell>{app.jobTitle}</TableCell>
              <TableCell>{app.experience}</TableCell>

              <TableCell>
                <button className="flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium">
                  <FileText className="w-4 h-4" />
                  <Download className="w-3 h-3" />
                </button>
              </TableCell>

              <TableCell>
                <select
                  value={app.status}
                  onChange={(e) =>
                    handleStatusChange(app.id, e.target.value)
                  }
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="pending">Pending</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </TableCell>

              <TableCell>{app.appliedDate}</TableCell>
            </TableRow>
          ))}
        </Table>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No applications found</p>
          </div>
        )}
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">
                Total Applications
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {applications.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">
                Shortlisted
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {
                  applications.filter(
                    (a) => a.status === "shortlisted"
                  ).length
                }
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">
                Pending Review
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {
                  applications.filter(
                    (a) => a.status === "pending"
                  ).length
                }
              </h3>
            </div>
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
