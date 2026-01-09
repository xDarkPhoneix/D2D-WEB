'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Target, Globe, Zap, BarChart2 } from 'lucide-react';

export default function AboutPage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      name: 'Tech & Web',
      icon: <Globe className="w-12 h-12" />,
      description: 'Building robust digital infrastructure & automation',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      name: 'Media & Creative',
      icon: <Zap className="w-12 h-12" />,
      description: 'Crafting compelling narratives & visual excellence',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      name: 'Growth Marketing',
      icon: <Target className="w-12 h-12" />,
      description: 'Data-driven strategies to scale your reach',
      gradient: 'from-orange-500 to-red-400'
    },
    {
      name: 'Analytics',
      icon: <BarChart2 className="w-12 h-12" />,
      description: 'Real-time insights for smarter business decisions',
      gradient: 'from-green-500 to-emerald-400'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <main className="min-h-screen bg-[#050505] overflow-x-hidden text-white font-sans selection:bg-[#CE182A] selection:text-white">

      {/* Hero Section - Attention */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6 lg:px-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#CE182A]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] animate-pulse delay-700" />

        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#CE182A] animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide text-gray-300">ATTENTION INFRASTRUCTURE PLATFORM</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
                We Engineer <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CE182A] via-[#FF4D4D] to-[#CE182A] animate-gradient-x">
                  Attention.
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                In the digital economy, attention is the only currency that matters. We don't just capture it; we build the systems that sustain it.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <a href="/contact" className="group relative px-8 py-4 bg-[#CE182A] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(206,24,42,0.4)]">
                <span className="relative z-10 font-bold flex items-center gap-2">
                  Start Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a href="/our-work" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all font-medium backdrop-blur-sm">
                View Case Studies
              </a>
            </div>
          </div>

          {/* Abstract Visual */}
          <div className="relative h-[600px] hidden lg:flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Floating Cards simulating layers of attention */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 shadow-2xl rotate-[-6deg] z-10 overflow-hidden group hover:rotate-0 transition-all duration-700">
                <Image src="/services0.jpeg" alt="Layer 1" fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gray-900 rounded-2xl border border-white/10 shadow-2xl rotate-[6deg] z-20 overflow-hidden group hover:rotate-0 transition-all duration-700 hover:scale-105">
                <Image src="/services1.jpeg" alt="Layer 2" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6">
                  <p className="text-[#CE182A] font-bold text-sm tracking-widest">STRATEGY</p>
                  <h3 className="text-2xl font-bold">Narrative Architecture</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Philosophy Section */}
      <section className="py-32 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-3 gap-12 border-b border-white/10 pb-20 mb-20">
            <div>
              <h3 className="text-4xl font-bold mb-6">Plan.</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                We don't guess. We analyze data patterns to build architectural blueprints for your brand's digital presence.
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-6 text-[#CE182A]">Create.</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Production that stops the scroll. We craft visual languages that speak directly to user psychology.
              </p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-6">Scale.</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                Systems designed for exponential growth. We turn one-time viewers into lifetime advocates.
              </p>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              "We don't run disconnected campaigns. We engineer <span className="text-[#CE182A] inline-block border-b-4 border-[#CE182A]">systems</span>."
            </h2>
            <div className="h-20 w-[1px] bg-gradient-to-b from-[#CE182A] to-transparent mx-auto mt-12"></div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-32 px-6 lg:px-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Our Ecosystem</h2>
              <p className="text-gray-400">Comprehensive capabilities for the modern digital landscape.</p>
            </div>
            <a href="/services" className="text-[#CE182A] font-bold hover:text-white transition-colors flex items-center gap-2">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden ${activeService === index ? 'ring-1 ring-[#CE182A]/50 bg-white/[0.07]' : ''}`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className="mb-6 p-4 rounded-xl bg-black/50 w-fit text-white group-hover:text-[#CE182A] transition-colors border border-white/5">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#CE182A] group-hover:border-[#CE182A] transition-all">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-20 overflow-hidden">
        <div className="flex gap-6 animate-scroll-left hover:pause">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative w-[400px] h-[300px] flex-shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
              <Image
                src={`/services${i}.jpeg`}
                alt="Gallery"
                fill
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-bold tracking-widest text-sm">PROJECT {i + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scale Section */}
      <section className="relative py-32 px-6 lg:px-16 overflow-hidden bg-[#CE182A]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] border-[100px] border-white/10 rounded-full"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] border-[50px] border-white/5 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
            Built for <span className="text-black">Scale</span>.
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-12">
            "We don't build needed services. We build necessary infrastructure."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-black text-white px-10 py-5 rounded-full font-bold hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
              Start Scaling
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
