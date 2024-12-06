import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="from-primary to-primary-foreground bg-gradient-to-br py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-secondary mb-8 text-center text-4xl font-bold">
          About Science Bee
        </h2>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <Card className="bg-primary-foreground/10 border-none shadow-xl">
            <CardContent className="p-6">
              <p className="text-primary-foreground mb-4 text-lg leading-relaxed">
                <span className="text-secondary font-semibold">
                  NUST Science Society
                </span>
                proudly presents the crown jewel of its yearly tenure:{" "}
                <span className="text-secondary font-semibold">
                  Science Bee
                </span>
                . This momentous event transforms the campus into a vibrant
                celebration of science and technology.
              </p>
              <p className="text-primary-foreground mb-4 text-lg leading-relaxed">
                Featuring
                <span className="text-secondary font-semibold">
                  12 mind-bending modules
                </span>
                , Science Bee pushes participants to their mental and physical
                limits. But it's more than just a competition - it's an
                immersive experience including panel talks, a STEM Expo, and
                interactive puzzle-based games.
              </p>
              <p className="text-primary-foreground text-lg leading-relaxed">
                Don't miss out on the trademark
                <span className="text-secondary font-semibold">Buzz Night</span>
                for destressing and the
                <span className="text-secondary font-semibold">
                  Theme Dinner
                </span>
                for networking. Science Bee promises an unforgettable journey of
                learning, challenge, and beautiful memories.
              </p>
            </CardContent>
          </Card>
          <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/about.JPG"
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
