"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Contact Us", link: "modules-footer" },
];

export default function ModulesNavbar() {
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
              {navItems.map(({ name, link }, index) => (
                <Link
                  key={index}
                  href={link}
                  onClick={(e) => {
                    if (link !== "/") {
                      e.preventDefault();
                      setIsOpen(false);
                      setTimeout(() => {
                        const element = document.getElementById(link);
                        element?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    }
                  }}
                  className="rounded-md px-3 py-2 text-xs font-medium uppercase text-white hover:text-gray-300 lg:text-sm"
                >
                  {name}
                </Link>
              ))}
              <Button
                className="bg-white text-sm text-black hover:bg-slate-100"
                size="sm"
                onClick={() => {}}
              >
                REGISTER NOW
              </Button>
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
            {navItems.map(({ name, link }, index) => (
              <Link
                key={index}
                href={link}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:text-gray-300"
                onClick={(e) => {
                  if (link !== "/") {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => {
                      const element = document.getElementById(link);
                      element?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }
                }}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
