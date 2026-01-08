"use client"
import { useState } from "react";
import { Search, Eye, Check, X } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Button from "./components/Button";
import Modal from "./components/Modal";
import { mockServices } from "./mockdata.js";

export default function Services() {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAccept = (id) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, status: "accepted" } : s
      )
    );
  };

  const handleReject = (id) => {
    setServices(
      services.map((s) =>
        s.id === id ? { ...s, status: "rejected" } : s
      )
    );
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.serviceName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      service.requestedBy
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

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
          Services Management
        </h1>
        <p className="text-gray-600">
          Manage and track all service requests
        </p>
      </div>

      {/* Filters + Table */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services or clients..."
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
            "Requested By",
            "Date",
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
              <TableCell>{service.requestedBy}</TableCell>
              <TableCell>{service.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(service)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>

                  {service.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAccept(service.id)}
                        className="p-1.5 hover:bg-green-100 rounded-lg transition-colors"
                        title="Accept"
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </button>

                      <button
                        onClick={() => handleReject(service.id)}
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

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No services found</p>
          </div>
        )}
      </Card>

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
                Requested By
              </label>
              <p className="text-gray-900 mt-1">
                {selectedService.requestedBy}
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

            {selectedService.status === "pending" && (
              <div className="flex gap-3 pt-4">
                <Button
                  variant="success"
                  onClick={() => {
                    handleAccept(selectedService.id);
                    setShowModal(false);
                  }}
                >
                  Accept Service
                </Button>

                <Button
                  variant="danger"
                  onClick={() => {
                    handleReject(selectedService.id);
                    setShowModal(false);
                  }}
                >
                  Reject Service
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
