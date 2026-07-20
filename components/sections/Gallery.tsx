"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The Collection — colour-morphing showcase.
 * One artwork at a time; as each piece scrolls into view the whole page
 * background tweens to that artwork's colour theme (heyblackmagic-style).
 * When the real photographs arrive, set each work's `theme` to a tone
 * sampled from the piece and drop a next/image inside the frame.
 */
const WORKS = [
  { title: "Commission I", numeral: "I", medium: "Mixed media on canvas", aspect: "aspect-[4/5]", theme: "#f1efe3" },
  { title: "Commission II", numeral: "II", medium: "Textured acrylic", aspect: "aspect-square", theme: "#ece4fa" },
  { title: "Commission III", numeral: "III", medium: "Hand-layered relief", aspect: "aspect-[4/5]", theme: "#e7dccb" },
  { title: "Commission IV", numeral: "IV", medium: "Ink & gold leaf", aspect: "aspect-square", theme: "#dde3d5" },
  { title: "Commission V", numeral: "V", medium: "Sculpted canvas", aspect: "aspect-[4/5]", theme: "#ecdcd5" },
  { title: "Commission VI", numeral: "VI", medium: "Bespoke wall piece", aspect: "aspect-[4/5]", theme: "#ded8e6" },
];

export default function Gallery() {
  const scope = useReveal<HTMLElement>();
  const bgRef = useRef<HTMLElement | null>(null);

  // Background colour follows the artwork currently in view
  useEffect(() => {
    const section = bgRef.current;
    if (!section) return;

    if (prefersReducedMotion()) {
      section.style.backgroundColor = WORKS[0].theme;
      return;
    }

    const ctx = gsap.context(() => {
      const pieces = gsap.utils.toArray<HTMLElement>("[data-theme]");
      pieces.forEach((piece) => {
        const theme = piece.dataset.theme as string;
        ScrollTrigger.create({
          trigger: piece,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(section, { backgroundColor: theme, duration: 0.9, ease: "power2.out" }),
          onEnterBack: () =>
            gsap.to(section, { backgroundColor: theme, duration: 0.9, ease: "power2.out" }),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={(el) => {
        scope.current = el;
        bgRef.current = el;
      }}
      id="gallery"
      aria-label="Featured works"
      className="relative bg-cream pt-36 pb-28 sm:pt-44 sm:pb-36 transition-none"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Featured Works" title="The Collection" />

        <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
          The atelier&rsquo;s latest commissions are being photographed —
          the collection unveils here soon.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {WORKS.map((work) => (
          <article
            key={work.title}
            data-theme={work.theme}
            className="flex min-h-[92svh] flex-col items-center justify-center py-16"
          >
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-umber/70">
              {work.numeral}
            </p>

            <motion.div
              whileHover={{ y: -8 }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="mt-6 w-full max-w-xl"
            >
              <div className="sheet-edge rounded-sm border-[6px] border-umber bg-paper p-4 sm:p-6">
                <div
                  className={`${work.aspect} relative flex items-center justify-center overflow-hidden border border-umber/25 bg-cream`}
                >
                  {/* Placeholder — replace with next/image of the artwork */}
                  <div className="text-center px-6">
                    <svg
                      className="mx-auto mb-3 text-umber/40"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="13.5" cy="6.5" r=".5" />
                      <circle cx="17.5" cy="10.5" r=".5" />
                      <circle cx="8.5" cy="7.5" r=".5" />
                      <circle cx="6.5" cy="12.5" r=".5" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                    </svg>
                    <p className="font-script text-3xl text-umber/60">{work.title}</p>
                    <p className="mt-1 font-serif italic text-sm text-umber/50">
                      Awaiting unveiling
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <h3 className="mt-8 font-script text-4xl sm:text-5xl text-ink">
              {work.title}
            </h3>
            <p className="mt-2 font-serif italic text-lg text-umber">{work.medium}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
