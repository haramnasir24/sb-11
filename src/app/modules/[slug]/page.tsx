import {
  ArrowLeft,
  Beaker,
  Brain,
  Layers,
  Lightbulb,
  Users,
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

export default function ModuleDetail({ params }: ModuleProps) {
  const { slug } = use(params);
  const sb_module = modules.find((mod) => mod.slug === slug);

  if (!sb_module) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD] pb-24 pt-16">
      <main className="container relative mx-auto px-6 py-20">
        <Link
          href="/modules"
          className="group mb-8 inline-flex items-center gap-2 text-yellow-accent transition-colors hover:text-yellow-bright"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Modules</span>
        </Link>

        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-[#2F114A]"></div>
          <div className="relative rounded-2xl border border-white/10 p-10 shadow-2xl md:p-12">
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
                {sb_module.images.map((src, index) => (
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

              <div className="grid gap-12 md:grid-cols-2">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                      <Beaker className="h-5 w-5 text-yellow-accent" />
                    </div>
                    <h2 className="text-2xl font-semibold text-yellow-bright">
                      Module Overview
                    </h2>
                  </div>
                  <p className="pl-14 leading-relaxed text-gray-200">
                    {sb_module.overview}
                  </p>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                      <Lightbulb className="h-5 w-5 text-yellow-accent" />
                    </div>
                    <h2 className="text-2xl font-semibold text-yellow-bright">
                      Module Details
                    </h2>
                  </div>
                  <ul className="space-y-4 pl-14">
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Brain className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      <span>Module Type: {sb_module.moduleType}</span>
                    </li>
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Users className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      <span>Team Members: {sb_module.teamMembers}</span>
                    </li>
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Layers className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      <span>Number of Rounds: {sb_module.rounds}</span>
                    </li>
                  </ul>
                </section>
              </div>

              {/* <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                    <Puzzle className="h-5 w-5 text-yellow-accent" />
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
              </section> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
