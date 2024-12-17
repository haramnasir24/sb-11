"use client";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";

import { Button } from "@/components/ui/button";

export default function ModulesFooter() {
  const openDirections = () => {
    const address = encodeURIComponent("NUST, H-12, Islamabad, Pakistan");
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${address}`,
      "_blank",
    );
  };

  return (
    <footer
      id="form-footer"
      className="inset-0 w-full items-center justify-center border-t bg-gradient-to-br from-[#03071E] via-[#03071E] to-[#03071E] text-white"
    >
      <div className="px-16 py-12 md:px-20 md:py-16 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nust Science Society</h3>
            <p className="text-sm text-gray-300">
              For queries related to modules and registrations contact:
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-yellow-500" />
                +92 322 2727843
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-yellow-500" />
                sbxregi@gmail.com
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/modules"
                  className="transition-colors hover:text-yellow-500"
                >
                  Modules
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="transition-colors hover:text-yellow-500"
                >
                  Register Now
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-yellow-500" />
                sbxregi@gmail.com
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-yellow-500" />
                +92 322 2727843
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-yellow-500" />
                NUST, H-12, Islamabad
              </li>
            </ul>
            <Button
              className="bg-yellow-400 text-base text-black hover:bg-yellow-500"
              size="lg"
              onClick={openDirections}
            >
              Get Directions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Buy Tickets</h3>
            <p className="text-sm text-gray-300">
              Ready to unleash the scientist in you?
            </p>
            <Link
              href="/register"
              className="inline-block rounded bg-yellow-500 px-4 py-2 text-base text-black hover:bg-yellow-600"
            >
              REGISTER NOW
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 pt-8 sm:flex-row sm:space-y-0">
          <p className="text-sm text-yellow-500">
            © {new Date().getFullYear()} Nust Science Society. All rights
            reserved.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://www.instagram.com/nss_sciencebee/"
              className="text-gray-300 hover:text-yellow-500"
            >
              <FaInstagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.facebook.com/ScienceBee.NSS/"
              className="text-gray-300 hover:text-yellow-500"
            >
              <IoLogoFacebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
