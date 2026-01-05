'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!formData.location) {
            newErrors.location = 'Please select a location';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            setSubmitted(true);

            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    location: '',
                    message: ''
                });
                setSubmitted(false);
            }, 3000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-white text-[#CE182A] rounded-full flex items-center justify-center text-5xl font-bold mx-auto mb-6 animate-scale-in">
                    ✓
                </div>
                <h3 className="text-2xl font-bold text-black mb-3">Thank You!</h3>
                <p className="text-lg text-black">We've received your message and will get back to you soon.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`px-4 py-3.5 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 font-medium text-base 
              focus:outline-none focus:border-white focus:bg-white/20 transition-all
              ${errors.name ? 'border-yellow-300 bg-yellow-100/20' : ''}`}
                        placeholder="Name*"
                    />
                    {errors.name && <span className="text-yellow-200 text-xs mt-1 font-semibold">{errors.name}</span>}
                </div>

                <div className="flex flex-col">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`px-4 py-3.5 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 font-medium text-base 
              focus:outline-none focus:border-white focus:bg-white/20 transition-all
              ${errors.email ? 'border-yellow-300 bg-yellow-100/20' : ''}`}
                        placeholder="Email*"
                    />
                    {errors.email && <span className="text-yellow-200 text-xs mt-1 font-semibold">{errors.email}</span>}
                </div>
            </div>

            {/* Row 2: Phone and Location */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`px-4 py-3.5 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 font-medium text-base 
              focus:outline-none focus:border-white focus:bg-white/20 transition-all
              ${errors.phone ? 'border-yellow-300 bg-yellow-100/20' : ''}`}
                        placeholder="Phone Number*"
                    />
                    {errors.phone && <span className="text-yellow-200 text-xs mt-1 font-semibold">{errors.phone}</span>}
                </div>

                <div className="flex flex-col">
                    <select
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`px-4 py-3.5 border-2 border-white/30 bg-white/10 text-white font-medium text-base 
              appearance-none cursor-pointer focus:outline-none focus:border-white focus:bg-white/20 transition-all
              bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNiA5TDEgNGgxMHoiLz48L3N2Zz4=')] 
              bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat pr-10
              ${errors.location ? 'border-yellow-300 bg-yellow-100/20' : ''}`}
                    >
                        <option value="" className="bg-[#CE182A] text-white">Location</option>
                        <option value="bangalore" className="bg-[#CE182A] text-white">Bangalore</option>
                        <option value="mumbai" className="bg-[#CE182A] text-white">Mumbai</option>
                        <option value="delhi" className="bg-[#CE182A] text-white">Delhi</option>
                        <option value="other" className="bg-[#CE182A] text-white">Other</option>
                    </select>
                    {errors.location && <span className="text-yellow-200 text-xs mt-1 font-semibold">{errors.location}</span>}
                </div>
            </div>

            {/* Message Field - Full Width */}
            <div className="flex flex-col">
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`px-4 py-3.5 border-2 border-white/30 bg-white/10 text-white placeholder-white/70 font-medium text-base 
            resize-y min-h-[100px] focus:outline-none focus:border-white focus:bg-white/20 transition-all
            ${errors.message ? 'border-yellow-300 bg-yellow-100/20' : ''}`}
                    placeholder="How can we help?"
                    rows="4"
                />
                {errors.message && <span className="text-yellow-200 text-xs mt-1 font-semibold">{errors.message}</span>}
            </div>

            {/* Circular Submit Button */}
            <button
                type="submit"
                className="w-[60px] h-[60px] bg-white text-[#CE182A] rounded-full flex items-center justify-center 
          shadow-lg hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all duration-300 self-end mt-2"
                aria-label="Submit"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </form>
    );
}
