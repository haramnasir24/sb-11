import Image from "next/image";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CAROUSEL_ITEMS = [
  {
    id: 1,
    image: "/image2.jpg",
  },
  {
    id: 2,
    image: "/image3.jpg",
  },
  {
    id: 3,
    image: "/image1.jpg",
  },
  {
    id: 4,
    image: "/buzz.jpg",
  },
  {
    id: 5,
    image: "/bee.jpg",
  },
  {
    id: 6,
    image: "/image1.jpg",
  },
];

export default function PastEvents() {
  return (
    <section
      id="past-events"
      className="from-primary to-primary-foreground bg-gradient-to-br py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-secondary mb-8 text-center text-3xl font-bold">
          Past Events <span className="text-yellow-400">(Gallery)</span>
        </h2>
        <Carousel>
          <CarouselContent className="-ml-1">
            {CAROUSEL_ITEMS.map(({ id, image }) => (
              <CarouselItem key={id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  {/* Adjust the height here */}
                  <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
                    <Image
                      src={image}
                      alt={`Event ${id}`}
                      fill
                      className="rounded-lg object-cover shadow-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
