"use client";

import { useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [bgImage, setBgImage] = useState("");
  const cards = [
    {
      title: "Looking to become the next big name everyone’s talking about",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/infoxbox-ico1.png",
    },
    {
      title: "This is the main content",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/infoxbox-ico2.png",
    },
    {
      title: "This is the main content",
      image:
        "https://socialpanga.com/wp-content/uploads/2021/04/infoxbox-ico3.png",
    },
  ];

  return (
    <>
      <section
        className="pt-28 pb-16 text-black text-center transition-all duration-500"
        style={{
          backgroundColor: bgImage ? "transparent" : "#f8d200",
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          We Are{" "}
          <span
            onMouseEnter={() =>
              setBgImage(
                "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
              )
            }
            onMouseLeave={() => setBgImage("")}
            className="cursor-pointer px-2 transition-colors duration-300 hover:text-white"
          >
            Marketing
          </span>{" "}
          Mafias
        </h1>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Skilled enough to know{" "}
          <span
            onMouseEnter={() =>
              setBgImage(
                "https://images.unsplash.com/photo-1553877522-43269d4ea984"
              )
            }
            onMouseLeave={() => setBgImage("")}
            className="cursor-pointer font-semibold px-1 transition-colors duration-300 hover:text-white"
          >
            better
          </span>
          , wild enough to think bigger!
        </p>
      </section>

      <section className="flex flex-col md:flex-row md:gap-6 gap-40 justify-center items-center m-4 mb-24 bg-white relative overflow-visible">
        {cards.map((card, index) => (
          <div
            key={index}
            className="h-[500px] w-[380px] bg-[#f8d200] rounded-xl relative pb-40 md:pb-0"
          >
            <h2 className="text-2xl font-bold pt-20 text-center">
              {card.title}
            </h2>

            {/* IMAGE COMING OUT FROM BOTTOM */}
            <img
              src={card.image}
              alt={card.title}
              className="
          absolute 
          left-1/2 
          -bottom-24 
          -translate-x-1/2 
          w-64 md:w-96 
          rounded-xl
        "
            />
          </div>
        ))}
      </section>
    </>
  );
}
