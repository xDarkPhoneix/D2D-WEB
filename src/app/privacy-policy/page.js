
import React from "react";



function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-yellow-400 text-black">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 to-black p-4 border-b-4 border-white/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-white text-red-600 font-bold p-2 text-2xl rounded-full w-16 h-16 flex items-center justify-center border-4 border-white shadow-lg">
              d2d
            </div>
            <div className="leading-tight">
              <h2 className="text-xl font-bold tracking-widest text-black">SOCIAL</h2>
              <h2 className="text-xl font-bold tracking-widest text-black">STUDIO</h2>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-xs uppercase tracking-wider mb-2 font-semibold text-black/80">d2d YOUTHSTORY PVT. LTD. supported by:-</p>
            <div className="flex flex-wrap justify-center gap-4 items-center mt-2">
              {[
                { name: "Microsoft for Startups", src: "/supported-by/microsoft.png" },
                { name: "Startup India", src: "/supported-by/startup-india.png" },
                { name: "MSME", src: "/supported-by/msme.png" },
                { name: "Startup Bihar", src: "/supported-by/startup-bihar.png" },
                { name: "DPIIT", src: "/supported-by/dpiit.png" },
                { name: "Startup Bihar Logo", src: "/supported-by/startup-bihar-logo.png" }
              ].map((partner, idx) => (
                <img key={idx} src={partner.src} alt={partner.name} className="h-8 md:h-10 object-contain bg-white rounded px-1" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Intro */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl font-bold text-black mb-8 border-l-8 border-green-500 pl-6">
              <span className="text-green-400">Privacy</span> <span className="text-green-200">Policy:</span>
            </h1>
            <p className="text-lg text-gray-900 leading-relaxed">
              At <span className="font-bold text-black">D2D Social Studio</span>, we respect your privacy and are committed to protecting any information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>
              <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-2xl border border-blue-500/30 shadow-2xl relative z-10 text-center">
                <svg className="w-24 h-24 text-blue-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-2xl font-bold text-blue-200">DATA PRIVACY</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="bg-gray-900/50 p-8 rounded-2xl border-l-4 border-orange-500">
          <h2 className="text-3xl font-bold text-orange-500 mb-6">Information We Collect:</h2>
          <p className="text-gray-900 leading-relaxed mb-4">
            We may collect personal information such as your name, email address, or phone number <span className="text-black font-bold">only when you choose to share it</span>, for example through contact forms or inquiries.
          </p>
          <p className="text-gray-900 leading-relaxed">
            We also collect non-personal information like browser type, device information, IP address, and pages visited to understand how our website is used.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-3xl font-bold text-black mb-6">How We Use Your Information:</h2>
          <p className="text-gray-900 leading-relaxed">
            We use the information we collect to provide, operate, and improve our website and services. Your information helps us respond to your inquiries, communicate with you when necessary, and understand how visitors interact with our website. We use your personal information only for legitimate purposes and <span className="text-black font-bold">do not sell or misuse</span> your data.
          </p>
        </section>

        {/* Data Protection */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-red-500 mb-4">Data Protection And Security-</h2>
            <p className="text-gray-900 leading-relaxed">
              We take reasonable technical and organizational measures to protect your personal information from unauthorized access, misuse, alteration, or loss. This includes using secure servers, limiting access to authorized personnel only, and regularly reviewing our security practices.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-black mb-4">Data Retention</h2>
            <p className="text-gray-900 leading-relaxed">
              We retain your personal information only for as long as it is necessary to fulfill the purposes for which it was collected, such as responding to inquiries, providing services, or complying with legal requirements. When your information is no longer needed, we take reasonable steps to securely delete or anonymize it. We do not keep personal data for longer than required and regularly review our data retention practices.
            </p>
          </div>
        </section>

        {/* Childrens Privacy & GDPR */}
        <section className="space-y-8">
          <div className="bg-white p-8 rounded-2xl border-l-4 border-blue-500">
            <h2 className="text-3xl font-bold text-orange-400 mb-4">Children's Privacy</h2>
            <p className="text-gray-900 leading-relaxed">
              D2D Social Studio does not knowingly collect any personal information from children under the age of 13. We encourage parents and guardians to monitor their children's online activities. If we become aware that personal information from a child has been collected without parental consent, we will take immediate steps to remove such information from our records.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Your Data Protection Rights (GDPR)</h2>
            <p className="text-gray-900 mb-6">You have certain rights under the General Data Protection Regulation (GDPR). These rights are designed to give you control over your personal data.</p>
            <ul className="space-y-4 text-gray-900">
              {['Access the personal information we hold about you', 'Request correction of inaccurate or incomplete data', 'Request deletion of your personal data when it is no longer needed', 'Restrict or object to how we process your data', 'Request data portability, allowing you to receive your data in a usable format', 'Withdraw consent at any time where we rely on your consent'].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-800 p-8 rounded-2xl text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Your Consent</h2>
          <p className="text-black/90 mb-8 italic">
            By using <span className="font-bold">D2D YouthStory</span>, you consent to this Privacy Policy and agree to its terms.
          </p>

          <div className="inline-block bg-white text-orange-600 font-bold px-8 py-3 rounded-full mb-8 shadow-lg">
            CONTACT US
          </div>

          <div className="text-white/90 space-y-2">
            <p>If you have any questions about this Privacy Policy or your data rights, you may contact us at:</p>
            <p className="font-bold">Email: abc@gmail.com</p>
            <p className="font-bold">Website: d2d Social Studio</p>
          </div>
        </section>

      </div>
    </div>
  );
}

export default PrivacyPolicy;

