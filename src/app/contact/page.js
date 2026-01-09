'use client';

import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Map Container with Overlay */}
      <section className="relative min-h-screen overflow-hidden flex flex-col lg:flex-row">
        {/* Map Background - Google Map Embed */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://maps.google.com/maps?q=25.612682342529297,85.1416244506836&z=17&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(0%)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          ></iframe>
          {/* Overlay to make text readable/pop if needed, though card has its own bg */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
        </div>

        {/* Form Overlay Card - Left Side */}
        <div className="relative z-10 w-full lg:w-1/2 p-4 lg:p-12 flex items-center justify-center lg:justify-start">
          <div className="bg-black p-8 lg:p-10 w-full max-w-[600px] shadow-2xl animate-slide-in-left border-l-4 border-[#F8D200]">
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

        {/* Address Details - Right Side (Static now) */}
        <div className="relative z-10 w-full lg:w-1/2 p-4 lg:p-12 flex items-center justify-center lg:justify-end">
          <div className="bg-black/95 backdrop-blur-sm text-white p-8 max-w-[500px] shadow-2xl border-2 border-[#F8D200] animate-fade-in">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-2xl font-bold">Patna Office</h3>
              <div className="w-12 h-12 rounded-full bg-[#F8D200] border-2 border-[#F8D200] flex items-center justify-center text-black font-bold text-sm shadow-lg">
                PAT
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <strong className="text-[#F8D200] uppercase text-xs tracking-wider mb-1 block">Location</strong>
                <p className="text-base leading-relaxed">
                  Bihar State Financial Corporation, Fraser Road,<br />
                  Above ICICI Bank, Old Jakkanpur, Lodipur,<br />
                  Patna, Bihar 800001
                </p>
              </div>

              <div>
                <strong className="text-[#F8D200] uppercase text-xs tracking-wider mb-1 block">Landmark</strong>
                <p className="text-sm leading-relaxed text-white/90">
                  Look for the coffee-coloured 13-floor building with ICICI Bank on the ground floor.
                </p>
              </div>




            </div>
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <section className="gradient-yellow py-10 px-8 text-center bg-[#F8D200]">
        <p className="text-black text-lg leading-relaxed max-w-3xl mx-auto font-semibold">
          🎉 Congratulations for traveling from start to the end of this page! We'll add 10,000 steps to your fitness tracker!
        </p>
      </section>
    </main>
  );
}