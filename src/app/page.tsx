import Navbar from "@/components/landing/hero-section/navbar";
import AboutUs from "@/components/landing/info-sections/about-us";
import PastEvents from "@/components/landing/info-sections/past-events";

import HeroSection from "../components/landing/hero-section/hero-section";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <PastEvents />
    </main>
  );
}
