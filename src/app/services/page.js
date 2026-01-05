import Image from "next/image";
import React from "react";

function Services() {
  const services = [
    {
      title: "Social Media Creative Strategy",
      description:
        "We craft platform-first creative strategies that spark conversations, build communities, and drive meaningful engagement for your brand.",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/01-service-social-media-creative-srtategy.png",
    },
    {
      title: "Branding & Marketing Communication",
      description:
        "From brand identity to storytelling, we build a voice that is bold, consistent, and emotionally resonant across all touchpoints.",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/02-service-media-planning-buying.png",
    },
    {
      title: "Media Planning &  Buying",
      description:
        "Data-backed media strategies that ensure the right message reaches the right audience at the right time — every time.",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/03-service-analytics-seo.png",
    },
    {
      title: "Analytics & SEO",
      description:
        "We turn numbers into insights, helping brands improve visibility, performance, and long-term growth through smart analytics.",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/06-service-influencer-management.png",
    },
  ];

  return (
    <>
      <section className="pt-24 pb-16 bg-white text-black">
        {/* Header / Hero Section */}
        <div className="px-6 md:px-12 lg:px-20 mb-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* LEFT: Text Content */}
            <div className="md:w-1/2 text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                 <div className="flex gap-2">
                <p className="mb-2 md:mb-6">Our</p>
                <p>Services</p>
                 </div>
              </h1>
            </div>
            {/* RIGHT: Image */}
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <p className="text-lg md:text-xl text-gray-600">
                We help businesses reach their full potential by creating a
                brand identity that is authentic and reflective of them. Every
                brand has unique challenges — and we solve them with
                power-packed strategies!
              </p>
            </div>
          </div>
        </div>

        {/* SERVICES SECTIONS */}
        <div className="space-y-28">
          {services.map((service, index) => (
            <div key={service.title} className="px-6 md:px-12 lg:px-20">
              <div
                className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* TEXT */}
                <div className="md:w-1/2">
                  <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* IMAGE */}
                <div className="md:w-1/2 flex justify-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={420}
                    height={420}
                    className="w-full max-w-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;
