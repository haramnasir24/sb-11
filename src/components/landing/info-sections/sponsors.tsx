import Image from "next/image";
import React from "react";

const SPONSORS = [
  { name: "Ranchers", logo: "/images/icons/ranchers.png" },
  { name: "crumble", logo: "/images/icons/crumble.png" },
  { name: "haval", logo: "/images/icons/haval.png" },
  { name: "AEO", logo: "/images/icons/aeo.png" },
  { name: "catkin", logo: "/images/icons/catkin.png" },
  { name: "nurture", logo: "/images/icons/nurture.png" },
];

const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="bg-gradient-to-br from-[#03071E] via-[#3C096C] to-[#8f65b1] py-10 md:py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-xl font-bold text-white md:text-3xl">
          Our <span className="text-yellow-500">Sponsors</span>
        </h2>
        <div className="grid grid-cols-2 justify-center gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {SPONSORS.map((sponsor, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={250}
                height={250}
                // className="h-16 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
