import type { Metadata } from "next";
import { Parisienne, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PaperTexture from "@/components/ui/PaperTexture";
import SheetIntro from "@/components/ui/SheetIntro";
import PageTurn from "@/components/ui/PageTurn";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const parisienne = Parisienne({
  variable: "--font-parisienne",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://castedluxe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Custom Art Commissions in Dubai, UAE — Bespoke Epoxy Resin Art, Arabic Calligraphy & Luxury Wall Art | Casted Luxe by Ashrat",
    template: "%s · Casted Luxe",
  },
  description:
    "Commission one-of-a-kind art in Dubai: hand-poured epoxy resin wall art, gold-leaf Arabic calligraphy, luminous canvases and sculptural showpieces by artist Ashrat. Every piece made to measure — no prints, no reproductions — delivered across the UAE, the GCC and worldwide.",
  keywords: [
    "custom art Dubai",
    "art commissions UAE",
    "bespoke wall art Dubai",
    "epoxy resin art Dubai",
    "resin wall art UAE",
    "Arabic calligraphy art",
    "gold leaf calligraphy painting",
    "luxury wall art UAE",
    "commissioned artwork Dubai",
    "made to order art pieces",
    "custom paintings Dubai",
    "handcrafted art gifts UAE",
    "personalised art piece Dubai",
    "home decor art UAE",
    "GCC art delivery",
    "Casted Luxe",
    "Ashrat artist",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Casted Luxe",
    title:
      "Custom Art Commissions in Dubai — Bespoke Resin Art, Calligraphy & Luxury Wall Art | Casted Luxe",
    description:
      "One-of-a-kind commissioned art by Ashrat: epoxy resin showpieces, gold-leaf Arabic calligraphy, luminous canvases. Made to measure in Dubai, delivered across the UAE, GCC and worldwide.",
    images: [{ url: "/og-logo.png", width: 1200, height: 630, alt: "Casted Luxe — bespoke art commissions by Ashrat, Dubai" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Custom Art Commissions in Dubai — Bespoke Resin Art, Calligraphy & Luxury Wall Art | Casted Luxe",
    description:
      "One-of-a-kind commissioned art by Ashrat: epoxy resin showpieces, gold-leaf Arabic calligraphy, luminous canvases. Made to measure, delivered UAE, GCC & worldwide.",
    images: ["/og-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Casted Luxe",
      url: siteUrl,
      logo: `${siteUrl}/og-logo.png`,
      email: "tarun.s@lapizblue.com",
      description:
        "Dubai-based art atelier creating bespoke commissioned artworks — epoxy resin showpieces, gold-leaf Arabic calligraphy and luxury wall art — made to measure by artist Ashrat.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: ["AE", "SA", "QA", "KW", "BH", "OM", "Worldwide"],
      sameAs: ["https://www.instagram.com/artshi.resin/"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer enquiries",
        telephone: "+971558005474",
        availableLanguage: ["English"],
      },
      founder: { "@id": `${siteUrl}/#artist` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#artist`,
      name: "Ashrat",
      jobTitle: "Artist",
      description:
        "Dubai-based artist and founder of Casted Luxe, creating bespoke commissioned art — epoxy resin, Arabic calligraphy, gold leaf and luminous canvas work.",
      knowsAbout: [
        "epoxy resin art",
        "Arabic calligraphy",
        "gold leaf painting",
        "textured canvas art",
        "bespoke art commissions",
      ],
      sameAs: ["https://www.instagram.com/artshi.resin/"],
      worksFor: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Casted Luxe",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${parisienne.variable} ${cormorant.variable} js h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
        <PaperTexture />
        <SheetIntro />
        <PageTurn />
      </body>
    </html>
  );
}
