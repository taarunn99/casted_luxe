"use client";

import { useReveal } from "@/lib/useReveal";
import Button from "@/components/ui/Button";

/**
 * Home-page glimpse of Ashrat — a single pull-quote that leads to /about.
 */
export default function ArtistTeaser() {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      aria-label="The artist — a glimpse"
      className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:py-36"
    >
      <p className="gsap-reveal font-serif italic text-lg tracking-[0.28em] uppercase text-umber/80">
        The Artist
      </p>
      <blockquote className="gsap-reveal mt-6 font-serif text-3xl italic leading-relaxed text-ink sm:text-4xl">
        &ldquo;I don&rsquo;t make pieces for walls. I make them for the people
        who live beneath them.&rdquo;
      </blockquote>
      <p className="gsap-reveal mt-6 font-script text-4xl text-royal">Ashrat</p>
      <div className="gsap-reveal pencil-rule mx-auto mt-8 w-40" />
      <div className="gsap-reveal mt-10">
        <Button href="/about" variant="outline">
          Meet Ashrat
        </Button>
      </div>
    </section>
  );
}
