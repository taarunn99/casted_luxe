"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

/**
 * Home-page teaser of the collection — three framed pieces that emerge from
 * beneath the hero's veil, then invite the visitor to the full gallery page.
 * A curated three of the six; the gallery holds them all.
 */
const PREVIEW_WORKS = [
  {
    title: "Ocean in Six",
    medium: "Oil pastel & transparent epoxy",
    image: "/gallery/ocean-in-six.webp",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Drift & Ember",
    medium: "Die-cast Porsche & tinted epoxy",
    image: "/gallery/drift-and-ember.webp",
    aspect: "aspect-square",
  },
  {
    title: "Andalus",
    medium: "Alcohol ink, gold & arabesque under resin",
    image: "/gallery/andalus.webp",
    aspect: "aspect-[4/5]",
  },
];

export default function CollectionPreview() {
  const scope = useReveal<HTMLElement>({ stagger: 0.1 });

  // Emerges from beneath the hero stack: scrubbed fade + rise while the
  // hero's cream veil completes above it.
  useEffect(() => {
    const el = scope.current;
    if (!el || prefersReducedMotion()) return;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 90, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 25%",
            scrub: isTouch ? 0.25 : 0.6,
          },
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
          A first glimpse of the collection — seven original commissions, each
          made to be lived with.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PREVIEW_WORKS.map((work) => (
            <motion.div
              key={work.title}
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="gsap-reveal group"
            >
              <Link
                href="/gallery"
                aria-label={`${work.title} — view in the gallery`}
                className="block cursor-pointer"
              >
                <div className="sheet-edge rounded-lg border border-umber/40 bg-paper p-1.5 transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-12px_rgba(44,20,5,0.35)]">
                  <div
                    className={`${work.aspect} relative overflow-hidden rounded-[3px] border border-umber/15 bg-cream`}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 flex items-end bg-royal/0 transition-colors duration-300 group-hover:bg-royal/85">
                      <div className="w-full translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="font-script text-3xl text-lilac">{work.title}</p>
                        <p className="font-serif italic text-lilac/90">{work.medium}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="gsap-reveal mt-14 text-center">
          <Button href="/gallery">View the Gallery</Button>
        </div>
      </div>
    </section>
  );
}
