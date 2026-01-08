import Image from "next/image";
import React from "react";

function Services() {
  const services = [
    {
      title: "Narrative Architecture",
      description:
        "We don’t just build brands; we craft Narrative Architectures that give your company a soul and a story. We transform you from a generic business into an industry leader.",
      image: "/services0.jpeg",
    },
    {
      title: "VIDEO PRODUCTION",
      description:
        "High-fidelity, cinematic video production crafted to position you as a top-tier industry expert. We create visually stunning, story-driven videos that capture attention, build credibility, and communicate your brand’s value with clarity and impact. From concept to final cut, every frame is designed to elevate your presence and leave a lasting impression on your audience.",
      image: "/services1.jpeg",
    },
    {
      title: "Creative Strategy",
      description:
        "The master plan that ensures every post, video, and design serves a clear business goal. We develop a strategic creative roadmap that aligns your brand’s messaging, visuals, and content with measurable outcomes. Every idea is purpose-driven—designed to strengthen brand positioning, improve consistency, and turn creativity into real business impact.",
      image: "/services2.jpeg",
    },
    {
      title: "Paid Ad Campaigns",
      description:
        "ROI-focused advertising on Meta, Google, and LinkedIn—designed to deliver real impact. We plan, launch, and optimize high-performance ad campaigns that reach the right audience at the right time. By combining data, creativity, and continuous optimization, we focus on driving measurable results—whether it’s leads, conversions, or revenue growth.",
      image: "/services3.jpeg",
    },
    {
      title: "SEO Mastery",
      description:
        "Technical and content-driven optimization designed to help you own the first page of Google.We implement a comprehensive SEO approach that combines strong technical foundations with high-quality, search-optimized content. From site performance and structure to keyword strategy and content optimization, every element works together to improve rankings, visibility, and long-term organic growth.",
      image: "/services4.jpeg",
    },
    {
      title: "Content Production",
      description:
        "A high-volume content engine designed to keep your brand relevant and top-of-mind every single day. We produce consistent, high-quality content across formats and platforms to ensure your brand stays visible, engaging, and memorable. From strategy to execution, our content is crafted to support growth, strengthen brand recall, and drive ongoing audience engagement",
      image: "/services5.jpeg",
    },
    {
      title: "AI Creative Studio",
      description:
        "Leveraging AI to produce hyper-personalized ads and visuals—faster and smarter than traditional agencies. We combine advanced AI tools with human creativity to design high-impact visuals and ad creatives at scale. This allows us to personalize content for different audiences, optimize performance in real time, and deliver faster turnaround without compromising on quality or brand consistency.",
      image: "/services9.jpg",
    },
    {
      title: "Bespoke Web Development",
      description:
        "High-speed, conversion-optimized websites designed to turn visitors into paying customers. We build custom websites tailored to your business goals—focused on performance, usability, and conversion. Every site is engineered for speed, seamless user experience, and clear customer journeys, ensuring your digital presence works as a powerful growth asset, not just a brochure.",
      image: "/services6.jpeg",
    },
    {
      title: "Business Automation",
      description:
        "Backend systems that automate your leads, follow-ups, and sales processes. We design and implement smart automation workflows that reduce manual effort and improve efficiency across your business. From lead capture and CRM integration to automated follow-ups and sales pipelines, our systems help you respond faster, close more deals, and scale operations smoothly.",
      image: "/services7.jpeg",
    },
    {
      title: "Strategic Consulting",
      description:
        "C-suite level guidance to help you scale your digital presence as your company grows. We work closely with leadership teams to provide high-level strategic insight, clear roadmaps, and informed decision-making. Our consulting focuses on aligning digital initiatives with long-term business goals—ensuring your growth is intentional, scalable, and sustainable at every stage.",
      image: "/services8.jpeg",
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
