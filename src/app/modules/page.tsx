"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { modules } from "@/constant/modules";

export default function ModulesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD]">
      <main className="container mx-auto px-6 py-20">
        <h1 className="shadow-text mb-8 mt-10 text-center text-4xl font-bold text-yellow-accent">
          Science Bee Modules
        </h1>
        <div className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <Link href={`/modules/${module.slug}`} key={module.slug}>
              <div
                className={`flex h-full transform flex-col justify-between rounded-xl border border-yellow-accent border-opacity-30 bg-gradient-to-br from-purple-light to-purple-dark p-6 shadow-lg backdrop-blur-lg transition-all duration-500 ease-in-out hover:rotate-1 hover:scale-105 hover:from-purple-dark hover:to-purple-light ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div>
                  <h2 className="mb-3 text-2xl font-semibold text-yellow-bright">
                    {module.name}
                  </h2>
                  <p className="text-gray-200">{module.description}</p>
                </div>
                <div className="mt-4 flex justify-end">
                  <span className="inline-block rounded-full bg-yellow-accent px-3 py-1 text-sm font-semibold text-purple-deep">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
