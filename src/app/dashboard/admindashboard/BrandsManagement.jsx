"use client"
import { useState, useEffect } from "react";
import { Search, Eye, UserPlus, Building, Filter } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Button from "./components/Button";
import Modal from "./components/Modal";

export default function BrandsManagement() {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Fetch brands
    useEffect(() => {
        fetchBrands();
    }, [filterStatus, filterCategory]);

    const fetchBrands = async () => {
        try {
            setLoading(true);
            let url = '/api/admin/brands?';
            if (filterStatus !== 'all') url += `status=${filterStatus}&`;
            if (filterCategory !== 'all') url += `category=${encodeURIComponent(filterCategory)}&`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setBrands(data.data);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (brand) => {
        setSelectedBrand(brand);
        setShowModal(true);
    };

    const handleStatusChange = async (brandId, newStatus) => {
        try {
            const response = await fetch(`/api/admin/brands/${brandId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchBrands();
                if (selectedBrand?._id === brandId) {
                    setSelectedBrand(null);
                    setShowModal(false);
                }
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredBrands = brands.filter((brand) => {
        const matchesSearch =
            brand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brand.primaryContact?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <Badge variant="success">Active</Badge>;
            case "lead":
                return <Badge variant="warning">Lead</Badge>;
            case "paused":
                return <Badge variant="default">Paused</Badge>;
            default:
                return <Badge variant="default">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Brands Management
                    </h1>
                    <p className="text-gray-600">
                        Manage all brand profiles and client relationships
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                >
                    <Building className="w-4 h-4 mr-2" />
                    Add New Brand
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-sm text-gray-600">Total Brands</div>
                    <div className="text-2xl font-bold text-gray-900">{brands.length}</div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600">Active Clients</div>
                    <div className="text-2xl font-bold text-green-600">
                        {brands.filter(b => b.status === 'active').length}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600">Leads</div>
                    <div className="text-2xl font-bold text-yellow-600">
                        {brands.filter(b => b.status === 'lead').length}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600">Paused</div>
                    <div className="text-2xl font-bold text-gray-600">
                        {brands.filter(b => b.status === 'paused').length}
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by brand name, email, or contact..."
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
                        <option value="lead">Lead</option>
                        <option value="active">Active</option>
                        <option value="paused">Paused</option>
                    </select>

                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                        <option value="all">All Categories</option>
                        <option value="Startup Founder / Business Owner">Startup</option>
                        <option value="Cafe / Restaurant / Retail Brand">Cafe/Restaurant</option>
                        <option value="D2C / E-commerce Brand">D2C/E-commerce</option>
                        <option value="Dairy / FMCG / Manufacturing Brand">Dairy/FMCG</option>
                        <option value="Incubation Centre / Accelerator / E-Cell">Incubator</option>
                        <option value="Government Body / Institution / University">Government</option>
                        <option value="Personal Brand / Founder / CXO">Personal Brand</option>
                    </select>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Loading brands...</p>
                    </div>
                ) : (
                    <>
                        <Table
                            headers={[
                                "Brand Name",
                                "Category",
                                "City",
                                "Status",
                                "Owner",
                                "Contact",
                                "Actions",
                            ]}
                        >
                            {filteredBrands.map((brand) => (
                                <TableRow key={brand._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                                                <span className="text-black font-bold text-sm">
                                                    {brand.name?.charAt(0) || '?'}
                                                </span>
                                            </div>
                                            <span className="font-semibold">{brand.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-sm">{brand.category?.split(' / ')[0] || 'N/A'}</span>
                                    </TableCell>
                                    <TableCell>{brand.city || 'N/A'}</TableCell>
                                    <TableCell>{getStatusBadge(brand.status)}</TableCell>
                                    <TableCell>{brand.ownerId?.email || 'N/A'}</TableCell>
                                    <TableCell>{brand.email}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewDetails(brand)}
                                                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>

                        {filteredBrands.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No brands found</p>
                            </div>
                        )}
                    </>
                )}
            </Card>

            {/* Brand Details Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Brand Details"
                size="lg"
            >
                {selectedBrand && (
                    <div className="space-y-6">
                        {/* Brand Header */}
                        <div className="flex items-center gap-4 pb-4 border-b">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                                <span className="text-black font-bold text-2xl">
                                    {selectedBrand.name?.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {selectedBrand.name}
                                </h3>
                                <p className="text-gray-600">{selectedBrand.industry}</p>
                            </div>
                            {getStatusBadge(selectedBrand.status)}
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">Category</label>
                                <p className="text-gray-900 mt-1">{selectedBrand.category}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">City</label>
                                <p className="text-gray-900 mt-1">{selectedBrand.city}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Email</label>
                                <p className="text-gray-900 mt-1">{selectedBrand.email}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Phone</label>
                                <p className="text-gray-900 mt-1">{selectedBrand.phone || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Primary Contact</label>
                                <p className="text-gray-900 mt-1">{selectedBrand.primaryContact}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Team Size</label>
                                <p className="text-gray-900 mt-1">{selectedBrand.teamSize || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Monthly Budget</label>
                                <p className="text-gray-900 mt-1">{selectedBrand.monthlyBudget || 'N/A'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Account Manager</label>
                                <p className="text-gray-900 mt-1">
                                    {selectedBrand.accountManager?.email || 'Not assigned'}
                                </p>
                            </div>
                        </div>

                        {/* Social Media */}
                        {selectedBrand.socialHandles && (
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-2">
                                    Social Media
                                </label>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    {selectedBrand.socialHandles.instagram && (
                                        <div>Instagram: {selectedBrand.socialHandles.instagram}</div>
                                    )}
                                    {selectedBrand.socialHandles.facebook && (
                                        <div>Facebook: {selectedBrand.socialHandles.facebook}</div>
                                    )}
                                    {selectedBrand.socialHandles.linkedin && (
                                        <div>LinkedIn: {selectedBrand.socialHandles.linkedin}</div>
                                    )}
                                    {selectedBrand.socialHandles.youtube && (
                                        <div>YouTube: {selectedBrand.socialHandles.youtube}</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Status Actions */}
                        <div className="flex gap-3 pt-4 border-t">
                            {selectedBrand.status === 'lead' && (
                                <Button
                                    variant="success"
                                    onClick={() => handleStatusChange(selectedBrand._id, 'active')}
                                >
                                    Convert to Active Client
                                </Button>
                            )}
                            {selectedBrand.status === 'active' && (
                                <Button
                                    variant="default"
                                    onClick={() => handleStatusChange(selectedBrand._id, 'paused')}
                                >
                                    Pause Brand
                                </Button>
                            )}
                            {selectedBrand.status === 'paused' && (
                                <Button
                                    variant="success"
                                    onClick={() => handleStatusChange(selectedBrand._id, 'active')}
                                >
                                    Activate Brand
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>

            {/* Create Brand Modal - Placeholder */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Brand"
                size="lg"
            >
                <div className="text-center py-8 text-gray-500">
                    Brand creation form will be implemented here
                </div>
            </Modal>
        </div>
    );
}
