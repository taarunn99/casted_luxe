import type { Metadata } from "next";
import ProcessJourney from "@/components/sections/ProcessJourney";

export const metadata: Metadata = {
  title: "The Process",
  description:
    "From a conversation, to a signature — the five movements every Casted Luxe commission follows: conversation, vision, quote, making, arrival.",
};

export default function ProcessPage() {
  return (
    <main className="pt-10 sm:pt-12">
      <ProcessJourney />
    </main>
  );
}
