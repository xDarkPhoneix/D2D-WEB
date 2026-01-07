"use client"
import { useState } from "react";
import { Search, Eye } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Modal from "./components/Modal";
import { mockUserServices } from "./mockdata.js";

export default function MyServices() {
    const [services, setServices] = useState(mockUserServices);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleViewDetails = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const filteredServices = services.filter((service) => {
        const matchesSearch =
            service.serviceName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            service.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter =
            filterStatus === "all" || service.status === filterStatus;

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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Services
                </h1>
                <p className="text-gray-600">
                    View and track all your service requests
                </p>
            </div>

            {/* Filters + Table */}
            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
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

                <Table
                    headers={[
                        "Service Name",
                        "Category",
                        "Status",
                        "Request Date",
                        "Actions",
                    ]}
                >
                    {filteredServices.map((service) => (
                        <TableRow key={service.id}>
                            <TableCell>
                                <span className="font-semibold">
                                    {service.serviceName}
                                </span>
                            </TableCell>
                            <TableCell>{service.category}</TableCell>
                            <TableCell>{getStatusBadge(service.status)}</TableCell>
                            <TableCell>{service.date}</TableCell>
                            <TableCell>
                                <button
                                    onClick={() => handleViewDetails(service)}
                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="View Details"
                                >
                                    <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {filteredServices.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No services found</p>
                    </div>
                )}
            </Card>

            {/* Service Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm mb-1">
                                Total Services
                            </p>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {services.length}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                                {services.length}
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
                                    services.filter((s) => s.status === "accepted")
                                        .length
                                }
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                            <span className="text-white text-xl font-bold">
                                {
                                    services.filter((s) => s.status === "accepted")
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
                                    services.filter((s) => s.status === "pending")
                                        .length
                                }
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                            <span className="text-black text-xl font-bold">
                                {
                                    services.filter((s) => s.status === "pending")
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
                title="Service Details"
                size="lg"
            >
                {selectedService && (
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Service Name
                            </label>
                            <p className="text-gray-900 mt-1">
                                {selectedService.serviceName}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Category
                            </label>
                            <p className="text-gray-900 mt-1">
                                {selectedService.category}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <p className="text-gray-900 mt-1">
                                {selectedService.description}
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Status
                            </label>
                            <div className="mt-1">
                                {getStatusBadge(selectedService.status)}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700">
                                Request Date
                            </label>
                            <p className="text-gray-900 mt-1">
                                {selectedService.date}
                            </p>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
