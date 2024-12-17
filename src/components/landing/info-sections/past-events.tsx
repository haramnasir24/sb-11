"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

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
    image: "/images/image2.jpg",
  },
  {
    id: 2,
    image: "/images/image3.jpg",
  },
  {
    id: 3,
    image: "/images/image1.jpg",
  },
  {
    id: 4,
    image: "/images/buzz.jpg",
  },
  {
    id: 5,
    image: "/images/bee.jpg",
  },
  {
    id: 6,
    image: "/images/image1.jpg",
  },
];

export default function PastEvents() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = CAROUSEL_ITEMS.length;

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides); // Infinite loop
    }, 3000); // 3-second interval

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section
      id="past-events"
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
          Past Events <span className="text-yellow-400">(Gallery)</span>
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true, // Infinite loop
          }}
          className="relative"
        >
          <CarouselContent
            className="-ml-1"
            style={{
              transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
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
}
