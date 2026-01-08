"use client"
import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import axios from "axios";

export default function ServiceApplicationModal({ service, onClose }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        companyName: "",
        projectDescription: "",
        budgetRange: "",
        preferredStartDate: "",
        additionalNotes: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // TODO: Get actual userId from session/auth
            const userId = "temp_user_id"; // Replace with actual user ID from auth

            const response = await axios.post("/api/service-applications", {
                userId,
                serviceId: service._id,
                ...formData,
            });

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit application");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600">
                        Your application has been submitted successfully. We'll review it and get back to you soon.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-2xl w-full my-8">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Apply for Service</h2>
                        <p className="text-sm text-gray-600 mt-1">{service.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="+91 98765 43210"
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Company/Organization
                            </label>
                            <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="ABC Company Ltd"
                            />
                        </div>

                        {/* Budget Range */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Budget Range
                            </label>
                            <select
                                name="budgetRange"
                                value={formData.budgetRange}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="">Select budget range</option>
                                <option value="Less than ₹50,000">Less than ₹50,000</option>
                                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                                <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                                <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000</option>
                                <option value="More than ₹5,00,000">More than ₹5,00,000</option>
                            </select>
                        </div>

                        {/* Preferred Start Date */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Preferred Start Date
                            </label>
                            <input
                                type="date"
                                name="preferredStartDate"
                                value={formData.preferredStartDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>
                    </div>

                    {/* Project Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Project Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="projectDescription"
                            value={formData.projectDescription}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Please describe your project requirements in detail..."
                        />
                    </div>

                    {/* Additional Notes */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Additional Notes
                        </label>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Any specific requirements or questions..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
