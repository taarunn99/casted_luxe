import type { Metadata } from "next";
import ProcessJourney from "@/components/sections/ProcessJourney";

export const metadata: Metadata = {
  title:
    "How to Commission Custom Art in Dubai — Process, Pricing & Timeline",
  description:
    "Commissioning a bespoke art piece with Casted Luxe takes five unhurried steps: the conversation, the vision, the quote, the making and the arrival. Most pieces take 2–6 weeks, priced individually by size, materials and intricacy, and delivered across the UAE, the GCC and worldwide on request.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <main className="pt-10 sm:pt-12">
      <ProcessJourney />
    </main>
  );
}
