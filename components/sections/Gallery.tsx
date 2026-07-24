"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The Collection — stepped showcase.
 * The stage pins for the whole collection; each scroll step dissolves the
 * current piece away and materialises the next (an appearance, not a
 * scroll-past), while the page background tweens to that piece's tone.
 * Every piece is a bento card: artwork on one side, name / art style /
 * detail tiles beside it, and per-piece commission CTAs (WhatsApp Hamdan,
 * email enquiry).
 *
 * prefers-reduced-motion → no pin, all pieces stacked and visible.
 * Artwork tiles are placeholders until the photographs arrive.
 */

const ENQUIRY_EMAIL = "tarun.s@lapizblue.com";
const WHATSAPP_NUMBER = "971558005474"; // Hamdan

const WORKS = [
  {
    title: "Commission I",
    numeral: "I",
    style: "Bas-Relief Impasto",
    medium: "Mixed media on canvas",
    size: "Made to measure",
    theme: "#f1efe3",
  },
  {
    title: "Commission II",
    numeral: "II",
    style: "Textured Abstract",
    medium: "Textured acrylic",
    size: "Made to measure",
    theme: "#ece4fa",
  },
  {
    title: "Commission III",
    numeral: "III",
    style: "Layered Relief",
    medium: "Hand-layered relief",
    size: "Made to measure",
    theme: "#e7dccb",
  },
  {
    title: "Commission IV",
    numeral: "IV",
    style: "Ink & Gilding",
    medium: "Ink & gold leaf",
    size: "Made to measure",
    theme: "#dde3d5",
  },
  {
    title: "Commission V",
    numeral: "V",
    style: "Sculptural Canvas",
    medium: "Sculpted canvas",
    size: "Made to measure",
    theme: "#ecdcd5",
  },
  {
    title: "Commission VI",
    numeral: "VI",
    style: "Mixed Media Assemblage",
    medium: "Bespoke wall piece",
    size: "Made to measure",
    theme: "#ded8e6",
  },
];

type Work = (typeof WORKS)[number];

const whatsappUrl = (work: Work) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    `Hello Hamdan — I love ${work.title} (${work.style}) from the Casted Luxe gallery and would like to commission a similar piece.`,
  );

const mailUrl = (work: Work) =>
  `mailto:${ENQUIRY_EMAIL}?subject=` +
  encodeURIComponent(`Commission enquiry — ${work.title}`) +
  "&body=" +
  encodeURIComponent(
    `Hello,\n\nI'd love a piece in the spirit of ${work.title} (${work.style}). Here's what I have in mind:\n\n`,
  );

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/* Placeholder artwork tile — swap for next/image when the photos arrive */
function ArtworkTile({ work }: { work: Work }) {
  return (
    <div className="sheet-edge flex h-full min-h-0 items-center justify-center overflow-hidden rounded-2xl border-[5px] border-umber bg-paper p-3 sm:p-5">
      <div className="flex h-full w-full items-center justify-center border border-umber/25 bg-cream">
        <div className="px-6 text-center">
          <svg
            className="mx-auto mb-3 text-umber/40"
            width="40"
            height="40"
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
          <p className="mt-1 font-serif text-sm italic text-umber/50">
            Awaiting unveiling
          </p>
        </div>
      </div>
    </div>
  );
}

