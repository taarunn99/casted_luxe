import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title:
    "Commission a Custom Art Piece in Dubai — Contact Casted Luxe on WhatsApp or Email",
  description:
    "Start your bespoke art commission today: message Casted Luxe on WhatsApp or send an enquiry, and tell artist Ashrat the room, the memory or the feeling you want turned into art. Custom epoxy resin, Arabic calligraphy and luxury wall pieces, made to measure in Dubai.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="pt-10 sm:pt-12">
      <Contact />
    </main>
  );
}
