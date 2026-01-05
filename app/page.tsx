import type { Metadata } from "next";

import { HeroSection } from "@/components/sections/hero-section";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { WhoSection } from "@/components/sections/who-section";

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
      </main>

      <Footer />
    </div>
  );
}
