'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function ServiceApplicationModal({ isOpen, onClose, service }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        projectDescription: '',
        budgetRange: '',
        preferredStartDate: '',
        additionalNotes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/service-applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceId: service._id,
                    ...formData,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        projectDescription: '',
                        budgetRange: '',
                        preferredStartDate: '',
                        additionalNotes: '',
                    });
                }, 2000);
            } else {
                setError(data.message || 'Failed to submit application');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Application error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-black to-gray-900 text-white px-8 py-6 rounded-t-3xl flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Apply for Service</h2>
                        <p className="text-[#F8D200] text-sm mt-1">{service?.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-green-800 font-semibold">
                            ✅ Application submitted successfully! We'll get back to you soon.
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition"
                            placeholder="John Doe"
                        />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid md:grid-cols-2 gap-4">
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition"
                                placeholder="+91 9876543210"
                            />
                        </div>
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition"
                            placeholder="Your Company Ltd."
                        />
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
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition resize-none"
                            placeholder="Describe your project requirements and goals..."
                        />
                    </div>

                    {/* Budget Range and Start Date */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Budget Range
                            </label>
                            <select
                                name="budgetRange"
                                value={formData.budgetRange}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition"
                            >
                                <option value="">Select budget range</option>
                                <option value="Under ₹50,000">Under ₹50,000</option>
                                <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                                <option value="₹1,00,000 - ₹3,00,000">₹1,00,000 - ₹3,00,000</option>
                                <option value="₹3,00,000 - ₹5,00,000">₹3,00,000 - ₹5,00,000</option>
                                <option value="Above ₹5,00,000">Above ₹5,00,000</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Preferred Start Date
                            </label>
                            <input
                                type="date"
                                name="preferredStartDate"
                                value={formData.preferredStartDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition"
                            />
                        </div>
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
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F8D200] focus:border-transparent transition resize-none"
                            placeholder="Any additional information you'd like to share..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || success}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-black to-gray-900 text-[#F8D200] font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isSubmitting ? 'Submitting...' : success ? 'Submitted!' : 'Submit Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
