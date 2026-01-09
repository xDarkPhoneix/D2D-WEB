'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';

const offices = [
  {
    id: 'blr',
    name: 'BLR',
    city: 'Bangalore',
    address: 'No. 9, 100 ft. Road, 17th A Main Road, 2nd & 3rd Floor, above Nature\'s Basket, 5th Block, Koramangala, Bengaluru, Karnataka 560095',
    mapImage: '/bangalore-map.png'
  },
  {
    id: 'bom',
    name: 'BOM',
    city: 'Mumbai',
    address: 'Modi House, 2nd Floor, Off Link Rd, Near Fun Republic, Andheri West, Mumbai, Maharashtra 400053',
    mapImage: '/mumbai-map.png'
  },
  {
    id: 'del',
    name: 'DEL',
    city: 'Delhi',
    address: 'D2D YouthStory 1st Floor AIHP Milestone Plot No: 448 - 451 Rao Gajraj Singh Marg, Udyog Vihar Phase V, Udyog Vihar, Gurugram, Haryana 122016',
    mapImage: '/delhi-map.png'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    city: 'Dubai',
    address: 'Office 105, Building 1 - Dubai Media City - Dubai - United Arab Emirates',
    mapImage: '/dubai-map.png'
  }
];

export default function ContactPage() {
  const [selectedOffice, setSelectedOffice] = useState('blr');

  const activeOffice = offices.find(office => office.id === selectedOffice) || offices[0];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Map Container with Overlay */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Map Background - Changes based on selected office */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url('${activeOffice.mapImage}')` }}
        />

        {/* Form Overlay Card - Left Side */}
        <div className="absolute left-0 top-0 bottom-0 w-full max-w-[600px] flex items-center p-8 z-10">
          <div className="bg-black p-10 w-full shadow-2xl animate-slide-in-left border-l-4 border-[#F8D200]">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Aapke Ek Ek Sawal<br />
              Humaare Do Do Jawab
            </h1>

            <p className="text-base font-bold text-white mb-4">D2D YouthStory</p>

            <p className="text-sm leading-relaxed text-white/90 mb-8">
              One of the leading platforms celebrating young changemakers and social impact leaders.
              Write to us about any queries - we'd be glad to discuss your story or collaboration opportunities
              through our youth empowerment programs.
            </p>

            <ContactForm />

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <strong className="text-xs text-white/80 font-bold uppercase tracking-wide">Business Enquiries</strong>
                <a
                  href="mailto:hello@youthstory.in"
                  className="text-sm text-white font-semibold hover:text-white/80 transition-colors"
                >
                  hello@youthstory.in
                </a>
              </div>
              <div className="flex flex-col gap-1">
                <strong className="text-xs text-white/80 font-bold uppercase tracking-wide">Career Opportunities</strong>
                <a
                  href="mailto:careers@youthstory.in"
                  className="text-sm text-white font-semibold hover:text-white/80 transition-colors"
                >
                  careers@youthstory.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location Markers - Right Side */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-10">
          {offices.map((office, index) => (
            <button
              key={office.id}
              onClick={() => setSelectedOffice(office.id)}
              className={`w-[70px] h-[70px] rounded-full flex items-center justify-center text-sm font-bold
                transition-all duration-300 border-4 border-white shadow-lg
                ${selectedOffice === office.id
                  ? 'bg-[#F8D200] text-black scale-110 shadow-2xl'
                  : 'bg-white text-black hover:scale-105 hover:bg-[#F8D200]'
                }`}
            >
              {office.name}
            </button>
          ))}
        </div>

        {/* Address Card Overlay - Positioned next to selected button */}
        <div
          className="absolute right-[140px] z-20 animate-fade-in transition-all duration-500"
          style={{
            top: `calc(50% - ${(2 - offices.findIndex(o => o.id === selectedOffice)) * 96}px - 60px)`
          }}
        >
          <div className="bg-black text-white p-6 min-w-[350px] max-w-[450px] shadow-2xl border-2 border-[#F8D200]">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold">{activeOffice.city}</h3>
              <div className="w-12 h-12 rounded-full bg-[#F8D200] border-2 border-[#F8D200] flex items-center justify-center text-black font-bold text-sm shadow-lg">
                {activeOffice.name}
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/95">
              {activeOffice.address}
            </p>
          </div>
        </div>
      </section>

      {/* Office Addresses Section Below */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-gray-50 p-8 rounded-xl border-l-4 border-[#F8D200] hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-lg"
            >
              <h3 className="text-2xl font-bold text-black mb-4">{office.name}</h3>
              <p className="text-base leading-relaxed text-gray-700">{office.address}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Message */}
      <section className="gradient-yellow py-10 px-8 text-center">
        <p className="text-black text-lg leading-relaxed max-w-3xl mx-auto font-semibold">
          🎉 Congratulations for traveling from start to the end of this page! We'll add 10,000 steps to your fitness tracker!
        </p>
      </section>
    </main>
  );
}