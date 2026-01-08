"use client"
import { useState, useEffect } from "react";
import { Search, Eye, Plus } from "lucide-react";
import Card from "./components/Card";
import Button from "./components/Button";
import ServiceApplicationModal from "./components/ServiceApplicationModal";
import axios from "axios";

// Services matching D2D Social Studio structure
const mockServices = [
    // Media & Creative
    {
        _id: "1",
        title: "Narrative Architecture",
        description: "We build your brand's \"Soul\" and \"Story\" so you aren't just another company, but a leader.",
        category: "Media & Creative",
        image: "/services0.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "2",
        title: "Video Production",
        description: "High-fidelity, cinematic production that makes you look like a top-tier industry expert.",
        category: "Media & Creative",
        image: "/services1.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "3",
        title: "Creative Strategy",
        description: "The \"Master Plan\" that ensures every post, video, and design serves a business goal.",
        category: "Media & Creative",
        image: "/services2.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "4",
        title: "Premium Branding",
        description: "Visual identities that resonate with high-ticket audiences.",
        category: "Media & Creative",
        image: "/services9.jpg",
        price: "Contact for Quote",
        isActive: true,
    },
    // Growth Marketing
    {
        _id: "5",
        title: "Paid Ad Campaigns",
        description: "ROI-focused advertising on Meta, Google, and LinkedIn designed to make impact.",
        category: "Growth Marketing",
        image: "/services3.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "6",
        title: "SEO Mastery",
        description: "Technical and content-based optimization to ensure you own the first page of Google.",
        category: "Growth Marketing",
        image: "/services4.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "7",
        title: "Content Production",
        description: "A high-volume \"Content Engine\" that keeps your brand relevant and top-of-mind daily.",
        category: "Growth Marketing",
        image: "/services5.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "8",
        title: "AI Creative Studio",
        description: "Leveraging AI to produce hyper-personalized ads and visuals faster and smarter than any traditional agency.",
        category: "Growth Marketing",
        image: "/services9.jpg",
        price: "Contact for Quote",
        isActive: true,
    },
    // Tech & Web
    {
        _id: "9",
        title: "Bespoke Web Development",
        description: "High-speed, conversion-optimized websites that turn visitors into paying customers.",
        category: "Tech & Web",
        image: "/services6.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "10",
        title: "Business Automation",
        description: "Backend systems that automate your leads, follow-ups, and sales processes.",
        category: "Tech & Web",
        image: "/services7.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
    {
        _id: "11",
        title: "Strategic Consulting",
        description: "C-suite level advice on how to scale your digital presence as your company grows.",
        category: "Tech & Web",
        image: "/services8.jpeg",
        price: "Contact for Quote",
        isActive: true,
    },
];

export default function AllServices() {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        // Filter services based on search
        const filtered = services.filter((service) =>
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (service.category && service.category.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredServices(filtered);
    }, [searchTerm, services]);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/services");
            if (response.data.success) {
                setServices(response.data.services);
                setFilteredServices(response.data.services);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            // Fallback to mock data if API fails
            console.log("Using mock services data");
            setServices(mockServices);
            setFilteredServices(mockServices);
        } finally {
            setLoading(false);
        }
    };

    const handleApplyClick = (service) => {
        setSelectedService(service);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedService(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Browse Our Services
                </h1>
                <p className="text-gray-600">
                    Explore our comprehensive range of services and apply for what suits your needs
                </p>
            </div>

            {/* Search Bar */}
            <Card className="p-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search services by name, category, or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                    />
                </div>
            </Card>

            {/* Services Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-600">Loading services...</p>
                </div>
            ) : filteredServices.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No services found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <Card
                            key={service._id}
                            className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Service Image */}
                            {service.image && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    {service.category && (
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                                                {service.category}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Service Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {service.description}
                                </p>

                                {service.price && (
                                    <p className="text-sm text-gray-500 mb-4">
                                        <span className="font-semibold">Estimated Price:</span> {service.price}
                                    </p>
                                )}

                                {/* Apply Button */}
                                <Button
                                    onClick={() => handleApplyClick(service)}
                                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Apply Now
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Application Modal */}
            {showModal && selectedService && (
                <ServiceApplicationModal
                    service={selectedService}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}
