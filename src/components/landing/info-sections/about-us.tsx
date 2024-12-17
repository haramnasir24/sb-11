import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-t from-[#03071E] to-[#24114A] py-10 md:py-16"
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
        <h2 className="mb-4 text-center text-xl font-bold text-[#D8B4F8] md:mb-8 md:text-3xl">
          What is Science Bee?
        </h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Text Box with Purple Glow */}
          <Card
            className="relative border-none shadow-2xl"
            style={{
              backgroundColor: "#24114A", // Solid background
              boxShadow: "0 0 20px 6px rgba(216, 180, 248, 0.6)", // Purple glow
              borderRadius: "12px",
            }}
          >
            <CardContent className="p-6">
              <h3 className="mb-4 text-base font-bold text-yellow-400 md:text-2xl">
                About the event
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[#E0E0E0] md:text-lg">
                <span className="font-semibold text-[#D8B4F8]">
                  NUST Science Society&nbsp;
                </span>
                proudly presents the crown jewel of its yearly tenure:&nbsp;
                <span className="font-semibold text-[#D8B4F8]">
                  Science Bee
                </span>
                . This momentous event transforms the campus into a vibrant
                celebration of science and technology.
              </p>
              <p className="mb-4 text-sm leading-relaxed text-[#E0E0E0] md:text-lg">
                Featuring&nbsp;
                <span className="font-semibold text-[#D8B4F8]">
                  11 mind-bending modules
                </span>
                , Science Bee pushes participants to their mental and physical
                limits. But it's more than just a competition - it's an
                immersive experience including panel talks, a STEM Expo, and
                interactive puzzle-based games.
              </p>
              <p className="text-sm leading-relaxed text-[#E0E0E0] md:text-lg">
                Don't miss out on the trademark&nbsp;
                <span className="font-semibold text-[#D8B4F8]">
                  Buzz Night&nbsp;
                </span>
                for destressing and the&nbsp;
                <span className="font-semibold text-[#D8B4F8]">
                  Theme Dinner&nbsp;
                </span>
                for networking. Science Bee promises an unforgettable journey of
                learning, challenge, and beautiful memories.
              </p>
            </CardContent>
          </Card>

          {/* Image with Hover Effect */}
          <div
            className="relative h-[350px] overflow-hidden rounded-lg shadow-2xl md:h-[400px]"
            style={{
              boxShadow: "0px 0px 20px 5px #D8B4F8",
            }}
          >
            <Image
              src="/images/about.JPG"
              alt="Science Bee Event"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Bottom Glowing Line */}
      <div
        className="absolute bottom-0 left-0 h-[4px] w-full"
        style={{
          background:
            "linear-gradient(to right, rgba(216, 180, 248, 0.8), rgba(216, 180, 248, 0.2), rgba(216, 180, 248, 0.8))",
          boxShadow: "0 0 8px 4px rgba(216, 180, 248, 0.6)",
        }}
      ></div>
    </section>
  );
}
