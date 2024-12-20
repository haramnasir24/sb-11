import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="from-primary to-primary-foreground bg-gradient-to-br py-10 md:py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-secondary mb-4 text-center text-xl font-bold md:mb-8 md:text-3xl">
          What is Science Bee
        </h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Card className="bg-primary-foreground/10 border-none shadow-xl">
            <CardContent className="p-6 text-white">
              <h3 className="mb-4 text-base font-bold text-yellow-400 md:text-2xl">
                About the event
              </h3>
              <p className="text-primary-foreground mb-4 text-sm leading-relaxed md:text-lg">
                <span className="text-secondary font-semibold">
                  NUST Science Society&nbsp;
                </span>
                proudly presents the crown jewel of its yearly tenure:&nbsp;
                <span className="text-secondary font-semibold">
                  Science Bee
                </span>
                . This momentous event transforms the campus into a vibrant
                celebration of science and technology.
              </p>
              <p className="text-primary-foreground mb-4 text-sm leading-relaxed md:text-lg">
                Featuring&nbsp;
                <span className="text-secondary font-semibold">
                  11 mind-bending modules
                </span>
                , Science Bee pushes participants to their mental and physical
                limits. But it's more than just a competition - it's an
                immersive experience including panel talks, a STEM Expo, and
                interactive puzzle-based games.
              </p>
              <p className="text-primary-foreground text-sm leading-relaxed md:text-lg">
                Don't miss out on the trademark&nbsp;
                <span className="text-secondary font-semibold">
                  Buzz Night&nbsp;
                </span>
                for destressing and the&nbsp;
                <span className="text-secondary font-semibold">
                  Theme Dinner&nbsp;
                </span>
                for networking. Science Bee promises an unforgettable journey of
                learning, challenge, and beautiful memories.
              </p>
            </CardContent>
          </Card>
          <div className="relative h-[350px] overflow-hidden rounded-lg shadow-xl md:h-[400px]">
            <Image
              src="/images/about.jpg"
              alt="Science Bee Event"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
