"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import AnimatedCounter from "./components/AnimatedCounter";

export default function HomePage() {
  const [bgImage, setBgImage] = useState("");

  const cards = [
    {
      title:
        "Turn your brand into the name everyone’s talking about.",
      line1: "Visibility, trust, and conversions that actually work..",
      image: "/AA21.png",
      bg: "bg-[#c32126]", // red
    },
    {
      title:
        "Don’t miss the chance to do your best work ever. ",
      line1: "Join the bold minds building D2D Digital Studio.",
      image: "./hma2.png",
      bg: "bg-[#1f7ae0]", // blue
    },
    {
      title:
        "Love digital storytelling and growth marketing? ",
      line1: "Subscribe for insights, trends, and strategies from our studio.",
      image: "/hh.jpeg",
      bg: "bg-[#0f9d58]", // green
    },
  ];

  const services = [
    {
      title: "Brand Strategy",
      description:
        "Position your brand for maximum impact. We craft strategies that resonate with your audience and drive loyalty.",
      image: "./what-we-do-1.jpeg",
      icon: Target,
    },
    {
      title: "Digital Marketing",
      description:
        "Data-driven campaigns that deliver ROI. From paid ads to SEO, we maximize every dollar spent.",
      image:
        "./hp1.jpeg",
      icon: TrendingUp,
    },
    {
      title: "Creative Production",
      description:
        "Content that stops the scroll. Video, design, and copy that captures attention and converts.",
      image:
        "./hp2.jpeg",
      icon: Zap,
    },
    {
      title: "Social Media",
      description:
        "Build communities that love your brand. Authentic engagement that drives real business outcomes.",
      image:
        "./hp3.jpeg",
      icon: Users,
    },
    {
      title: "Growth Marketing",
      description:
        "Scale faster with proven frameworks. We optimize every stage of your customer journey.",
      image:
        "./hp4.jpeg",
      icon: TrendingUp,
    },
    {
      title: "Analytics & Insights",
      description:
        "Make informed decisions with deep data analysis. Track, measure, and optimize everything.",
      image:
        "./hp5.jpeg",
      icon: Target,
    },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="pt-24 pb-20 text-black text-center transition-colors duration-500"
        style={{
          backgroundColor: bgImage ? "transparent" : "#f8d200",
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
          We Are{" "}
          <span
            onMouseEnter={() =>
              setBgImage(
                "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
              )
            }
            onMouseLeave={() => setBgImage("")}
            className="relative px-1 md:px-2 md:cursor-pointer md:group"
          >
            Marketing
            <span className="hidden md:block absolute left-0 -bottom-1 w-0 h-[3px] bg-black transition-all duration-300 md:group-hover:w-full"></span>
          </span>{" "}
          Mafias
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 px-4">
          Skilled enough to know{" "}
          <span
            onMouseEnter={() =>
              setBgImage(
                "https://images.unsplash.com/photo-1553877522-43269d4ea984"
              )
            }
            onMouseLeave={() => setBgImage("")}
            className="relative font-semibold md:cursor-pointer md:group"
          >
            better
            <span className="hidden md:block absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 md:group-hover:w-full"></span>
          </span>
          , wild enough to think bigger!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-black text-white font-bold rounded-full transition-transform md:hover:scale-105 border-2 border-black"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-white text-black font-bold rounded-full transition-transform md:hover:scale-105 border-2 border-black hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Achievements section */}
      <section className="py-16 mt-17 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div className="text-center animate-fade-in-up ">
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                <AnimatedCounter end={200} suffix="+" />
              </div>
              <div className="text-sm  sm:text-base text-gray-400">
                Brands Launched
              </div>
            </div>
            <div className="text-center animate-fade-in-up delay-200">
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                <AnimatedCounter end={3.5} suffix="M+" decimals={1} />
              </div>
              <div className="text-sm sm:text-base text-gray-400">
                Leads Generated
              </div>
            </div>
            <div className="text-center animate-fade-in-up delay-500">
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                <AnimatedCounter end={98} suffix="%" />
              </div>
              <div className="text-sm sm:text-base text-gray-400">
                Client Satisfaction
              </div>
            </div>
            <div className="text-center animate-fade-in-up delay-1000">
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                <AnimatedCounter end={45} suffix="+" />
              </div>
              <div className="text-sm sm:text-base text-gray-400">
                Industry Awards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUE ================= */}
      <section className="py-24 bg-white text-center px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          We Don’t Do Safe Marketing.
        </h2>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-700">
          We build brands that people feel, not just notice.
        </p>
      </section>

      {/* ================= CARDS ================= */}

      <section className="bg-white py-24">
        <div className="flex flex-col md:flex-row gap-16 justify-center px-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative h-[420px] sm:h-[460px] w-full max-w-[320px] sm:max-w-[360px]
        ${card.bg} rounded-2xl shadow-lg
        md:hover:-translate-y-4 md:hover:shadow-2xl transition-all duration-300`}
            >
              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold pt-12 px-6 text-white">
                {card.title}
              </h2>

              {/* Clickable 2-line link */}
              <Link
                href="/contact"
                className="block mt-4 px-6 text-sm sm:text-base text-white/90 leading-relaxed
                     hover:underline hover:text-white transition"
              >
                {card.line1}
                <br />
                <span className="opacity-80">{card.line2}</span>
              </Link>

              {/* Image */}
              <img
                src={card.image}
                alt=""
                className="absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2
          w-80 h-75 sm:w-72 rounded-xl
          md:transition-transform md:duration-500 md:hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SPACER */}
      <div className="h-32 bg-white" />

      {/* ================= SERVICES ================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
              What we do best
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Full-service marketing solutions designed to accelerate your
              growth and dominate your market.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-gray-50
            hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover
                group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 sm:p-8">
                    <Icon
                      className="w-8 h-8 sm:w-10 sm:h-10 mb-4"
                      style={{ color: "#f8d200" }}
                    />

                    <h3 className="text-xl sm:text-2xl font-bold mb-3">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-6">
                Partner with the{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">best</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 sm:h-4 bg-[#f8d200] -rotate-1" />
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                We don't just execute campaigns. We become an extension of your
                team, obsessing over your growth like it's our own.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 bg-[#f8d200] flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-black" />
                  </div>
                  <span className="text-gray-700">
                    Dedicated strategy team for every account
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 bg-[#f8d200] flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-black" />
                  </div>
                  <span className="text-gray-700">
                    Transparent reporting and weekly sync-ups
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 bg-[#f8d200] flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-black" />
                  </div>
                  <span className="text-gray-700">
                    Flexible contracts with performance guarantees
                  </span>
                </li>
              </ul>
              <button className="group px-8 py-4 bg-black text-white font-medium text-base sm:text-lg flex items-center gap-2 hover:bg-gray-900 transition-all hover:scale-105 active:scale-95">
                Schedule a Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
