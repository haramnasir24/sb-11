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
    image: "/images/gallery/image4.jpg",
  },
  {
    id: 2,
    image: "/images/gallery/image3.jpg",
  },
  {
    id: 3,
    image: "/images/gallery/image2.jpg",
  },
  {
    id: 4,
    image: "/images/gallery/image1.jpg",
  },
  {
    id: 5,
    image: "/images/gallery/image6.jpg",
  },
  {
    id: 6,
    image: "/images/gallery/image5.jpg",
  },
];

export default function PastEvents() {
  return (
    <section
      id="past-events"
      className="from-primary to-primary-foreground bg-gradient-to-br py-10 md:py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-secondary mb-8 text-center text-xl font-bold md:text-3xl">
          Past Events <span className="text-yellow-400">(Gallery)</span>
        </h2>
        <Carousel>
          <CarouselContent className="-ml-1">
            {CAROUSEL_ITEMS.map(({ id, image }) => (
              <CarouselItem key={id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
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
          <CarouselPrevious className="bg-white/70 text-gray-800 hover:bg-white/90" />
          <CarouselNext className="bg-white/70 text-gray-800 hover:bg-white/90" />
        </Carousel>
      </div>
    </section>
  );
}
