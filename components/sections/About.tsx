"use client";

import Image from "next/image";
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
        {/* Portrait of Ashrat */}
        <figure className="gsap-reveal relative mx-auto w-full max-w-md">
          <div className="sheet-edge relative rounded-xl border border-umber/40 bg-paper p-1.5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] border border-umber/15 bg-cream">
              <Image
                src="/about/ashrat-portrait.webp"
                alt="Portrait of Ashrat, the artist behind Casted Luxe"
                fill
                sizes="(min-width: 768px) 28rem, 90vw"
                className="object-cover object-[center_30%]"
              />
            </div>
          </div>
          {/* Lavender accent corner */}
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl bg-lilac"
          />
        </figure>

        <div className="max-w-prose">
          <p className="gsap-reveal font-serif text-2xl leading-relaxed text-ink">
            Every Casted Luxe piece begins as a conversation — a memory, a
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
