import {
  ArrowLeft,
  Beaker,
  Brain,
  FlaskRoundIcon as Flask,
  Lightbulb,
  Puzzle,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

import { modules } from "@/constant/modules";

type ModuleProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getModuleImages = (slug: string) => {
  switch (slug) {
    default:
      return ["/images/image1.jpg", "/images/image2.jpg", "/images/image3.jpg"];
  }
};

export default function ModuleDetail({ params }: ModuleProps) {
  const { slug } = use(params);
  const sb_module = modules.find((mod) => mod.slug === slug);

  if (!sb_module) {
    notFound();
  }

  const moduleImages = getModuleImages(slug);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-deep via-purple-dark to-purple-light pb-24 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="bg-yellow-accent/10 absolute left-10 top-20 h-32 w-32 animate-pulse rounded-full blur-xl"></div>
          <div className="bg-purple-light/20 absolute right-20 top-40 h-40 w-40 animate-pulse rounded-full blur-xl delay-300"></div>
          <div className="bg-yellow-bright/10 absolute bottom-20 left-1/4 h-24 w-24 animate-pulse rounded-full blur-xl delay-700"></div>
        </div>
        <div
          className="absolute inset-0 p-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <main className="container relative mx-auto px-6 py-20">
        <Link
          href="/modules"
          className="group mb-8 inline-flex items-center gap-2 text-yellow-accent transition-colors hover:text-yellow-bright"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Modules</span>
        </Link>

        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-3xl"></div>
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-10 shadow-2xl md:p-12">
            <div className="flex flex-col gap-10">
              {/* Header Section */}
              <div className="space-y-4">
                <h1 className="shadow-text mb-6 text-4xl font-bold text-yellow-accent md:text-5xl">
                  {sb_module.name}
                </h1>
                <p className="text-lg leading-relaxed text-gray-200 md:text-xl">
                  {sb_module.description}
                </p>
              </div>

              {/* Module Images */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {moduleImages.map((src, index) => (
                  <div
                    key={index}
                    className="group relative h-48 overflow-hidden rounded-lg md:h-64"
                  >
                    <Image
                      src={src}
                      alt={`${sb_module.name} image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                      <Beaker className="h-5 w-5 text-yellow-accent" />
                    </div>
                    <h2 className="text-2xl font-semibold text-yellow-bright">
                      Module Overview
                    </h2>
                  </div>
                  <p className="pl-14 text-gray-200">
                    Dive into the exciting world of {sb_module.name}! This
                    module will challenge your scientific knowledge and
                    problem-solving skills through an immersive experience.
                  </p>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                      <Lightbulb className="h-5 w-5 text-yellow-accent" />
                    </div>
                    <h2 className="text-2xl font-semibold text-yellow-bright">
                      What to Expect
                    </h2>
                  </div>
                  <ul className="space-y-4 pl-14">
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Brain className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      <span>Engaging hands-on activities</span>
                    </li>
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Puzzle className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      <span>Challenging scientific puzzles</span>
                    </li>
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Share2 className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      <span>Collaborative problem-solving</span>
                    </li>
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Flask className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      <span>Application of scientific principles</span>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
