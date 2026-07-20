"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

/**
 * Home-page teaser of the collection — three framed pieces that emerge from
 * beneath the hero's veil, then invite the visitor to the full gallery page.
 */
const PREVIEW_WORKS = [
  { title: "Commission I", medium: "Mixed media on canvas", aspect: "aspect-[4/5]" },
  { title: "Commission II", medium: "Textured acrylic", aspect: "aspect-square" },
  { title: "Commission III", medium: "Hand-layered relief", aspect: "aspect-[4/5]" },
];

export default function CollectionPreview() {
  const scope = useReveal<HTMLElement>({ stagger: 0.1 });

  // Emerges from beneath the hero stack: scrubbed fade + rise while the
  // hero's cream veil completes above it.
  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 90, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: 0.6 },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [scope]);

  return (
    <section
      ref={scope}
      id="after-hero"
      aria-label="The collection — preview"
      className="relative z-10 -mt-[50svh] bg-paper/40 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Featured Works" title="The Collection" />

        <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
          The atelier&rsquo;s latest commissions are being photographed —
          a first look at what leaves the studio.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PREVIEW_WORKS.map((work) => (
            <motion.article
              key={work.title}
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="gsap-reveal group cursor-pointer"
            >
              <div className="sheet-edge rounded-sm border-[6px] border-umber bg-paper p-4 sm:p-5 transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-12px_rgba(44,20,5,0.35)]">
                <div
                  className={`${work.aspect} relative flex items-center justify-center overflow-hidden border border-umber/25 bg-cream`}
                >
                  <div className="text-center px-6">
                    <p className="font-script text-2xl text-umber/60">{work.title}</p>
                    <p className="mt-1 font-serif italic text-sm text-umber/50">
                      Awaiting unveiling
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-end bg-royal/0 transition-colors duration-300 group-hover:bg-royal/85">
                    <div className="w-full translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-script text-3xl text-lilac">{work.title}</p>
                      <p className="font-serif italic text-lilac/90">{work.medium}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="gsap-reveal mt-14 text-center">
          <Button href="/gallery">View the Gallery</Button>
        </div>
      </div>
    </section>
  );
}
