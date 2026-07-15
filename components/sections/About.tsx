"use client";

import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      id="about"
      aria-label="About the artist"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <SectionHeading eyebrow="The Artist" title="By Ashrat" />

      <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
        {/* Portrait placeholder — swaps for photoshoot image later */}
        <figure className="gsap-reveal relative mx-auto w-full max-w-md">
          <div className="sheet-edge relative aspect-[4/5] rounded-sm bg-paper p-4">
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-umber/20 bg-cream">
              <div className="text-center px-8">
                <svg
                  className="mx-auto mb-4 text-umber/50"
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
                <p className="font-script text-3xl text-umber/70">Ashrat</p>
                <p className="mt-1 font-serif italic text-umber/60">
                  Portrait from the atelier — coming soon
                </p>
              </div>
            </div>
          </div>
          {/* Lavender accent corner */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-sm bg-lilac"
          />
        </figure>

        <div className="max-w-prose">
          <p className="gsap-reveal font-serif text-2xl leading-relaxed text-ink">
            Every Crafted Luxe piece begins as a conversation — a memory, a
            feeling, a story you want to hold in your hands.
          </p>
          <p className="gsap-reveal mt-6 font-serif text-xl leading-relaxed text-ink/90">
            Ashrat is the artist behind the atelier. Working by hand, she turns
            raw canvas, pigment and texture into bespoke artworks made for one
            person alone — you. No prints, no reproductions; each commission is
            drawn, layered and finished as a singular original.
          </p>
          <p className="gsap-reveal mt-6 font-serif text-xl italic leading-relaxed text-umber">
            &ldquo;I don&rsquo;t make pieces for walls. I make them for the
            people who live beneath them.&rdquo;
          </p>
          <div className="gsap-reveal mt-8 pencil-rule w-24" />
          <p className="gsap-reveal mt-6 font-script text-4xl text-royal">
            Ashrat
          </p>
        </div>
      </div>
    </section>
  );
}
