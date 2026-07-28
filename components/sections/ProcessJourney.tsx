"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHATSAPP_NUMBER } from "@/lib/works";

/**
 * The Process — five movements from a message to a signed piece.
 * An editorial timeline: a pencil thread runs down the page, each
 * movement alternating sides around it, led by an oversized script
 * numeral (echoing the gallery's I–VIII motif). Closes with the
 * commission CTA and a quiet, native-details FAQ (no JS, crawlable).
 */

const MOVEMENTS = [
  {
    numeral: "I",
    title: "The Conversation",
    copy: "It begins with a message. Tell Ashrat the story — the room, the memory, the feeling you want to keep. WhatsApp, email, or the enquiry form; photos of your space help.",
  },
  {
    numeral: "II",
    title: "The Vision",
    copy: "Within a few days you receive a concept: the style, palette, materials and dimensions, sketched into words and references. Nothing proceeds until it feels right to you.",
  },
  {
    numeral: "III",
    title: "The Quote",
    copy: "Every piece is priced individually — by size, materials and intricacy. A deposit confirms your place in the atelier's queue, and the work begins.",
  },
  {
    numeral: "IV",
    title: "The Making",
    copy: "Layer by layer, cure by cure. You receive glimpses from the atelier as your piece takes form — the part most clients say they love the most.",
  },
  {
    numeral: "V",
    title: "The Arrival",
    copy: "Finished, signed, and delivered ready to hang — across the UAE and the GCC, and worldwide on request. Every piece leaves with its care notes and Ashrat's signature.",
  },
];

const FAQS = [
  {
    q: "How long does a commission take?",
    a: "Most pieces take two to six weeks from deposit to delivery — simple canvases sooner, layered resin and backlit builds longer, because every layer must fully cure. You'll always be given an honest estimate with your quote.",
  },
  {
    q: "How is pricing decided?",
    a: "Each piece is quoted individually by size, materials and intricacy. A 30% deposit confirms your commission and your place in the atelier's queue; the balance is settled on completion, before delivery.",
  },
  {
    q: "Do you deliver outside the UAE?",
    a: "Yes — across the UAE and the GCC, and worldwide on request. Every piece travels professionally packed, with insurance arranged per commission; cross-border duties are borne by the client.",
  },
  {
    q: "Can I request changes during the making?",
    a: "Small refinements — a palette shift, a finish — are welcome while the piece is in progress. Structural or size changes may adjust the quote and the timeline; Ashrat will always tell you honestly what's possible.",
  },
];

const whatsappHref =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "Hello — I'd love to begin a commission with Casted Luxe.",
  );

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function ProcessJourney() {
  const scope = useReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      ref={scope}
      id="process"
      aria-label="The commission process"
      className="relative mx-auto max-w-5xl px-6 py-28 sm:py-36"
    >
      <SectionHeading
        eyebrow="The Process"
        title="From a conversation, to a signature."
      />

      <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
        Every commission follows the same unhurried path. Here is how a piece
        of yours comes to be.
      </p>

      {/* ── The five movements, threaded on a line ── */}
      <div className="relative mt-20">
        {/* the thread */}
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-4 top-4 w-px bg-umber/20 md:left-1/2"
        />

        <ol className="space-y-16 md:space-y-20">
          {MOVEMENTS.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <li key={m.numeral} className="relative md:grid md:grid-cols-2 md:gap-16">
                {/* node on the thread */}
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-3 h-2 w-2 -translate-x-1/2 rounded-full bg-royal md:left-1/2"
                />

                <div
                  className={`gsap-reveal pl-12 md:pl-0 ${
                    left
                      ? "md:col-start-1 md:pr-14 md:text-right"
                      : "md:col-start-2 md:pl-14"
                  }`}
                >
                  <p
                    className="font-script text-6xl leading-none text-royal/25 sm:text-7xl"
                    aria-hidden="true"
                  >
                    {m.numeral}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-3xl">
                    {m.title}
                  </h2>
                  <p className="mt-3 font-serif text-lg leading-relaxed text-ink/85">
                    {m.copy}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ── Begin the conversation ── */}
      <div className="gsap-reveal sheet-edge mx-auto mt-24 max-w-2xl rounded-xl border border-umber/40 bg-cream px-8 py-10 text-center">
        <p className="font-script text-4xl text-ink sm:text-5xl">
          Begin the conversation
        </p>
        <p className="mx-auto mt-4 max-w-md font-serif text-lg italic text-umber">
          A message is all it takes — the rest unfolds from there.
        </p>
        <div className="mx-auto mt-7 flex max-w-md flex-col gap-2.5 sm:flex-row sm:gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#128C4B] px-5 py-2.5 font-serif text-base font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#0b6b38]"
          >
            <WhatsAppIcon />
            Begin on WhatsApp
          </a>
          <Link
            href="/contact"
            className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-umber/60 px-5 py-2.5 font-serif text-base font-semibold tracking-wide text-ink transition-colors duration-200 hover:border-royal hover:text-royal"
          >
            Send an Enquiry
          </Link>
        </div>
      </div>

      {/* ── Questions, quietly answered ── */}
      <div className="mx-auto mt-24 max-w-2xl">
        <p className="gsap-reveal text-center font-serif text-lg italic uppercase tracking-[0.28em] text-umber/80">
          Questions
        </p>
        <div className="gsap-reveal mt-8 divide-y divide-umber/15 border-y border-umber/15">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl font-medium text-ink transition-colors hover:text-royal [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-serif text-2xl leading-none text-royal transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 pr-8 font-serif text-lg leading-relaxed text-ink/85">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
