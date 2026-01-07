'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      name: 'Strategy',
      icon: '🎯',
      description: 'Data-driven planning for measurable growth'
    },
    {
      name: 'Content',
      icon: '✨',
      description: 'Stories that convert attention into action'
    },
    {
      name: 'Production',
      icon: '🎬',
      description: 'Premium visuals that demand attention'
    },
    {
      name: 'Analytics',
      icon: '📊',
      description: 'Real-time insights for smarter decisions'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <main className="min-h-screen bg-[#0B0F14] overflow-hidden">
      {/* Hero Section - Attention */}
      <section className="relative min-h-screen flex items-center py-20 px-6 lg:px-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-[#CE182A]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#CE182A]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8">
              <div className="space-y-3">
                <h1 className="text-6xl lg:text-7xl font-bold text-white tracking-tight animate-fade-in">
                  Attention
                </h1>
                <p className="text-[#9CA3AF] text-sm tracking-widest opacity-80">
                  /əˈtenʃən/
                </p>
              </div>

              <div className="space-y-6 text-[#9CA3AF] text-lg leading-relaxed max-w-xl">
                <p className="animate-slide-in-bottom">
                  The most valuable asset in the digital economy — and the most misunderstood.
                </p>
                <p className="animate-slide-in-bottom delay-200">
                  Attention is what turns brands into movements, content into demand, and visibility into growth.
                </p>
                <p className="animate-slide-in-bottom delay-500">
                  At D2D Social Studio, we don't chase attention. We engineer it — through systems, strategy, and storytelling built for scale.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="/contact"
                  className="bg-[#CE182A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#a51422] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform"
                >
                  Start Your Project
                </a>
                <a
                  href="/our-work"
                  className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  View Our Work
                </a>
              </div>
            </div>

            {/* Right Column - Floating Images */}
            <div className="relative h-[600px] hidden lg:block">
              <div className="absolute top-0 right-0 w-72 h-72 transform rotate-6 hover:rotate-0 transition-transform duration-700">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/about/Screenshot 2026-01-06 114024.png"
                    alt="About D2D"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-20 right-20 w-64 h-64 transform -rotate-6 hover:rotate-0 transition-transform duration-700 delay-200">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/about/Screenshot 2026-01-06 140235.png"
                    alt="About D2D"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan, Create and Scale Section */}
      <section className="py-24 px-6 lg:px-16 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Plan, Create and <span className="text-[#CE182A]">Scale</span>.
            </h2>

            <div className="space-y-6 text-[#9CA3AF] text-lg leading-relaxed">
              <p>
                We are an Attention Infrastructure Platform that helps brands design, build, and scale attention systems across digital and offline ecosystems.
              </p>
              <p>
                We don't run disconnected campaigns. We engineer structured growth using strategy, content, production, distribution, and analytics — all powered through transparent systems, dashboards, and measurable outcomes.
              </p>
            </div>

            {/* Visual Divider */}
            <div className="flex justify-center gap-2 pt-8">
              <div className="h-1 w-20 bg-[#CE182A] rounded-full" />
              <div className="h-1 w-20 bg-[#CE182A]/50 rounded-full" />
              <div className="h-1 w-20 bg-[#CE182A]/25 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Interactive Cards */}
      <section className="py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-16">
            Our Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-500 ${activeService === index ? 'scale-105' : ''
                  }`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-[#CE182A]/50 transition-all duration-300">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#CE182A]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10 space-y-4">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-white">
                      {service.name}
                    </h4>
                    <p className="text-[#9CA3AF] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {activeService === index && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#CE182A] rounded-full animate-fade-in" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Success Section with Images */}
      <section className="py-24 px-6 lg:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image
                    src="/about/Screenshot 2026-01-06 140300.png"
                    alt="Client Success"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#CE182A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image
                    src="/about/Screenshot 2026-01-06 140320.png"
                    alt="Client Success"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#CE182A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image
                    src="/about/Screenshot 2026-01-06 114024.png"
                    alt="Client Success"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#CE182A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image
                    src="/about/Screenshot 2026-01-06 140235.png"
                    alt="Client Success"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#CE182A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Client Success
              </h2>

              <div className="space-y-6 text-[#9CA3AF] text-lg leading-relaxed">
                <p>
                  We focus on clarity, performance, and measurable impact.
                </p>
                <p>
                  Every idea, system, and execution is designed to solve real business problems — not just look good on the surface.
                </p>
                <p>
                  At D2D Social Studio, success is defined by results our clients can see, track, and scale with confidence. We believe trust is earned through consistency, transparency, and outcomes that compound over time.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CE182A] mb-2">100+</div>
                  <div className="text-sm text-[#9CA3AF]">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CE182A] mb-2">50+</div>
                  <div className="text-sm text-[#9CA3AF]">Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#CE182A] mb-2">5+</div>
                  <div className="text-sm text-[#9CA3AF]">Years</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Scale Section - Full Width Hero */}
      <section className="relative py-32 px-6 lg:px-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #CE182A 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Built for <span className="text-[#CE182A]">scale</span>.
              <br />
              Designed for clarity.
            </h2>

            <div className="space-y-6 text-[#9CA3AF] text-xl leading-relaxed max-w-3xl mx-auto">
              <p>
                We engineer attention systems that are designed to scale with your business — not against it.
              </p>
              <p>
                Every strategy, content piece, and campaign is built with clarity at its core: clear goals, clear metrics, clear growth.
              </p>
              <p className="text-white font-semibold">
                No fluff. No vanity metrics. Just systems that compound results over time.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <a
                href="/contact"
                className="bg-[#CE182A] text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-[#a51422] transition-all duration-300 shadow-2xl hover:shadow-[#CE182A]/50 hover:scale-105 transform"
              >
                Let's Build Together
              </a>
              <a
                href="/services"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-6 lg:px-16 bg-gradient-to-r from-[#CE182A] to-[#a51422]">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ready to Engineer Attention?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's design a scalable growth infrastructure for your brand. No fluff, just results.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-[#CE182A] px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/50 hover:scale-105 transform"
          >
            Start Your Journey →
          </a>
        </div>
      </section>
    </main>
  );
}