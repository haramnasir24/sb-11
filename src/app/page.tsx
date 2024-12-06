import AboutUs from "@/components/landing/about-us";
import Navbar from "@/components/landing/navbar";

import HeroSection from "../components/landing/hero-section";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutUs />
    </main>
  );
}
