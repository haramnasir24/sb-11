import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// const CAROUSEL_ITEMS = [
//   {
//     id: 1,
//     image: "/about.jpg",
//   },
//   {
//     id: 1,
//     image: "/about2.jpg",
//   },
// ];

export default function PastEvents() {
  return (
    <section
      id="past-events"
      className="from-primary to-primary-foreground bg-gradient-to-br py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-secondary mb-8 text-center text-4xl font-bold">
          Past events
        </h2>

        <Carousel>
          <CarouselContent>
            {/* {CAROUSEL_ITEMS.map(({id, image})=> {
              <CarouselItem> {image} </CarouselItem>

            })} */}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
