"use client";

export default function JobDetailsModal({ onClose }) {
  return (
    <>
      {/* BLUR BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 relative shadow-xl">

          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl font-bold"
          >
            ×
          </button>

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-1">
            Associate Brand Solutions Manager
          </h1>
          <p className="text-gray-600 mb-6">
            Permanent • Brand Solutions
          </p>

          {/* ABOUT */}
          <h2 className="text-xl font-semibold mb-2">
            About Social Panga
          </h2>
          <p className="text-gray-700 mb-6">
            Social Panga is a creative digital marketing agency that specializes
            in crafting innovative and impactful campaigns for brands. We believe
            in the power of storytelling, data-driven strategies, and creative
            excellence to deliver results that matter.
          </p>

          {/* POSITION OVERVIEW */}
          <h2 className="text-xl font-semibold mb-2">
            Position Overview
          </h2>
          <p className="text-gray-700 mb-6">
            We are seeking an enthusiastic Associate Brand Solutions Manager to
            support our brand solutions team in executing client campaigns and
            managing day-to-day content requirements.
          </p>

          {/* RESPONSIBILITIES */}
          <h2 className="text-xl font-semibold mb-2">
            Key Responsibilities
          </h2>
          <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700">
            <li>Execute content plans across social platforms</li>
            <li>Ideate and develop campaign content</li>
            <li>Research trends and audience insights</li>
            <li>Client communication and coordination</li>
            <li>Cross-team collaboration</li>
          </ul>

          {/* APPLY */}
          <h2 className="text-2xl font-bold mb-4">
            Apply for the Job
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input placeholder="First Name *" className="border-b p-2 outline-none" />
            <input placeholder="Last Name *" className="border-b p-2 outline-none" />
            <input placeholder="Email *" className="border-b p-2 outline-none" />
            <input placeholder="Mobile *" className="border-b p-2 outline-none" />
            <input placeholder="LinkedIn ID" className="border-b p-2 outline-none" />
            <input placeholder="Portfolio Link" className="border-b p-2 outline-none" />
          </form>

          <button className="mt-8 bg-[#e1bb08] px-10 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
            APPLY NOW
          </button>

        </div>
      </div>
    </>
  );
}