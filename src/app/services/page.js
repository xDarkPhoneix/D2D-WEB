import Image from "next/image";
import React from "react";

function Services() {
  const services = [
    {
      title: "Narrative Architecture",
      description:
        "We don’t just build brands; we craft Narrative Architectures that give your company a soul and a story. We transform you from a generic business into an industry leader.",
      image: "/services1.jpeg",
    },
    {
      title: "SEO Mastery",
      description:
        "Technical and content optimization to ensure your brand owns the first page of Google.",
      image: "/services2.jpeg",
    },
    {
      title: "Content Production",
      description:
        "A high-volume Content Engine that keeps your brand relevant and top-of-mind daily.",
      image: "/services3.jpeg",
    },
    {
      title: "AI Creative Studio",
      description:
        "Leveraging AI to produce hyper-personalized ads faster and smarter than traditional methods.",
      image: "/services4.jpeg",
    },
    {
      title: "Bespoke Web Development",
      description:
        "High-speed, conversion-optimized websites that turn visitors into paying customers.",
      image: "/services5.jpeg",
    },
    {
      title: "Business Automation",
      description:
        "Backend systems that automate your leads, follow-ups, and sales processes.",
      image: "/services6.jpeg",
    },
    {
      title: "Strategic Master Planning",
      description:
        "Every design and post we create is part of a larger Master Plan designed to hit your specific business milestones.",
      image: "/services8.jpeg",
    },
    {
      title: "Cinematic Video Production",
      description:
        "High-fidelity cinematic content that positions you as a top-tier authority in your industry.",
      image: "/services9.jpeg",
    },
    {
      title: "Paid Ad Campaigns",
      description:
        "ROI-focused advertising on Meta, Google, and LinkedIn designed for maximum impact.",
      image: "/services10.jpeg",
    },
  ];

  return (
    <section className="pt-28 pb-24">
      {/* HERO */}
      <div className="px-6 md:px-12 lg:px-20 mb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Our <span className="text-[#F8D200]">Services</span>
            </h1>
          </div>

          <div className="md:w-1/2">
            <p className="text-lg md:text-xl  leading-relaxed">
              We help businesses dominate their space with precision-crafted
              strategies, premium execution, and systems built for scale.
            </p>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <div className="space-y-32">
        {services.map((service, index) => (
          <div key={service.title} className="px-6 md:px-12 lg:px-20">
            <div
              className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* TEXT */}
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="text-[#F8D200]">/</span> {service.title}
                </h2>
                <p className="text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* IMAGE */}
              <div className="md:w-1/2 flex justify-center">
                <div
                  className="
                    relative
                    group
                    rounded-3xl
                    overflow-hidden
                    transition-all
                    duration-500
                    md:hover:-translate-y-3
                    md:hover:shadow-[0_40px_80px_-20px_rgba(248,210,0,0.35)]
                  "
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={480}
                    height={480}
                    className="
                      w-full
                      max-w-md
                      rounded-3xl
                      transition-transform
                      duration-700
                      md:group-hover:scale-105
                    "
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 md:group-hover:opacity-100 transition" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
