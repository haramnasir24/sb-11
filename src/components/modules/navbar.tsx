"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Contact Us", link: "modules-footer" },
];

export default function ModulesNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-10 z-50 mx-auto w-[90%] rounded-lg bg-[#03071E] shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/images/sb11-logo.png"
                alt="Science Bee Logo"
                width={80}
                height={80}
                className="h-12 w-auto"
              />
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
              <Link
                href="/register"
                className="inline-block rounded bg-yellow-500 px-4 py-2 text-base text-black hover:bg-yellow-600"
              >
                REGISTER NOW
              </Link>
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
