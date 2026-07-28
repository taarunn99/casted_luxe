import type { Metadata } from "next";
import GalleryHero from "@/components/sections/GalleryHero";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title:
    "Art Gallery — Original Epoxy Resin Art, Arabic Calligraphy & Luxury Wall Art Pieces in Dubai",
  description:
    "Explore eight original commissions by Dubai artist Ashrat: hand-poured epoxy resin wall discs, a Porsche 911 resin diorama, gold-leaf Arabic calligraphy, a glowing lunar relief and luminous canvases. Every artwork is one of a kind and can be commissioned made to measure for your home.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main>
      <GalleryHero />
      <Gallery />
    </main>
  );
}
