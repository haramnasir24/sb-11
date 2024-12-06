import Image from "next/image";
import React from "react";

const SPONSORS = [
  { name: "Sponsor 1", logo: "/about.jpg" },
  { name: "Sponsor 2", logo: "/about2.jpg" },
  { name: "Sponsor 3", logo: "/image1.jpg" },
  { name: "Sponsor 4", logo: "/image2.jpg" },
  { name: "Sponsor 5", logo: "/image3.jpg" },
];

const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="bg-gradient-to-br from-gray-100 to-gray-200 py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Our <span className="text-purple-600">Sponsors</span>
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
    </section>
  );
};

export default Sponsors;
