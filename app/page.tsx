import Navbar from "@/components/sections/Navbar";
import LuxeHero from "@/components/sections/LuxeHero";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import VideoSection from "@/components/sections/VideoSection";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <LuxeHero />
        <Gallery />
        <About />
        <VideoSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
