"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";

/**
 * Cinematic video block — placeholder until the photoshoot film arrives.
 * To go live: replace the inner placeholder with
 *   <video src="/film/atelier.mp4" poster="/film/poster.jpg" controls playsInline />
 */
export default function VideoSection() {
  const scope = useReveal<HTMLElement>();
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Scale-on-scroll entrance, scrubbed by Lenis
      gsap.fromTo(
        frame,
        { scale: 0.92 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top 90%",
            end: "top 35%",
            scrub: true,
          },
        },
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="film"
      aria-label="Inside the atelier — film"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <SectionHeading eyebrow="Inside the Atelier" title="The Craft, on Film" />

      <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
        A cinematic look at how each commission takes shape — filming with the
        upcoming photoshoot.
      </p>

      <div
        ref={frameRef}
        className="gsap-reveal sheet-edge mt-14 rounded-sm border-[6px] border-umber bg-paper p-3 sm:p-4 will-change-transform"
      >
        <div className="relative aspect-video overflow-hidden border border-umber/25 bg-lilac/60">
          {/* Placeholder canvas */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <button
              type="button"
              aria-label="Film coming soon"
              className="group flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-royal shadow-[0_12px_32px_-8px_rgba(58,15,98,0.5)] transition-colors duration-200 hover:bg-umber"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="#ece4fa"
                className="ml-1"
                aria-hidden="true"
              >
                <path d="M6 4.5v15l13-7.5-13-7.5z" />
              </svg>
            </button>
            <p className="font-script text-3xl sm:text-4xl text-ink/80">
              Premiering with the collection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
