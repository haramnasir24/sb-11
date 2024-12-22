import React from "react";

import SocialCard from "./social-card";

const SOCIALS_ITEMS = [
  {
    title: "Buzz Night",
    image: "/images/socials/buzz-night.jpg",
    content:
      "The modules here at Science Bee will surely leave your mind swarmed with possible solutions and answers but it's the Buzz Night that will leave you humming for more! Prepare to be stunned by a magnetic rave and an energetic crowd amongst the glittering night lights.",
  },
  {
    title: "Tech Connect",
    image: "/images/socials/tc3.jpg",
    content:
      "TechConnect will be a platform for students and groups from NUST to showcase their STEM-based projects and startup ideas to a panel of esteemed judges and industry experts. The event aims to provide SBXI participants with opportunities to connect with potential investors, pitch their solutions, receive valuable feedback, and secure funding to advance their initiatives.",
  },
  {
    title: "Bees Got Talent",
    image: "/images/socials/bgt.jpg",
    content:
      "Bees Got Talent (BGT) will showcase a variety of imaginative projects, prototypes, and inventions by amateur innovators and enthusiasts from NUST and other universities, fostering creativity and fresh ideas. The event provides participants with a platform to exhibit their innovations in a collaborative environment, where judges offer feedback and recognition for their efforts.",
  },
];

const Socials = () => {
  return (
    <section
      id="socials"
      className="from-primary to-primary-foreground bg-gradient-to-br py-10 md:py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-secondary mb-8 text-center text-xl font-bold md:text-3xl">
          What happens in Science Bee
        </h2>
        <div className="rounded-lg bg-gradient-to-br from-[#03071E] via-[#3C096C] to-[#8f65b1] p-8 shadow-lg">
          <h3 className="mb-6 text-center text-base font-bold text-yellow-400 md:text-2xl">
            Socials
          </h3>
          <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOCIALS_ITEMS.map((item, index) => (
              <SocialCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Socials;
