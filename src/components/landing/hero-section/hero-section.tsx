"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CountdownTimer } from "./countdown-timer";

export default function HeroSection() {
  const [targetDate] = useState(new Date("2025-02-07T00:00:00"));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image (Bottom Layer) */}
      <Image
        src="/images/hero-section.JPG"
        alt="Science Bee Background"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        priority
      />

      {/* Rich Gradient Overlay (Middle Layer) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(36, 17, 74, 0.9))",
        }}
      />

      {/* Hexagon SVG with Glow Effect */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-70">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/images/hexagon.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))", // Glow effect
          }}
        />
      </div>

      {/* Diagonal Purple Glowing Lines on the Right */}
      <div className="absolute right-10 top-0 z-20 flex flex-col items-end justify-start gap-1 opacity-80">
        <div
          className="h-[350px] w-[4px] bg-purple-500"
          style={{
            transform: "rotate(45deg)",
            filter: "drop-shadow(0 0 15px rgba(128, 0, 128, 0.8))", // Purple glow effect
          }}
        />
        <div
          className="h-[350px] w-[4px] bg-purple-500"
          style={{
            transform: "rotate(45deg)",
            filter: "drop-shadow(0 0 15px rgba(128, 0, 128, 0.8))", // Purple glow effect
          }}
        />
      </div>

      {/* Diagonal Purple Glowing Lines on the Left */}
      <div className="absolute left-10 top-0 z-20 flex flex-col items-start justify-start gap-1 opacity-80">
        <div
          className="h-[350px] w-[4px] bg-purple-500"
          style={{
            transform: "rotate(-45deg)",
            filter: "drop-shadow(0 0 15px rgba(128, 0, 128, 0.8))", // Purple glow effect
          }}
        />
        <div
          className="h-[350px] w-[4px] bg-purple-500"
          style={{
            transform: "rotate(-45deg)",
            filter: "drop-shadow(0 0 15px rgba(128, 0, 128, 0.8))", // Purple glow effect
          }}
        />
      </div>

      {/* Content (Topmost Layer) */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <h2 className="mb-4 text-lg font-semibold tracking-wide text-yellow-400">
          Welcome to
        </h2>
        <h1 className="mb-8 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Science Bee Gyara
        </h1>

        <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
          {/* Location */}
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-yellow-400"
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
            <span className="text-lg font-medium text-white">
              NUST, H-12, ISLAMABAD
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-yellow-400"
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
            <span className="text-lg font-medium text-white">
              7th - 9th February 2025
            </span>
          </div>
        </div>

        {/* Event Description */}
        <p className="mb-12 max-w-2xl text-base font-medium text-yellow-300 md:text-lg">
          3 Days of Innovation: 11 Modules, Stem Exhibitions, BUZZ Night, NUST
          Got Talent, and Beyond!
        </p>

        {/* Register Button */}
        <Link
          href="/register"
          className="inline-block transform rounded bg-yellow-500 px-6 py-3 text-base font-semibold text-black shadow-lg transition-transform hover:scale-105 hover:bg-yellow-600"
        >
          REGISTER NOW
        </Link>

        {/* Countdown Timer */}
        <div className="mt-24">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
}
