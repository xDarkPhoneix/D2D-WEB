'use client';

import { useState } from 'react';
import { Trophy, Award, Users, Star, Calendar, Building } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

export default function Awards() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const awards = [
    {
      id: 1,
      year: 2024,
      title: "Best Digital Marketing Agency",
      organization: "India Marketing Summit",
      category: "Industry Recognition",
      description: "Recognized for excellence in digital marketing and brand building strategies",
      featured: true
    },
    {
      id: 2,
      year: 2024,
      title: "Excellence in Social Media Marketing",
      organization: "Social Media Awards India",
      category: "Industry Recognition",
      description: "Awarded for outstanding social media campaigns and community engagement"
    },
    {
      id: 3,
      year: 2023,
      title: "Top Creative Agency of the Year",
      organization: "Creative Excellence Awards",
      category: "Industry Recognition",
      description: "Honored for innovative creative solutions and brand storytelling",
      featured: true
    },
    {
      id: 4,
      year: 2023,
      title: "Client Satisfaction Excellence",
      organization: "Clutch Global Awards",
      category: "Client Testimonials",
      description: "98% client satisfaction rating based on independent reviews"
    },
    {
      id: 5,
      year: 2023,
      title: "Best Growth Marketing Team",
      organization: "Growth Marketing Conference",
      category: "Team Awards",
      description: "Recognized for exceptional team performance and results"
    },
    {
      id: 6,
      year: 2022,
      title: "Emerging Agency of the Year",
      organization: "Startup India",
      category: "Industry Recognition",
      description: "Fastest growing marketing agency in India",
      featured: true
    }
  ];

  const certifications = [
    { name: "Google Partner", icon: Building, color: "#4285F4" },
    { name: "Meta Business Partner", icon: Building, color: "#0668E1" },
    { name: "HubSpot Certified", icon: Building, color: "#FF7A59" },
    { name: "LinkedIn Marketing Partner", icon: Building, color: "#0A66C2" }
  ];

  const categories = [
    { id: 'all', label: 'All Awards', icon: Trophy },
    { id: 'Industry Recognition', label: 'Industry Recognition', icon: Award },
    { id: 'Client Testimonials', label: 'Client Testimonials', icon: Users },
    { id: 'Team Awards', label: 'Team Awards', icon: Star }
  ];

  const years = ['all', '2024', '2023', '2022'];

  const filteredAwards = awards.filter(award => {
    const categoryMatch = selectedCategory === 'all' || award.category === selectedCategory;
    const yearMatch = selectedYear === 'all' || award.year.toString() === selectedYear;
    return categoryMatch && yearMatch;
  });

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.icon : Trophy;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 gradient-yellow">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block p-4 bg-black rounded-full mb-6 animate-float">
            <Trophy className="w-12 h-12 text-[#F8D200]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black animate-fade-in-up">
            Recognition & Awards
          </h1>
          <p className="text-xl md:text-2xl text-black/80 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Celebrating excellence, innovation, and the trust our clients place in us.
          </p>
        </div>
      </section>

      {/* Featured Awards */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Featured Recognition"
            subtitle="Our most prestigious achievements and milestones"
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8">
            {filteredAwards.filter(a => a.featured).map((award, index) => {
              const Icon = getCategoryIcon(award.category);
              return (
                <div
                  key={award.id}
                  className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border-2 border-[#F8D200] hover:border-[#F8D200] hover:shadow-[0_0_30px_rgba(248,210,0,0.3)] transition-all duration-300 hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-[#F8D200] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <div className="text-[#F8D200] text-sm font-semibold mb-2">
                    {award.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[#F8D200] transition-colors">
                    {award.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{award.organization}</p>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {award.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Awards - Filterable */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="All Awards & Recognition"
            align="center"
          />

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${selectedCategory === cat.id
                        ? 'bg-black text-[#F8D200]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Year Filter */}
            <div className="flex gap-2 justify-center">
              {years.map(year => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedYear === year
                      ? 'gradient-yellow text-black'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {year === 'all' ? 'All Years' : year}
                </button>
              ))}
            </div>
          </div>

          {/* Awards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAwards.map((award, index) => {
              const Icon = getCategoryIcon(award.category);
              return (
                <div
                  key={award.id}
                  className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#F8D200] hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-[#F8D200] rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-600">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {award.year}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {award.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{award.organization}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {award.description}
                  </p>
                  <div className="mt-4 inline-block px-3 py-1 bg-black text-[#F8D200] text-xs font-semibold rounded-full">
                    {award.category}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredAwards.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No awards found for the selected filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            title="Certifications & Partnerships"
            subtitle="Trusted by the world's leading platforms"
            align="center"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${cert.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: cert.color }} />
                  </div>
                  <h4 className="font-bold text-gray-900">{cert.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-up delay-200">
            Partner with an award-winning agency that delivers results.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 gradient-yellow text-black font-bold rounded-full hover:scale-105 transition-transform animate-fade-in-up delay-500"
          >
            Let's Build Something Amazing
          </a>
        </div>
      </section>
    </>
  );
}
