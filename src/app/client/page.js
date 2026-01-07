"use client";
import React from "react";

const supportedBy = [
  "Microsoft for Startups",
  "Startup India",
  "MSME",
  "Startup Bihar",
  "DPIIT"
];

const brands = [
  { name: "KSHITIJ", sub: "IIT Kharagpur", logo: "/Client/Screenshot 2026-01-06 220818.png" },
  { name: "Sudha", sub: "Exclusive Show Room", logo: "/Client/Screenshot 2026-01-06 220844.png" },
  { name: "EDII", sub: "Ahmedabad", logo: "/Client/Screenshot 2026-01-06 220849.png" },
  { name: "TiE BANGALORE", sub: "Accelerating Growth Together", logo: "/Client/Screenshot 2026-01-06 220856.png" },
  { name: "Raj Fresh", sub: "Milk & Milk Products", logo: "/Client/Screenshot 2026-01-06 220904.png" },
  { name: "CrAdLE", sub: "Mentor • Nurture • Grow", logo: "/Client/Screenshot 2026-01-06 220911.png" },
  { name: "BEVARC", sub: "E-Commerce & Construction", logo: "/Client/Screenshot 2026-01-06 220919.png" },
  { name: "Aspire", sub: "Harvard Business School", logo: "/Client/Screenshot 2026-01-06 220925.png" },
  { name: "Snowball", sub: "IceCream", logo: "/Client/Screenshot 2026-01-06 220931.png" },
  { name: "Delaso", sub: "Enjoy Delicious Moments", logo: "/Client/Screenshot 2026-01-06 220937.png" }
];

function ClientPage() {
  return (
    <div className="min-h-screen bg-[#8B0000] text-white">
      {/* Header Section */}
      <div className="bg-white py-4 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="text-red-800 text-xs font-bold tracking-widest mb-2 text-center uppercase">
            D2D YouthStory Media Pvt. Ltd. Supported By:
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            {supportedBy.map((partner, index) => (
              <span key={index} className="text-gray-600 font-bold text-sm sm:text-base border border-gray-200 px-3 py-1 rounded-md shadow-sm">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Logo Area */}
        <div className="flex justify-center mb-16">
          <div className="border-4 border-white p-4 inline-block">
            <div className="flex items-center gap-2">
              <span className="bg-white text-[#8B0000] font-bold text-4xl px-2">d2d</span>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-3xl tracking-wide">SOCIAL</span>
                <span className="font-bold text-3xl tracking-wide">STUDIO</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-center text-3xl md:text-5xl font-bold mb-16 uppercase tracking-wider drop-shadow-md">
          Brands We Worked With
        </h1>

        {/* Reference Image */}
        <div className="flex justify-center mb-16">
          <img
            src="/images/clients-reference.png"
            alt="Brands We Worked With"
            className="max-w-full h-auto rounded-lg shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* Brands Grid */}
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {brands.map((brand, idx) => (
              <div key={idx} className={`flex flex-col items-center justify-center p-4 text-center w-full h-32 rounded-lg transition-transform hover:scale-105 ${brand.logo ? 'bg-transparent' : (brand.bg || 'bg-gray-50')}`}>
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-24 max-w-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                ) : null}

                {/* Fallback Text (Hidden if logo loads successfully, shown if no logo or error) */}
                <div style={{ display: brand.logo ? 'none' : 'flex' }} className="flex-col items-center">
                  <h3 className={`text-xl font-black ${brand.color || 'text-gray-800'}`}>
                    {brand.name}
                  </h3>
                  {brand.sub && (
                    <p className="text-gray-500 text-[10px] mt-1 font-medium uppercase tracking-wide">
                      {brand.sub}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t-2 border-dashed border-white/50"></div>

        {/* Quote Section */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <svg className="w-16 h-16 text-white/90" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21L14.017 18C14.017 16.896 14.321 15.925 14.927 15.086C15.533 14.248 16.291 14.037 17.2 13.568L17.2 13.09C15.485 13.064 14.629 11.838 15.228 9.537L16.225 9.537C17.067 9.537 17.848 9.873 18.57 10.544C19.292 11.216 19.654 11.974 19.654 12.822L19.654 21L14.017 21ZM5 21L5 18C5 16.896 5.304 15.925 5.91 15.086C6.516 14.248 7.275 14.037 8.183 13.568L8.183 13.09C6.468 13.064 5.612 11.838 6.212 9.537L7.208 9.537C8.049 9.537 8.831 9.873 9.553 10.544C10.275 11.216 10.636 11.974 10.636 12.822L10.636 21L5 21Z" />
            </svg>
          </div>

          <p className="text-xl md:text-2xl font-light leading-relaxed italic">
            In the noisy digital era, <span className="text-yellow-300 font-bold not-italic">attention is the only currency that matters</span>.
            Most businesses are still renting attention- paying for temporary visibility that vanishes when the budget runs out.
          </p>

          <p className="text-xl md:text-2xl font-light leading-relaxed">
            At d2d Social Studio, we don't help you rent attention. <span className="text-yellow-300 font-bold">We engineer the systems that allow you to own it.</span>
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mt-8 text-yellow-300">
            We are a Growth Partner obsessed with outcomes.
          </h2>
        </div>

        {/* Bottom Divider */}
        <div className="mt-16 border-t-2 border-dashed border-white/50"></div>

      </div>
    </div>
  );
}

export default ClientPage;
