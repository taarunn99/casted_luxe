import LuxeHero from "@/components/sections/LuxeHero";
import CollectionPreview from "@/components/sections/CollectionPreview";
import ArtistTeaser from "@/components/sections/ArtistTeaser";
import QuoteReveal from "@/components/sections/QuoteReveal";
import AtelierChat from "@/components/sections/AtelierChat";

export default function Home() {
  return (
    <main className="relative">
      {/* Hand-plastered ivory finish — home page only */}
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cream bg-cover bg-center"
        style={{ backgroundImage: "url(/finish.webp)" }}
      />
      <LuxeHero />
      <CollectionPreview />
      <ArtistTeaser />
      <QuoteReveal />
      <AtelierChat />
    </main>
  );
}
