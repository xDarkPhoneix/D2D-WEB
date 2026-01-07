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
export default function HomePage() {
  const [bgImage, setBgImage] = useState("");

  const cards = [
    {
      title: "Looking to become the next big name everyone’s talking about",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/infoxbox-ico1.png",
      bg: "bg-[#c32126]", // red
    },
    {
      title: "This is the main content",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/infoxbox-ico2.png",
      bg: "bg-[#1f7ae0]", // blue
    },
    {
      title: "This is the main content",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/infoxbox-ico3.png",
      bg: "bg-[#0f9d58]", // green
    },
  ];

  const services = [
    {
      title: "Brand Strategy",
      description:
        "Position your brand for maximum impact. We craft strategies that resonate with your audience and drive loyalty.",
      image:
        "./what-we-do-1.jpeg",
      icon: Target,
    },
    {
      title: "Digital Marketing",
      description:
        "Data-driven campaigns that deliver ROI. From paid ads to SEO, we maximize every dollar spent.",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: TrendingUp,
    },
    {
      title: "Creative Production",
      description:
        "Content that stops the scroll. Video, design, and copy that captures attention and converts.",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Zap,
    },
    {
      title: "Social Media",
      description:
        "Build communities that love your brand. Authentic engagement that drives real business outcomes.",
      image:
        "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Users,
    },
    {
      title: "Growth Marketing",
      description:
        "Scale faster with proven frameworks. We optimize every stage of your customer journey.",
      image:
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: TrendingUp,
    },
    {
      title: "Analytics & Insights",
      description:
        "Make informed decisions with deep data analysis. Track, measure, and optimize everything.",
      image:
        "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800",
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

        <Link
          href="/contact"
          className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-black text-white font-bold rounded-full transition-transform md:hover:scale-105"
        >
          Let’s Build Something Iconic
        </Link>
      </section>

      {/* Achivements section */}
      <section className="py-16  mt-17 sm:py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div>
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                200+
              </div>
              <div className="text-sm sm:text-base text-gray-400">
                Brands Launched
              </div>
            </div>
            <div>
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                3.5M+
              </div>
              <div className="text-sm sm:text-base text-gray-400">
                Leads Generated
              </div>
            </div>
            <div>
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                98%
              </div>
              <div className="text-sm sm:text-base text-gray-400">
                Client Satisfaction
              </div>
            </div>
            <div>
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "#f8d200" }}
              >
                45+
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
              <h2 className="text-xl sm:text-2xl font-bold pt-12 px-6 text-center text-white">
                {card.title}
              </h2>

              <img
                src={card.image}
                alt=""
                className="absolute -bottom-20 sm:-bottom-24 left-1/2 -translate-x-1/2
          w-60 sm:w-72 rounded-xl
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
