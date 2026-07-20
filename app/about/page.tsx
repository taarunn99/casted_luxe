import type { Metadata } from "next";
import About from "@/components/sections/About";
import VideoSection from "@/components/sections/VideoSection";

export const metadata: Metadata = {
  title: "About Ashrat",
  description:
    "Meet Ashrat, the artist behind Casted Luxe — every bespoke commission drawn, layered and finished by hand as a singular original.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="pt-10 sm:pt-12">
      <About />
      <VideoSection />
    </main>
  );
}
