"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";

import { CountdownTimer } from "./countdown-timer";

export default function HeroSection() {
  const [targetDate] = useState(new Date("2025-02-07T00:00:00"));
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setShowBanner(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        // repeatDelay={1}
        className="absolute top-[60%] z-10 skew-y-12 overflow-clip"
      />
      <Image
        src="/images/hero-section.JPG"
        alt="Science Bee Background"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD] opacity-80" />

      {/* Breaking News Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 px-4 py-3 text-white shadow-lg"
          >
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center md:space-x-2">
                <svg
                  className="h-6 w-6 animate-pulse text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
                {/* <p className="text-lg font-bold md:text-xl">Breaking News:</p> */}
              </div>
              <p className="text-base font-semibold md:text-xl">
                EARLY BIRD REGISTRATIONS ARE OPEN!
              </p>
              <button
                onClick={() => setShowBanner(false)}
                className="rounded-full bg-white bg-opacity-20 p-1 hover:bg-opacity-30 focus:outline-none"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-44 text-center md:py-52">
        <h2 className="mb-4 text-2xl font-medium text-yellow-400 md:text-3xl">
          Welcome to
        </h2>
        <h1 className="mb-12 text-5xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Science Bee Gyara
        </h1>

        <div className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-yellow-400 md:h-8 md:w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-lg text-white md:text-xl">
              NUST, H-12, ISLAMABAD
            </span>
          </div>
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-yellow-400 md:h-8 md:w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-lg text-white md:text-xl">
              7th - 9th February 2025
            </span>
          </div>
        </div>

        <p className="mb-16 max-w-3xl text-lg font-medium text-yellow-400 md:text-2xl">
          3 Days of Innovation: 11 Modules, Tech Connect, BUZZ Night, Bees Got
          Talent, and Beyond!
        </p>

        <Link
          href="/register"
          className="inline-block rounded bg-yellow-500 px-6 py-3 text-lg text-black transition-colors hover:bg-yellow-600 md:text-xl"
        >
          REGISTER NOW
        </Link>

        <div className="mt-32">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
}
