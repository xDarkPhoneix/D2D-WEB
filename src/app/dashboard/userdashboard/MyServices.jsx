"use client"
import { useState, useEffect } from "react";
import { Search, Eye, Calendar, Building } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Modal from "./components/Modal";
import axios from "axios";

// Mock service applications for testing without database
const mockApplications = [
    {
        _id: "1",
        serviceId: {
            title: "Logo Design Package",
            category: "Branding & Design",
        },
        fullName: "Priya Patel",
        email: "priya.patel@example.com",
        phone: "+91 98765 43210",
        companyName: "Patel Designs Studio",
        projectDescription: "Need a professional logo for our new startup venture in the hospitality industry.",
        budgetRange: "₹15,000 - ₹25,000",
        preferredStartDate: "2026-02-01",
        additionalNotes: "Looking for a modern, minimal design",
        status: "pending",
        createdAt: "2026-01-07T10:30:00.000Z",
    },
    {
        _id: "2",
        serviceId: {
            title: "Social Media Management",
            category: "Social Media",
        },
        fullName: "Rajesh Kumar",
        email: "rajesh.kumar@example.com",
        phone: "+91 87654 32109",
        companyName: "Kumar Enterprises",
        projectDescription: "Monthly management for Instagram and Facebook pages with consistent posting schedule.",
        budgetRange: "₹20,000/month",
        preferredStartDate: "2026-01-15",
        status: "accepted",
        adminNotes: "Great project! Looking forward to working together.",
        createdAt: "2026-01-05T14:20:00.000Z",
        reviewedAt: "2026-01-06T09:15:00.000Z",
    },
    {
        _id: "3",
        serviceId: {
            title: "Email Marketing Campaign",
            category: "Digital Marketing",
        },
        fullName: "Amit Verma",
        email: "amit.verma@example.com",
        phone: "+91 76543 21098",
        companyName: "Verma Marketing Solutions",
        projectDescription: "Need help setting up automated email campaigns for our e-commerce store.",
        budgetRange: "₹12,000 - ₹30,000",
        preferredStartDate: "2026-01-20",
        status: "rejected",
        adminNotes: "Budget doesn't align with project scope currently.",
        createdAt: "2026-01-03T16:45:00.000Z",
        reviewedAt: "2026-01-04T11:30:00.000Z",
    },
];

export default function MyServices() {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            // TODO: Replace with actual userId from session
            const userId = "temp_user_id";
            const response = await axios.get(`/api/service-applications?userId=${userId}`);
            if (response.data.success) {
                setApplications(response.data.applications);
            }
        } catch (error) {
            console.error("Error fetching applications:", error);
            // Fallback to mock data if API fails
            console.log("Using mock applications data");
            setApplications(mockApplications);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };

    const filteredApplications = applications.filter((app) => {
        const matchesSearch =
            app.serviceId?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === "all" || app.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

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
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Service Applications
                </h1>
                <p className="text-gray-600">
                    Track and manage all your service requests
                </p>
            </div>

            {/* Filters + Table */}
            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by service, name, or company..."
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
                                "Service Name",
                                "Company",
                                "Status",
                                "Applied Date",
                                "Actions",
                            ]}
                        >
                            {filteredApplications.map((app) => (
                                <TableRow key={app._id}>
                                    <TableCell>
                                        <span className="font-semibold">
                                            {app.serviceId?.title || "N/A"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {app.companyName || "Individual"}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                                    <TableCell>{formatDate(app.createdAt)}</TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => handleViewDetails(app)}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4 text-gray-600" />
                                        </button>
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

            {/* Application Stats */}
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
                            <span className="text-white text-xl font-bold">
                                {applications.length}
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">
                                Accepted
                            </p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {
                                    applications.filter((a) => a.status === "accepted")
                                        .length
                                }
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                                {
                                    applications.filter((a) => a.status === "accepted")
                                        .length
                                }
                            </span>
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
                                    applications.filter((a) => a.status === "pending")
                                        .length
                                }
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                            <span className="text-black text-xl font-bold">
                                {
                                    applications.filter((a) => a.status === "pending")
                                        .length
                                }
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Details Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Application Details"
                size="lg"
            >
                {selectedApplication && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Service Name
                                </label>
                                <p className="text-gray-900 mt-1">
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
                        </div>

                        <div className="grid grid-cols-2 gap-4">
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
                                    {selectedApplication.companyName || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Project Description
                            </label>
                            <p className="text-gray-900 mt-1">
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
                                <p className="text-gray-900 mt-1">
                                    {selectedApplication.additionalNotes}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
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
                    </div>
                )}
            </Modal>
        </div>
    );
}
