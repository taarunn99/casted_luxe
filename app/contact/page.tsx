import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Commission a bespoke Casted Luxe art piece — tell Ashrat the story you want turned into art, by enquiry form or WhatsApp.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="pt-10 sm:pt-12">
      <Contact />
    </main>
  );
}
