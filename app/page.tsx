import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FaqsSection } from "@/components/sections/faqs-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ProofSection } from "@/components/sections/proof-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhoSection } from "@/components/sections/who-section";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";

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
        <WhoSection />
        <ServicesSection />
        <ProofSection />
        <HowItWorksSection />
        <FaqsSection />

        <Section className="pt-0">
          <Container>
            <div className="border-t border-border" />
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
