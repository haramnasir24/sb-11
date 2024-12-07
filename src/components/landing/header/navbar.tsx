"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const moduleItems = [
  { name: "Crimeline", href: "/crimeline" },
  { name: "Escape Room", href: "/escape-room" },
  { name: "Medical Mayhem", href: "/medical-mayhem" },
  { name: "Scirun", href: "/scirun" },
  { name: "Crack it out", href: "/crack-it-out" },
  { name: "The Psych Realm", href: "/psych-realm" },
  { name: "Mathelatics", href: "/mathelatics" },
  { name: "Speed Programming", href: "/speed-programming" },
  { name: "RoboWars", href: "/robowars" },
  { name: "Chemathon", href: "/chemathon" },
  { name: "HeatOps", href: "/heatops" },
];

const navItems = [
  { name: "Home", link: "/", dropdown: false },
  { name: "About Us", link: "about", dropdown: false },
  { name: "Past Events", link: "past-events", dropdown: false },
  { name: "Socials", link: "socials", dropdown: false },
  { name: "Modules", link: "", dropdown: true },
  { name: "Sponsors", link: "sponsors", dropdown: false },
  { name: "Contact Us", link: "contact", dropdown: false },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute left-0 right-0 top-0 z-50 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text:lg font-bold uppercase text-white md:text-2xl"
            >
              Logo
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-5 flex items-baseline space-x-4 lg:ml-10">
              {navItems.map(({ name, link, dropdown }, index) =>
                dropdown ? (
                  <DropdownMenu key={index}>
                    <DropdownMenuTrigger className="rounded-md px-3 py-2 text-xs font-medium uppercase text-white hover:text-gray-300 lg:text-sm">
                      {name}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white text-black">
                      {moduleItems.map(({ name, href }, idx) => (
                        <DropdownMenuItem key={idx} asChild>
                          <Link href={href}>{name}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={index}
                    href={`#${link}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      setTimeout(() => {
                        const element = document.getElementById(link);
                        element?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }}
                    className="rounded-md px-3 py-2 text-xs font-medium uppercase text-white hover:text-gray-300 lg:text-sm"
                  >
                    {name}
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 bg-black bg-opacity-75 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map(({ name, link, dropdown }, index) =>
              dropdown ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-white hover:text-gray-300">
                    {name}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-black">
                    {moduleItems.map(({ name, href }, idx) => (
                      <DropdownMenuItem key={idx} asChild>
                        <Link href={href}>{name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={index}
                  href={`#${link}`}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-gray-300"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById(link);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                >
                  {name}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
