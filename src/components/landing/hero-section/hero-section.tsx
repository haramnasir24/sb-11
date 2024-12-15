"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CountdownTimer } from "./countdown-timer";

export default function HeroSection() {
  const [targetDate] = useState(new Date("2025-02-07T00:00:00"));

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Image
        src="/images/hero-section.JPG"
        alt="Science Bee Background"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD] opacity-80" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
        <h2 className="mb-2 text-xl font-medium text-yellow-400">Welcome to</h2>
        <h1 className="mb-8 text-4xl font-bold text-white sm:text-xl md:text-5xl lg:text-7xl">
          Science Bee Gyara
        </h1>

        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-yellow-400"
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
            <span className="text-white">NUST, H-12, ISLAMABAD</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-yellow-400"
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
            <span className="text-white">7th - 9th February 2025</span>
          </div>
        </div>

        <p className="mb-12 max-w-2xl text-sm font-medium text-yellow-400 md:text-lg">
          3 Days of Innovation: 11 Modules, Stem Exhibitions, BUZZ Night, NUST
          Got Talent, and Beyond!
        </p>

        <Link
          href="/register"
          className="inline-block rounded bg-yellow-500 px-4 py-2 text-base text-black hover:bg-yellow-600"
        >
          REGISTER NOW
        </Link>

        <div className="mt-24">
          <CountdownTimer targetDate={targetDate} />
        </div>
      </div>
    </div>
  );
}
