"use client";

import { motion } from "framer-motion";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Featured works — elegant framed placeholders.
 * When photoshoot images arrive, drop a next/image inside each
 * frame (the aspect boxes are already sized for it).
 */
const WORKS = [
  { title: "Commission I", medium: "Mixed media on canvas", aspect: "aspect-[4/5]" },
  { title: "Commission II", medium: "Textured acrylic", aspect: "aspect-square" },
  { title: "Commission III", medium: "Hand-layered relief", aspect: "aspect-[4/5]" },
  { title: "Commission IV", medium: "Ink & gold leaf", aspect: "aspect-square" },
  { title: "Commission V", medium: "Sculpted canvas", aspect: "aspect-[4/5]" },
  { title: "Commission VI", medium: "Bespoke wall piece", aspect: "aspect-[4/5]" },
];

export default function Gallery() {
  const scope = useReveal<HTMLElement>({ stagger: 0.1 });

  return (
    <section
      ref={scope}
      id="gallery"
      aria-label="Featured works"
      className="relative bg-paper/60 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Featured Works" title="The Collection" />

        <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
          The atelier&rsquo;s latest commissions are being photographed —
          the collection unveils here soon.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {WORKS.map((work) => (
            <motion.article
              key={work.title}
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="gsap-reveal group cursor-pointer"
            >
              {/* Frame: brown outer, beige mat, cream canvas */}
              <div className="sheet-edge rounded-sm border-[6px] border-umber bg-paper p-4 sm:p-5 transition-shadow duration-300 group-hover:shadow-[0_18px_40px_-12px_rgba(44,20,5,0.35)]">
                <div
                  className={`${work.aspect} relative flex items-center justify-center overflow-hidden border border-umber/25 bg-cream`}
                >
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
                    <p className="font-script text-2xl text-umber/60">
                      {work.title}
                    </p>
                    <p className="mt-1 font-serif italic text-sm text-umber/50">
                      Awaiting unveiling
                    </p>
                  </div>
                  {/* Hover overlay info */}
                  <div className="absolute inset-0 flex items-end bg-royal/0 transition-colors duration-300 group-hover:bg-royal/85">
                    <div className="w-full translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <p className="font-script text-3xl text-lilac">
                        {work.title}
                      </p>
                      <p className="font-serif italic text-lilac/90">
                        {work.medium}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
