'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Grid2x2, LayoutGrid, Filter } from 'lucide-react';
import ImageLightbox from '../components/ImageLightbox';
import AnimatedCounter from '../components/AnimatedCounter';

// Generate array of image filenames with metadata
const projects = [
  ...Array.from({ length: 20 }, (_, i) => ({
    src: `/our-work/${i + 1}.jpeg`,
    title: `Project ${i + 1}`,
    category: i % 3 === 0 ? 'Branding' : i % 3 === 1 ? 'Social Media' : 'Digital Campaigns',
    client: `Client ${String.fromCharCode(65 + (i % 10))}`,
  })),
  {
    src: '/our-work/WhatsApp Image 2026-01-06 at 21.47.42.jpeg',
    title: 'Special Project 1',
    category: 'Events',
    client: 'Client Special'
  },
  {
    src: '/our-work/WhatsApp Image 2026-01-06 at 21.47.43.jpeg',
    title: 'Special Project 2',
    category: 'Events',
    client: 'Client Special'
  },
  {
    src: '/our-work/WhatsApp Image 2026-01-06 at 21.47.44.jpeg',
    title: 'Special Project 3',
    category: 'Events',
    client: 'Client Special'
  },
  {
    src: '/our-work/WhatsApp Image 2026-01-06 at 21.47.45.jpeg',
    title: 'Special Project 4',
    category: 'Events',
    client: 'Client Special'
  }
];

export default function OurWork() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const categories = ['all', 'Branding', 'Social Media', 'Digital Campaigns', 'Events'];

  const filteredProjects = categoryFilter === 'all'
    ? projects
    : projects.filter(p => p.category === categoryFilter);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative gradient-yellow py-24 px-8 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-black rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-black mb-6 animate-fade-in-up">
            Our Impact in Action
          </h1>
          <p className="text-xl lg:text-2xl text-black/80 leading-relaxed animate-fade-in-up delay-200">
            Real campaigns. Real results. Real growth for brands who dare to stand out.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1 w-20 bg-black rounded-full animate-pulse" />
            <div className="h-1 w-20 bg-black/70 rounded-full animate-pulse delay-200" />
            <div className="h-1 w-20 bg-black/50 rounded-full animate-pulse delay-500" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-16 shadow-md">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#F8D200] mb-2">
              <AnimatedCounter end={projects.length} suffix="+" />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#F8D200] mb-2">
              <AnimatedCounter end={150} suffix="+" />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#F8D200] mb-2">
              <AnimatedCounter end={500} suffix="+" />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Campaigns Launched</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#F8D200] mb-2">
              <AnimatedCounter end={100} suffix="%" />
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wide">Results Driven</div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${categoryFilter === cat
                      ? 'bg-black text-[#F8D200]'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white hover-lift animate-scale-in"
                style={{
                  animationDelay: `${index * 30}ms`
                }}
                onClick={() => handleImageClick(projects.indexOf(project))}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-end p-6">
                    <div className="text-white text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-12 rounded-full bg-[#F8D200] flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24  24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <p className="text-lg font-bold mb-1">{project.title}</p>
                      <p className="text-sm text-gray-300">{project.client}</p>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-[#F8D200] text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {project.category}
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Grid2x2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No projects found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="gradient-dark py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fade-in-up delay-200">
            Let's build something extraordinary together. Join the brands who chose to dominate.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-500">
            <a
              href="/contact"
              className="gradient-yellow text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              Start Your Project
            </a>
            <a
              href="/about"
              className="bg-transparent border-2 border-[#F8D200] text-[#F8D200] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#F8D200] hover:text-black transition-all shadow-xl hover:scale-105"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <ImageLightbox
        images={projects.map(p => ({ src: p.src, title: p.title, description: `${p.category} • ${p.client}` }))}
        initialIndex={selectedImage || 0}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
      />
    </main>
  );
}
