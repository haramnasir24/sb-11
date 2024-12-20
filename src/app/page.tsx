import Contact from "@/components/landing/footer/contact";
import AboutUs from "@/components/landing/info-sections/about-us";
import PastEvents from "@/components/landing/info-sections/past-events";
import Socials from "@/components/landing/info-sections/socials";
import Sponsors from "@/components/landing/info-sections/sponsors";
import Navbar from "@/components/landing/navbar/navbar";

import HeroSection from "../components/landing/hero-section/hero-section";

export default function Home() {
  return (
    <main className="w-full bg-[#03071E] text-white">
      <Navbar />
      <HeroSection />
      <AboutUs />
      <PastEvents />
      <Socials />
      <Sponsors />
      <Contact />
    </main>
  );
}
