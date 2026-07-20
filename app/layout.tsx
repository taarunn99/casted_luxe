import type { Metadata } from "next";
import { Parisienne, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PaperTexture from "@/components/ui/PaperTexture";
import SheetIntro from "@/components/ui/SheetIntro";

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
    default: "Casted Luxe — Custom Art Pieces by Ashrat",
    template: "%s · Casted Luxe",
  },
  description:
    "Casted Luxe is a luxury arts & crafts atelier by Ashrat — bespoke, handcrafted art pieces made to commission. Custom artworks with an artist's touch.",
  keywords: [
    "custom art pieces",
    "handcrafted art",
    "luxury crafts",
    "bespoke artwork",
    "commissioned art",
    "Casted Luxe",
    "Ashrat",
    "art atelier",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Casted Luxe",
    title: "Casted Luxe — Custom Art Pieces by Ashrat",
    description:
      "Luxury handcrafted art pieces, made to commission by Ashrat. Every piece a signature.",
    images: [{ url: "/logo.svg", width: 1200, height: 1200, alt: "Casted Luxe logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casted Luxe — Custom Art Pieces by Ashrat",
    description:
      "Luxury handcrafted art pieces, made to commission by Ashrat. Every piece a signature.",
    images: ["/logo.svg"],
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
      logo: `${siteUrl}/logo.svg`,
      email: "tarun.s@lapizblue.com",
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
        "Artist and founder of Casted Luxe, creating bespoke handcrafted art pieces to commission.",
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
        <SmoothScroll>{children}</SmoothScroll>
        <PaperTexture />
        <SheetIntro />
      </body>
    </html>
  );
}
