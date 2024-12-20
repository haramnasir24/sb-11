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
    title: "STEM Expo",
    image: "/images/socials/stem-expo.jpg",
    content:
      "Revolving around Science, Technology, Engineering, and Mathematics, STEM expo focuses on related innovations in these fields. This momentous event privileges the participants to display their projects whilst having the chance to be scouted by prestigious institutions.",
  },
  {
    title: "Panel Talks",
    image: "/images/image3.jpg",
    content:
      "Science is magic for the underdeveloped. In our age, the rate of innovation has turned inventing into a competition. With this in mind, we're starting the soon to be iconic Scientist's Seminars.",
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
