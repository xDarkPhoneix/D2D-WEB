"use client";
import Link from "next/link";
import React, { useState } from "react";
import JobDetailsModal from "./JobDetailsModel";

function Careers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openJob, setOpenJob] = useState(false);

  const items = [
    {
      title: "WHY",
      description:
        "We believe creativity is a mindset. Here, ideas are encouraged, nurtured, and transformed into powerful brand stories.",
    },
    {
      title: "WORK",
      description:
        "Work with strategists, designers, creators, and thinkers who believe in growing together and learning every day.",
    },
    {
      title: "AT D2D",
      description:
        "We push boundaries, question the obvious, and constantly challenge ourselves to do better work.",
    },
    {
      title: "SOCIAL STUDIO",
      description:
        "From big wins to small milestones, we celebrate effort, growth, and individuality.",
    },
  ];

  const jobOpenings = [
    {
      id: 1,
      title: "Associate Brand Solutions Manager",
      experience: "1–2 years",
      type: "Permanent",
      department: "Brand Solutions",
    },
    {
      id: 2,
      title: "Senior Social Media Strategist",
      experience: "3–5 years",
      type: "Full Time",
      department: "Social Media",
    },
    {
      id: 3,
      title: "Creative Copywriter",
      experience: "2–4 years",
      type: "Contract",
      department: "Creative",
    },
    {
      id: 4,
      title: "Performance Marketing Executive",
      experience: "1–3 years",
      type: "Full Time",
      department: "Growth & Performance",
    },
  ];

  return (
    <>
      <section className="bg-[#e1bb08] px-4 sm:px-6 md:px-12 py-20 md:py-32">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-stretch">
          {/* LEFT: BIG WORDS */}
          <div className="md:w-1/2 flex flex-col gap-6 md:gap-8">
            {items.map((item, index) => (
              <h2
                key={item.title}
                onMouseEnter={() => setActiveIndex(index)}
                className={`text-4xl sm:text-5xl md:text-7xl font-bold cursor-pointer transition-colors duration-300
            ${
              activeIndex === index
                ? "text-black"
                : "text-black/30 hover:text-black"
            }`}
              >
                {item.title}
              </h2>
            ))}
          </div>

          {/* RIGHT: TEXT BOX */}
          <div className="md:w-1/3 flex">
            <div
              className="
          w-full
          bg-white
          border border-black/10
          rounded-2xl
          p-6 sm:p-8 md:p-10
          shadow-sm
          flex items-center
          md:h-full
        "
            >
              <p
                key={activeIndex}
                className="text-base sm:text-lg md:text-2xl leading-relaxed text-gray-700 transition-opacity duration-300"
              >
                {items[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CURRENT OPENINGS ================= */}
      {/* ================= CURRENT OPENINGS ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Current Openings
          </h2>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div
                key={job.id}
                className="border-b py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >
                <div>
                  <h3 className="text-xl font-semibold">
                    {job.title} ({job.experience})
                  </h3>
                  <p className="text-gray-600">
                    {job.type} • {job.department}
                  </p>
                </div>

                <button
                  onClick={() => setOpenJob(true)}
                  className="bg-[#e1bb08] px-6 py-2 rounded-full font-medium hover:bg-black hover:text-white transition w-fit"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= MODAL ================= */}
      {openJob && <JobDetailsModal onClose={() => setOpenJob(false)} />}
    </>
  );
}

export default Careers;
