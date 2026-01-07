"use client"
import { useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import { mockUserApplications } from "./mockdata.js";

export default function MyApplications() {
    const [applications, setApplications] = useState(mockUserApplications);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredApplications = applications.filter(
        (app) =>
            app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.department.toLowerCase().includes(searchTerm.toLowerCase())
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
                    My Applications
                </h1>
                <p className="text-gray-600">
                    Track all your job applications
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
                            placeholder="Search by job title or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>

                {/* Applications Table */}
                <Table
                    headers={[
                        "Job Title",
                        "Department",
                        "Location",
                        "Status",
                        "Applied Date",
                    ]}
                >
                    {filteredApplications.map((app) => (
                        <TableRow key={app.id}>
                            <TableCell>
                                <span className="font-semibold">{app.jobTitle}</span>
                            </TableCell>
                            <TableCell>{app.department}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    {app.location}
                                </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(app.status)}</TableCell>
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
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-white" />
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
                            <span className="text-white text-xl font-bold">✓</span>
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
                            <span className="text-black text-xl font-bold">⏱</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Applications */}
            <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Recent Applications
                </h3>
                <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                        <div
                            key={app.id}
                            className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {app.jobTitle}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    {app.department} • {app.location}
                                </p>
                            </div>
                            <div className="text-right">
                                {getStatusBadge(app.status)}
                                <p className="text-xs text-gray-500 mt-1">
                                    {app.appliedDate}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
