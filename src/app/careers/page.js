"use client";
import Link from "next/link";
import React, { useState } from "react";

function Careers() {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    {
      title: "CREATE",
      description:
        "We believe creativity is a mindset. Here, ideas are encouraged, nurtured, and transformed into powerful brand stories.",
    },
    {
      title: "COLLABORATE",
      description:
        "Work with strategists, designers, creators, and thinkers who believe in growing together and learning every day.",
    },
    {
      title: "CHALLENGE",
      description:
        "We push boundaries, question the obvious, and constantly challenge ourselves to do better work.",
    },
    {
      title: "CELEBRATE",
      description:
        "From big wins to small milestones, we celebrate effort, growth, and individuality.",
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
    </>
  );
}

export default Careers;
