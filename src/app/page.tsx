import AboutUs from "@/components/landing/info-sections/about-us";
import PastEvents from "@/components/landing/info-sections/past-events";
import Socials from "@/components/landing/info-sections/socials";
import Sponsors from "@/components/landing/info-sections/sponsors";

import HeroSection from "../components/landing/hero-section/hero-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutUs />
      <PastEvents />
      <Socials />
      <Sponsors />
    </main>
  );
}
