import type { Metadata } from "next";
import Gallery from "@/components/sections/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The Casted Luxe collection — bespoke, handcrafted art pieces commissioned from the atelier of Ashrat.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main>
      <Gallery />
    </main>
  );
}
