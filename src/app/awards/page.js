"use client"
import { useEffect, useRef, useState } from "react";
import { Award, Trophy, Star, Target } from "lucide-react";

const awardsData = [
  {
    id: 1,
    icon: "trophy",
    name: "Agency of the Year",
    organization: "Creative Excellence Awards",
    year: "2024",
    description: "Best integrated digital campaign",
  },
  {
    id: 2,
    icon: "star",
    name: "Gold Lion",
    organization: "Cannes Lions",
    year: "2023",
    description: "Outstanding brand transformation",
  },
  {
    id: 3,
    icon: "award",
    name: "Best Social Campaign",
    organization: "Digital Impact Awards",
    year: "2024",
    description: "Most engaging social media presence",
  },
  {
    id: 4,
    icon: "target",
    name: "Innovation Award",
    organization: "Marketing Week",
    year: "2023",
    description: "Revolutionary content strategy",
  },
  {
    id: 5,
    icon: "trophy",
    name: "People's Choice",
    organization: "AdFest Asia",
    year: "2024",
    description: "Most memorable brand experience",
  },
  {
    id: 6,
    icon: "star",
    name: "Excellence in Design",
    organization: "AWWWARDS",
    year: "2023",
    description: "Superior user experience design",
  },
];

const iconMap = {
  trophy: Trophy,
  star: Star,
  award: Award,
  target: Target,
};

function AwardsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white py-20 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <div
              className={`sticky top-32 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-4 block">
                Recognition
              </span>
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Awards That{" "}
                <span className="relative inline-block">
                  Speak
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-yellow-300 -z-10"></span>
                </span>{" "}
                for Themselves
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Recognition from industry leaders who understand what it takes
                to create work that matters.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {awardsData.map((award, index) => {
                const IconComponent = iconMap[award.icon];
                return (
                  <AwardCard
                    key={award.id}
                    award={award}
                    icon={IconComponent}
                    index={index}
                    isVisible={isVisible}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AwardCard({ award, icon: Icon, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group relative bg-white rounded-2xl p-8 border border-gray-200
        transition-all duration-700 hover:border-yellow-300 hover:shadow-xl
        hover:-translate-y-1 cursor-default ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      style={{
        transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-yellow-50 to-transparent
          rounded-2xl transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
      ></div>

      <div className="relative z-10">
        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14
            rounded-xl bg-gray-900 text-yellow-300 mb-6
            transition-all duration-500 ${
              isHovered ? "scale-110 rotate-6 shadow-lg" : "scale-100 rotate-0"
            }`}
        >
          <Icon size={28} strokeWidth={1.5} />
        </div>

        {/* Year */}
        <div className="absolute top-0 right-0">
          <span
            className={`inline-block px-3 py-1 text-xs font-bold tracking-wider
              bg-gray-900 text-white rounded-full transition-all duration-300 ${
                isHovered ? "bg-yellow-400 text-gray-900" : ""
              }`}
          >
            {award.year}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {award.name}
        </h3>

        <p className="text-sm font-medium text-gray-500 mb-3 tracking-wide">
          {award.organization}
        </p>

        <div
          className={`h-0.5 bg-yellow-400 transition-all duration-500 mb-4 ${
            isHovered ? "w-16" : "w-8"
          }`}
        ></div>

        <p className="text-sm text-gray-600 leading-relaxed">
          {award.description}
        </p>
      </div>

      {/* Corner accent */}
      <div
        className={`absolute bottom-0 right-0 w-20 h-20 bg-yellow-300
          rounded-tl-full transition-all duration-500 ${
            isHovered ? "opacity-10 scale-150" : "opacity-0 scale-100"
          }`}
      ></div>
    </div>
  );
}

export default AwardsSection;
