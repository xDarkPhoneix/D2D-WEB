'use client';

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Code } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SectionHeading from "../components/SectionHeading";
import ServiceApplicationModal from "../components/ServiceApplicationModal";

function Services() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = (service) => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/services');
      return;
    }
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Group services by category
  const serviceCategories = [
    {
      category: "Tech & Web",
      tagline: "We build the \"Digital Real Estate\" that works while you sleep.",
      icon: Code,
      color: "#F8D200",
      services: services.filter(s => s.category === "Tech & Web"),
    },
    {
      category: "Media & Creative",
      tagline: "We don't just post content: we build Authority.",
      icon: Sparkles,
      color: "#F8D200",
      services: services.filter(s => s.category === "Media & Creative"),
    },
    {
      category: "Growth Marketing",
      tagline: "We solve the hardest problem in business: Getting Noticed",
      icon: TrendingUp,
      color: "#F8D200",
      services: services.filter(s => s.category === "Growth Marketing"),
    },
  ];

  if (loading) {
    return (
      <section className="pt-28 pb-24 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F8D200] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-24 bg-white">
      {/* HERO */}
      <div className="px-6 md:px-12 lg:px-20 mb-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Our Services"
            subtitle="We help businesses dominate their space with precision-crafted strategies, premium execution, and systems built for scale."
            align="center"
          />
        </div>
      </div>

      {/* SERVICE CATEGORIES */}
      {serviceCategories.map((category, categoryIndex) => (
        <div key={category.category} className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto">
              {/* Category Header */}
              <div className="text-center mb-16 animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
                  <category.icon className="w-8 h-8 text-[#F8D200]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-[#F8D200]">/</span> {category.category}
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-semibold">
                  {category.tagline}
                </p>
              </div>

              {/* Services in this category */}
              <div className="space-y-24">
                {category.services.map((service, index) => (
                  <div
                    key={service._id}
                    className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                      } animate-fade-in-up`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* TEXT */}
                    <div className="md:w-1/2">
                      <h3 className="text-3xl md:text-4xl font-bold mb-6">
                        {service.title}
                      </h3>
                      <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                        {service.description}
                      </p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <p className="text-[#F8D200] font-bold text-xl">
                          {service.price}
                        </p>
                        <button
                          onClick={() => handleApplyClick(service)}
                          className="px-8 py-3 bg-gradient-to-r from-black to-gray-900 text-[#F8D200] font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>

                    {/* IMAGE */}
                    <div className="md:w-1/2 flex justify-center">
                      <div className="relative group rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(248,210,0,0.35)]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={480}
                          height={480}
                          className="w-full max-w-md rounded-3xl transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* CTA SECTION */}
      <div className="mt-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center gradient-yellow rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
            Ready to Dominate Your Market?
          </h2>
          <p className="text-xl text-black/80 mb-8 leading-relaxed">
            Let's build a strategy that turns your brand into the obvious choice.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-black text-[#F8D200] font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-xl"
          >
            Get Started Today
          </a>
        </div>
      </div>

      {/* Service Application Modal */}
      {selectedService && (
        <ServiceApplicationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          service={selectedService}
        />
      )}
    </section>
  );
}

export default Services;

