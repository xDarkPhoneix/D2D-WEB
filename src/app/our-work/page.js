'use client';

import { useState } from 'react';
import Image from 'next/image';

// Generate array of image filenames
const images = [
  ...Array.from({ length: 20 }, (_, i) => `${i + 1}.jpeg`),
  'WhatsApp Image 2026-01-06 at 21.47.42.jpeg',
  'WhatsApp Image 2026-01-06 at 21.47.43.jpeg',
  'WhatsApp Image 2026-01-06 at 21.47.44.jpeg',
  'WhatsApp Image 2026-01-06 at 21.47.45.jpeg'
];

export default function OurWork() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFilter, setImageFilter] = useState('all');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#CE182A] to-[#a51422] py-20 px-8 text-center overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 animate-fade-in">
            Our Work
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed animate-slide-in-bottom">
            Capturing moments that inspire change. Explore our journey of empowering youth and creating social impact.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1 w-20 bg-white rounded-full animate-pulse" />
            <div className="h-1 w-20 bg-white/70 rounded-full animate-pulse delay-200" />
            <div className="h-1 w-20 bg-white/50 rounded-full animate-pulse delay-500" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 shadow-md">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CE182A] mb-2">{images.length}+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Moments Captured</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CE182A] mb-2">1000+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Youth Empowered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CE182A] mb-2">50+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Events Organized</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#CE182A] mb-2">100%</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Impact Focused</div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Grid - Larger Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-auto">
            {images.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
                onClick={() => setSelectedImage(`/our-work/${image}`)}
              >
                {/* Image Container - Larger aspect ratio */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={`/our-work/${image}`}
                    alt={`Our Work ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#CE182A]/90 via-[#CE182A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                    <div className="text-white text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold">View Image</p>
                    </div>
                  </div>
                </div>

                {/* Image number badge */}
                <div className="absolute top-4 right-4 bg-[#CE182A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-[#CE182A] to-[#a51422] py-16 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join us in our mission to empower youth and create meaningful social impact across the nation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-white text-[#CE182A] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Get in Touch
            </a>
            <a
              href="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#CE182A] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Full size preview"
              width={1200}
              height={900}
              className="object-contain max-w-full max-h-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            Click anywhere to close
          </div>
        </div>
      )}
    </main>
  );
}
