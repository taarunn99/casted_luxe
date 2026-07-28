import type { Metadata } from "next";
import About from "@/components/sections/About";
import ProcessTeaser from "@/components/sections/ProcessTeaser";
import VideoSection from "@/components/sections/VideoSection";

export const metadata: Metadata = {
  title:
    "Ashrat — Dubai Artist Behind Casted Luxe | Resin Art, Calligraphy & Bespoke Commissions",
  description:
    "Meet Ashrat, the Dubai-based artist behind Casted Luxe. Every bespoke commission — epoxy resin showpiece, gold-leaf Arabic calligraphy or luminous canvas — is drawn, layered and finished by hand as a singular original. No prints, no reproductions. Watch the collection come to life on film.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="pt-10 sm:pt-12">
      <About />
      <ProcessTeaser />
      <VideoSection />
    </main>
  );
}