/* One bento composition — artwork beside name / style / CTA tiles */
function BentoPiece({ work }: { work: Work }) {
  return (
    <div className="grid h-full min-h-0 w-full max-w-6xl grid-rows-[minmax(0,1fr)_auto] gap-3 sm:gap-4 md:grid-cols-[1.05fr_0.95fr] md:grid-rows-1">
      <ArtworkTile work={work} />

      <div className="flex min-h-0 flex-col justify-center gap-3 sm:gap-4">
        {/* Name tile — takes the piece's own tone */}
        <div
          className="sheet-edge rounded-2xl px-6 py-5 sm:px-8 sm:py-7"
          style={{ backgroundColor: work.theme }}
        >
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-umber/70">
            {work.numeral} — of six
          </p>
          <h3 className="mt-2 font-script text-4xl text-ink sm:text-5xl">
            {work.title}
          </h3>
          <p className="mt-2 font-serif text-base italic text-umber sm:text-lg">
            {work.medium}
          </p>
        </div>

        {/* Detail tiles */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="sheet-edge rounded-2xl bg-paper px-5 py-4 sm:px-6 sm:py-5">
            <p className="font-serif text-xs uppercase tracking-[0.26em] text-umber/70">
              Art style
            </p>
            <p className="mt-1.5 font-serif text-base font-semibold leading-snug text-ink sm:text-lg">
              {work.style}
            </p>
          </div>
          <div className="sheet-edge rounded-2xl bg-paper px-5 py-4 sm:px-6 sm:py-5">
            <p className="font-serif text-xs uppercase tracking-[0.26em] text-umber/70">
              Size
            </p>
            <p className="mt-1.5 font-serif text-base font-semibold leading-snug text-ink sm:text-lg">
              {work.size}
            </p>
          </div>
        </div>

        {/* CTA tile — per-piece commission actions */}
        <div className="sheet-edge rounded-2xl bg-cream px-6 py-5 sm:px-8 sm:py-6">
          <p className="font-serif text-lg italic text-ink sm:text-xl">
            Want a similar piece for yourself?
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <a
              href={whatsappUrl(work)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#128C4B] px-5 py-2.5 font-serif text-base font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#0b6b38]"
            >
              <WhatsAppIcon />
              WhatsApp Hamdan
            </a>
            <a
              href={mailUrl(work)}
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-umber/60 px-5 py-2.5 font-serif text-base font-semibold tracking-wide text-ink transition-colors duration-200 hover:border-royal hover:text-royal"
            >
              Send an Enquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const scope = useReveal<HTMLElement>();
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || reducedMotion) return;

    const pieces = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-piece]"),
    );
    let current = 0;

    const ctx = gsap.context(() => {
      // All pieces stacked; only the first is visible at rest
      gsap.set(pieces.slice(1), { autoAlpha: 0 });

      // Step-change: outgoing piece dissolves away, incoming materialises.
      // Tween-based (not scrubbed) so each step reads as an appearance and
      // any landing scroll position still shows a fully-formed piece.
      const goTo = (idx: number, dir: number) => {
        if (idx === current) return;
        const prev = current;
        current = idx;
        setActive(idx);

        gsap.to(pieces[prev], {
          autoAlpha: 0,
          y: dir > 0 ? -44 : 44,
          scale: 0.985,
          duration: 0.4,
          ease: "power2.in",
          overwrite: "auto",
        });
        gsap.fromTo(
          pieces[idx],
          { autoAlpha: 0, y: dir > 0 ? 56 : -56, scale: 0.99 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            delay: 0.16,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
        gsap.to(section, {
          backgroundColor: WORKS[idx].theme,
          duration: 0.9,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: `+=${WORKS.length * 85}%`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            WORKS.length - 1,
            Math.round(self.progress * (WORKS.length - 1)),
          );
          goTo(idx, self.direction);
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={(el) => {
        scope.current = el;
        sectionRef.current = el;
      }}
      id="gallery"
      aria-label="Featured works"
      className="relative bg-cream pt-28 sm:pt-36"
    >
      <div className="mx-auto max-w-7xl px-6 pb-10 sm:pb-14">
        <SectionHeading eyebrow="Featured Works" title="The Collection" />

        <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
          The atelier&rsquo;s latest commissions are being photographed —
          the collection unveils here soon.
        </p>
      </div>

      {reducedMotion ? (
        /* Reduced motion: simple stacked flow, everything visible */
        <div className="mx-auto max-w-6xl space-y-16 px-6 pb-28">
          {WORKS.map((work) => (
            <article key={work.title} className="h-[80svh] min-h-[520px]">
              <BentoPiece work={work} />
            </article>
          ))}
        </div>
      ) : (
        /* Pinned stage: each scroll step summons the next piece */
        <div ref={stageRef} className="relative h-svh min-h-[600px]">
          {WORKS.map((work, i) => (
            <article
              key={work.title}
              data-piece
              aria-hidden={i !== active}
              className="absolute inset-0 flex items-center justify-center px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24"
            >
              <BentoPiece work={work} />
            </article>
          ))}

          {/* Progress marker */}
          <div
            className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-serif text-sm tracking-[0.3em] text-umber/80"
            aria-live="polite"
          >
            {WORKS[active].numeral}&thinsp;/&thinsp;VI
          </div>
        </div>
      )}
    </section>
  );
}
