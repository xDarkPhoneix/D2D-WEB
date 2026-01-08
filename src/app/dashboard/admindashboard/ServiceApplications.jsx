"use client"
import { useState, useEffect } from "react";
import { Search, Eye, Check, X } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Modal from "./components/Modal";
import Button from "./components/Button";
import axios from "axios";

export default function ServiceApplications() {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        // Filter applications based on search and status
        const filtered = applications.filter((app) => {
            const matchesSearch =
                app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.serviceId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilter =
                filterStatus === "all" || app.status === filterStatus;

            return matchesSearch && matchesFilter;
        });
        setFilteredApplications(filtered);
    }, [searchTerm, filterStatus, applications]);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/admin/service-applications");
            if (response.data.success) {
                setApplications(response.data.applications);
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };

    const handleStatusUpdate = async (applicationId, newStatus, adminNotes = "") => {
        try {
            setUpdateLoading(true);
            // TODO: Get actual admin ID from session
            const adminId = "temp_admin_id";

            const response = await axios.patch(
                `/api/admin/service-applications/${applicationId}`,
                {
                    status: newStatus,
                    adminNotes,
                    reviewedBy: adminId,
                }
            );

            if (response.data.success) {
                // Update local state
                setApplications((prev) =>
                    prev.map((app) =>
                        app._id === applicationId
                            ? { ...app, status: newStatus, adminNotes, reviewedAt: new Date() }
                            : app
                    )
                );
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error updating application:", error);
            alert("Failed to update application status");
        } finally {
            setUpdateLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "accepted":
                return <Badge variant="success">Accepted</Badge>;
            case "rejected":
                return <Badge variant="danger">Rejected</Badge>;
            case "pending":
                return <Badge variant="warning">Pending</Badge>;
            default:
                return <Badge variant="default">{status}</Badge>;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Service Applications
                </h1>
                <p className="text-gray-600">
                    Manage and review all service application requests
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Total</p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {applications.length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                                {applications.length}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Pending</p>
                            <h3 className="text-3xl font-bold text-yellow-600">
                                {applications.filter((a) => a.status === "pending").length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                            <span className="text-black text-xl font-bold">
                                {applications.filter((a) => a.status === "pending").length}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Accepted</p>
                            <h3 className="text-3xl font-bold text-green-600">
                                {applications.filter((a) => a.status === "accepted").length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                                {applications.filter((a) => a.status === "accepted").length}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">Rejected</p>
                            <h3 className="text-3xl font-bold text-red-600">
                                {applications.filter((a) => a.status === "rejected").length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                                {applications.filter((a) => a.status === "rejected").length}
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters + Table */}
            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, service, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Loading applications...</p>
                    </div>
                ) : (
                    <>
                        <Table
                            headers={[
                                "Applicant",
                                "Service",
                                "Company",
                                "Status",
                                "Applied Date",
                                "Actions",
                            ]}
                        >
                            {filteredApplications.map((app) => (
                                <TableRow key={app._id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-semibold">{app.fullName}</div>
                                            <div className="text-sm text-gray-500">{app.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-medium">
                                            {app.serviceId?.title || "N/A"}
                                        </span>
                                    </TableCell>
                                    <TableCell>{app.companyName || "Individual"}</TableCell>
                                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                                    <TableCell>{formatDate(app.createdAt)}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewDetails(app)}
                                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4 text-gray-600" />
                                            </button>
                                            {app.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app._id, "accepted")}
                                                        className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                                                        title="Accept"
                                                    >
                                                        <Check className="w-4 h-4 text-green-600" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                                                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X className="w-4 h-4 text-red-600" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>

                        {filteredApplications.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No applications found</p>
                            </div>
                        )}
                    </>
                )}
            </Card>

            {/* Details Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Application Details"
                size="lg"
            >
                {selectedApplication && (
                    <div className="space-y-4">
                        {/* Service and Status */}
                        <div className="grid grid-cols-2 gap-4 pb-4 border-b">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Service Name
                                </label>
                                <p className="text-gray-900 mt-1 text-lg font-medium">
                                    {selectedApplication.serviceId?.title || "N/A"}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Status
                                </label>
                                <div className="mt-1">
                                    {getStatusBadge(selectedApplication.status)}
                                </div>
                            </div>
                        </div>

                        {/* Applicant Information */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Applicant Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">
                                        Full Name
                                    </label>
                                    <p className="text-gray-900 mt-1">
                                        {selectedApplication.fullName}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">
                                        Email
                                    </label>
                                    <p className="text-gray-900 mt-1">
                                        {selectedApplication.email}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">
                                        Phone
                                    </label>
                                    <p className="text-gray-900 mt-1">
                                        {selectedApplication.phone}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">
                                        Company
                                    </label>
                                    <p className="text-gray-900 mt-1">
                                        {selectedApplication.companyName || "Individual"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Project Details */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-3">Project Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">
                                        Project Description
                                    </label>
                                    <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">
                                        {selectedApplication.projectDescription}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">
                                            Budget Range
                                        </label>
                                        <p className="text-gray-900 mt-1">
                                            {selectedApplication.budgetRange || "Not specified"}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">
                                            Preferred Start Date
                                        </label>
                                        <p className="text-gray-900 mt-1">
                                            {formatDate(selectedApplication.preferredStartDate)}
                                        </p>
                                    </div>
                                </div>
                                {selectedApplication.additionalNotes && (
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700">
                                            Additional Notes
                                        </label>
                                        <p className="text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg">
                                            {selectedApplication.additionalNotes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Applied On
                                </label>
                                <p className="text-gray-900 mt-1">
                                    {formatDate(selectedApplication.createdAt)}
                                </p>
                            </div>
                            {selectedApplication.reviewedAt && (
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">
                                        Reviewed On
                                    </label>
                                    <p className="text-gray-900 mt-1">
                                        {formatDate(selectedApplication.reviewedAt)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Admin Notes */}
                        {selectedApplication.adminNotes && (
                            <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <label className="text-sm font-semibold text-gray-700">
                                    Admin Notes
                                </label>
                                <p className="text-gray-900 mt-1">
                                    {selectedApplication.adminNotes}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        {selectedApplication.status === "pending" && (
                            <div className="flex gap-3 pt-4">
                                <Button
                                    onClick={() => handleStatusUpdate(selectedApplication._id, "accepted", "Application approved")}
                                    disabled={updateLoading}
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
                                >
                                    {updateLoading ? "Updating..." : "Accept Application"}
                                </Button>
                                <Button
                                    onClick={() => handleStatusUpdate(selectedApplication._id, "rejected", "Application rejected")}
                                    disabled={updateLoading}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
                                >
                                    {updateLoading ? "Updating..." : "Reject Application"}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
}
