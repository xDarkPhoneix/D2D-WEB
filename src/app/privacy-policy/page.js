import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#D4AF37] selection:text-black">

      {/* Cinematic Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/5 rounded-full blur-[150px] animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32">

        {/* Header */}
        <header className="mb-24 text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold">Legal Documentation</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FIMD37] via-[#D4AF37] to-[#aa8c2c]">Policy</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-8">
            At <span className="text-[#D4AF37]">D2D Social Studio</span>, transparency is our currency. We respect your privacy and are committed to protecting the digital footprint you share with us.
          </p>
        </header>

        {/* Introduction Block */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24">
          <div className="lg:col-span-8 bg-neutral-900/30 backdrop-blur-xl border border-white/10 p-10 rounded-3xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h2 className="text-3xl font-bold text-white mb-6 relative z-10">Our Commitment</h2>
            <p className="text-lg text-gray-400 leading-relaxed relative z-10">
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website. As a "Marketing Mafia," we operate with a code of honor—your data is strictly for business, never for betrayal.
            </p>
          </div>
          <div className="lg:col-span-4 bg-[#D4AF37] p-10 rounded-3xl flex flex-col justify-between text-black relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div>
              <svg className="w-10 h-10 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-bold tracking-tight">Data Secure</h3>
            </div>
            <p className="font-medium opacity-80">Your information is guarded with industry-standard protocols.</p>
          </div>
        </div>

        {/* Content Flow */}
        <div className="space-y-6">

          {[
            {
              title: "Information We Collect",
              content: "We may collect personal information such as your name, email address, or phone number only when you choose to share it, for example through contact forms. We also collect non-personal info like browser type and IP address to optimize your experience."
            },
            {
              title: "How We Use Information",
              content: "To operate and improve our services. Your data helps us communicate with you and refine our digital strategies. We never sell your data—that's not our style."
            },
            {
              title: "Data Protection",
              content: "We employ robust technical measures to prevent unauthorized access. Limiting access to authorized personnel only is our standard operating procedure."
            },
            {
              title: "Data Retention",
              content: "We keep your info only as long as necessary. Once the job is done or the legal requirement met, we securely delete or anonymize it."
            }
          ].map((section, idx) => (
            <section key={idx} className="group relative">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#D4AF37]/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
              <div className="relative bg-[#0a0a0a] border border-white/10 p-8 md:p-10 rounded-2xl hover:bg-neutral-900 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </section>
          ))}

          {/* Children's Privacy */}
          <section className="bg-neutral-900/30 border border-white/5 p-8 md:p-10 rounded-2xl mt-12">
            <h2 className="text-xl font-bold text-white mb-4">Children's Privacy</h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              D2D Social Studio does not knowingly collect personal information from children under 13. If we find any, we delete it immediately.
            </p>
          </section>

          {/* GDPR */}
          <section className="py-12">
            <h2 className="text-2xl font-bold text-white mb-8">Your Data Rights (GDPR)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Access your personal data',
                'Request data correction',
                'Request data deletion',
                'Restrict processing',
                'Data portability',
                'Withdraw consent'
              ].map((right, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-[#D4AF37]">•</span>
                  <span className="text-gray-300">{right}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Contact / Footer */}
        <footer className="mt-32 border-t border-white/10 pt-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Your Consent</h2>
          <p className="text-gray-500 mb-12">
            By using <span className="text-white">D2D YouthStory</span>, you agree to these terms.
          </p>

          <a href="mailto:abc@gmail.com" className="inline-block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#FIMD37] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <div className="relative bg-black border border-[#D4AF37]/30 px-8 py-4 rounded-full flex items-center gap-3">
              <span className="text-white font-bold tracking-wider">CONTACT US</span>
              <svg className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-gray-600 uppercase tracking-widest border-t border-white/5 pt-8">
            <div>© 2026 D2D Social Studio</div>
            <div><span className="text-[#D4AF37]">abc@gmail.com</span></div>
            <div className="space-x-4">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default PrivacyPolicy;
