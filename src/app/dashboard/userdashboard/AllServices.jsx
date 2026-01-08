"use client"
import { useState, useEffect } from "react";
import { Search, Eye, Plus } from "lucide-react";
import Card from "./components/Card";
import Button from "./components/Button";
import ServiceApplicationModal from "./components/ServiceApplicationModal";
import axios from "axios";

// Mock services for testing without database
const mockServices = [
    {
        _id: "1",
        title: "Logo Design Package",
        description: "Professional logo design with 3 concepts, unlimited revisions, and brand guidelines. Get a memorable logo that represents your brand identity perfectly.",
        category: "Branding & Design",
        image: "/services0.jpeg",
        price: "₹15,000 - ₹25,000",
        isActive: true,
    },
    {
        _id: "2",
        title: "Social Media Management",
        description: "Monthly social media management including content creation, posting schedule, engagement, and analytics reporting for Instagram, Facebook, and LinkedIn.",
        category: "Social Media",
        image: "/services1.jpeg",
        price: "₹20,000/month",
        isActive: true,
    },
    {
        _id: "3",
        title: "Email Marketing Campaign",
        description: "Design and execute targeted email marketing campaigns with professional templates, automation setup, and performance tracking to boost conversions.",
        category: "Digital Marketing",
        image: "/services3.jpeg",
        price: "₹12,000 - ₹30,000",
        isActive: true,
    },
    {
        _id: "4",
        title: "Mobile App Development",
        description: "Custom mobile app development for iOS and Android. Modern UI/UX design, cloud integration, and post-launch support included.",
        category: "App Development",
        image: "/services6.jpeg",
        price: "₹2,50,000+",
        isActive: true,
    },
    {
        _id: "5",
        title: "Content Writing Services",
        description: "Professional content writing for blogs, websites, and social media. SEO-optimized, engaging content that drives traffic and conversions.",
        category: "Content Creation",
        image: "/services5.jpeg",
        price: "₹2,500 - ₹5,000 per article",
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
