"use client"
import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Button from "./components/Button";
import Modal from "./components/Modal";
import axios from "axios";
import Image from "next/image";

export default function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "all" || service.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
    setFilteredServices(filtered);
  }, [searchTerm, filterCategory, services]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/services");
      if (response.data.success) {
        setServices(response.data.services);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const categories = ["all", ...new Set(services.map(s => s.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Service Catalog
          </h1>
          <p className="text-gray-600">
            Manage your service offerings ({services.length} services)
          </p>
        </div>
        <Button className="bg-[#F8D200] text-black hover:bg-[#eaca00]">
          <Plus className="w-5 h-5 mr-2" />
          Add Service
        </Button>
      </div>

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
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : (
          <>
            <Table
              headers={[
                "Image",
                "Service Name",
                "Category",
                "Price",
                "Status",
                "Actions",
              ]}
            >
              {filteredServices.map((service) => (
                <TableRow key={service._id}>
                  <TableCell>
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-xs text-gray-500">No Img</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-gray-900">
                      {service.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{service.category}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-600 font-medium">
                    {service.price}
                  </TableCell>
                  <TableCell>
                    <Badge variant={service.isActive ? "success" : "secondary"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(service)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
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
          </>
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
          <div className="space-y-6">
            <div className="w-full h-48 relative rounded-xl overflow-hidden bg-gray-100">
              {selectedService.image && (
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Service Name</label>
                <p className="text-xl font-bold text-gray-900">{selectedService.title}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <div className="mt-1">
                  <Badge variant="default">{selectedService.category}</Badge>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <p className="text-gray-600 mt-1 leading-relaxed">{selectedService.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Price</label>
                <p className="text-lg font-semibold text-[#F8D200] bg-black inline-block px-3 py-1 rounded-lg mt-1">
                  {selectedService.price}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Status</label>
                <div className="mt-1">
                  <Badge variant={selectedService.isActive ? "success" : "secondary"}>
                    {selectedService.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button onClick={() => setShowModal(false)} variant="secondary">Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
