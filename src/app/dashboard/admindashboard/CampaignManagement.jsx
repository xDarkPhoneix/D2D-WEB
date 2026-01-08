"use client"
import { useState, useEffect } from "react";
import { Search, Eye, Plus, Calendar, Users as UsersIcon } from "lucide-react";
import Card from "./components/Card";
import Table, { TableRow, TableCell } from "./components/Table";
import Badge from "./components/Badge";
import Button from "./components/Button";
import Modal from "./components/Modal";

export default function CampaignManagement() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchCampaigns();
    }, [filterStatus]);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            let url = '/api/admin/campaigns?';
            if (filterStatus !== 'all') url += `status=${filterStatus}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                setCampaigns(data.data);
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (campaign) => {
        setSelectedCampaign(campaign);
        setShowModal(true);
    };

    const filteredCampaigns = campaigns.filter((campaign) => {
        const matchesSearch =
            campaign.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.brandId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const getStatusBadge = (status) => {
        const variants = {
            "To-do": "default",
            "In Progress": "warning",
            "Review": "info",
            "Live": "success",
            "Completed": "success",
            "Cancelled": "danger"
        };
        return <Badge variant={variants[status] || "default"}>{status}</Badge>;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const calculateProgress = (campaign) => {
        if (!campaign.deliverables || campaign.deliverables.length === 0) return 0;
        const completed = campaign.deliverables.filter(d => d.status === 'Live').length;
        return Math.round((completed / campaign.deliverables.length) * 100);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Campaign Management
                    </h1>
                    <p className="text-gray-600">
                        Track and manage all brand campaigns and deliverables
                    </p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setShowCreateModal(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="text-sm text-gray-600">Total Campaigns</div>
                    <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600">In Progress</div>
                    <div className="text-2xl font-bold text-blue-600">
                        {campaigns.filter(c => c.status === 'In Progress').length}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600">Live</div>
                    <div className="text-2xl font-bold text-green-600">
                        {campaigns.filter(c => c.status === 'Live').length}
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm text-gray-600">Completed</div>
                    <div className="text-2xl font-bold text-purple-600">
                        {campaigns.filter(c => c.status === 'Completed').length}
                    </div>
                </Card>
            </div>

            {/* Filters and Table */}
            <Card className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search campaigns or brands..."
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
                        <option value="To-do">To-do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Review">Review</option>
                        <option value="Live">Live</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Loading campaigns...</p>
                    </div>
                ) : (
                    <>
                        <Table
                            headers={[
                                "Campaign Name",
                                "Brand",
                                "Type",
                                "Status",
                                "Progress",
                                "Timeline",
                                "Budget",
                                "Actions",
                            ]}
                        >
                            {filteredCampaigns.map((campaign) => (
                                <TableRow key={campaign._id}>
                                    <TableCell>
                                        <span className="font-semibold">{campaign.name}</span>
                                    </TableCell>
                                    <TableCell>{campaign.brandId?.name || 'N/A'}</TableCell>
                                    <TableCell>
                                        <span className="text-sm">{campaign.type}</span>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${calculateProgress(campaign)}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-600">
                                                {calculateProgress(campaign)}%
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            <div>{formatDate(campaign.startDate)}</div>
                                            <div className="text-gray-500">to {formatDate(campaign.endDate)}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {campaign.budget ? `₹${campaign.budget.toLocaleString()}` : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => handleViewDetails(campaign)}
                                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </Table>

                        {filteredCampaigns.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No campaigns found</p>
                            </div>
                        )}
                    </>
                )}
            </Card>

            {/* Campaign Details Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Campaign Details"
                size="lg"
            >
                {selectedCampaign && (
                    <div className="space-y-6">
                        {/* Campaign Header */}
                        <div className="pb-4 border-b">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {selectedCampaign.name}
                            </h3>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600">
                                    Brand: <strong>{selectedCampaign.brandId?.name}</strong>
                                </span>
                                {getStatusBadge(selectedCampaign.status)}
                            </div>
                        </div>

                        {/* Campaign Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">Campaign Type</label>
                                <p className="text-gray-900 mt-1">{selectedCampaign.type}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Account Manager</label>
                                <p className="text-gray-900 mt-1">
                                    {selectedCampaign.accountManager?.email || 'Not assigned'}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Start Date</label>
                                <p className="text-gray-900 mt-1">{formatDate(selectedCampaign.startDate)}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">End Date</label>
                                <p className="text-gray-900 mt-1">{formatDate(selectedCampaign.endDate)}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Budget</label>
                                <p className="text-gray-900 mt-1">
                                    ₹{selectedCampaign.budget?.toLocaleString() || 'N/A'}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Spent</label>
                                <p className="text-gray-900 mt-1">
                                    ₹{selectedCampaign.spent?.toLocaleString() || '0'}
                                </p>
                            </div>
                        </div>

                        {/* Team */}
                        {selectedCampaign.assignedTeam && selectedCampaign.assignedTeam.length > 0 && (
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-2">
                                    <UsersIcon className="w-4 h-4 inline mr-1" />
                                    Assigned Team ({selectedCampaign.assignedTeam.length})
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCampaign.assignedTeam.map((member) => (
                                        <Badge key={member._id} variant="info">
                                            {member.email}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Deliverables */}
                        {selectedCampaign.deliverables && selectedCampaign.deliverables.length > 0 && (
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-3">
                                    Deliverables ({selectedCampaign.deliverables.length})
                                </label>
                                <div className="space-y-2">
                                    {selectedCampaign.deliverables.map((deliverable, index) => (
                                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-900">
                                                        {deliverable.description}
                                                    </div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        Type: {deliverable.type} | Due: {formatDate(deliverable.dueDate)}
                                                    </div>
                                                </div>
                                                {getStatusBadge(deliverable.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Progress */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 block mb-2">
                                Overall Progress
                            </label>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-xs text-black font-bold"
                                    style={{ width: `${calculateProgress(selectedCampaign)}%` }}
                                >
                                    {calculateProgress(selectedCampaign)}%
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Create Campaign Modal - Placeholder */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Campaign"
                size="lg"
            >
                <div className="text-center py-8 text-gray-500">
                    Campaign creation form will be implemented here
                </div>
            </Modal>
        </div>
    );
}
