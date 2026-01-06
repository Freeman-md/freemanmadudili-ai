import type { Metadata } from "next";

import { HeroSection } from "@/components/sections/hero-section";
import { AutomationFlowSection } from "@/components/sections/automation-flow-section";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { WhoSection } from "@/components/sections/who-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export const metadata: Metadata = {
  title: "Automation Sales Hub",
  description:
    "Automation systems that remove manual work and keep operations running smoothly.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <AutomationFlowSection />
        <WhoSection />
        <ServicesSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />
    </div>
  );
}
