import Image from "next/image";
import React from "react";

const SPONSORS = [
  { name: "Sponsor 1", logo: "/images/about.jpg" },
  { name: "Sponsor 2", logo: "/images/about2.jpg" },
  { name: "Sponsor 3", logo: "/images/image1.jpg" },
  { name: "Sponsor 4", logo: "/images/image2.jpg" },
  { name: "Sponsor 5", logo: "/images/image3.jpg" },
];

const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="relative bg-gradient-to-t from-[#24114A] to-[#03071E] py-10 md:py-16"
    >
      {/* Top Glowing Line */}
      <div
        className="absolute left-0 top-0 h-[4px] w-full"
        style={{
          background:
            "linear-gradient(to right, rgba(216, 180, 248, 0.8), rgba(216, 180, 248, 0.2), rgba(216, 180, 248, 0.8))",
          boxShadow: "0 0 8px 4px rgba(216, 180, 248, 0.6)",
        }}
      ></div>
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-xl font-bold text-[#D8B4F8] md:text-3xl">
          Our <span className="text-yellow-400">Sponsors</span>
        </h2>
        <div className="grid grid-cols-2 justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {SPONSORS.map((sponsor, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                className="object-contain"
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Glowing Line */}
      <div
        className="absolute bottom-0 left-0 z-10 h-[4px] w-full"
        style={{
          background:
            "linear-gradient(to right, rgba(216, 180, 248, 0.8), rgba(216, 180, 248, 0.2), rgba(216, 180, 248, 0.8))",
          boxShadow: "0 0 8px 4px rgba(216, 180, 248, 0.6)",
        }}
      ></div>
    </section>
  );
};

export default Sponsors;
