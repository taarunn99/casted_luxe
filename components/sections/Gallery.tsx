"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/ui/Lightbox";

/**
 * The Collection — continuous colour-morph showcase (heyblackmagic-style).
 * Pieces live in normal scroll flow, one viewport each: the previous piece
 * slips away smaller above, the next rises from below, and the section
 * background crossfades to each piece's vibrant tone as it takes the
 * frame. Cards ease up to full size as they arrive and shrink gently as
 * they leave, so every scroll reads as an appearance — never a hijack.
 *
 * Each piece is a bento card: artwork on one side, name / story /
 * materials / craft tiles beside it, and per-piece commission CTAs
 * (WhatsApp, email enquiry). The tiles stretch to match the artwork's
 * height so the whole composition reads as one flush rectangle.
 *
 * Per-piece recipe (image prep, story voice, theme-colour rule) lives in
 * docs/gallery-pieces.md — follow it when the next artwork arrives.
 *
 * prefers-reduced-motion → static stacked list, no colour morph.
 */

const ENQUIRY_EMAIL = "tarun.s@lapizblue.com";
const WHATSAPP_NUMBER = "971558005474";

type Work = {
  title: string;
  numeral: string;
  style: string;
  medium: string;
  materials: string;
  size: string;
  story: string;
  craft: string;
  theme: string;
  image?: string;
  alt?: string;
  // "landscape" lifestyle shots are matted (shown whole) rather than
  // cropped to fill the portrait frame like the flat product photos.
  orientation?: "portrait" | "landscape";
};

const WORKS: Work[] = [
  {
    title: "Ocean in Six",
    numeral: "I",
    style: "Epoxy Wall Showpiece",
    medium: "Oil pastel & transparent epoxy on acrylic board",
    materials: "Acrylic board · Oil pastels · Transparent epoxy",
    size: "Set of six discs · Made to measure",
    story:
      "Six tides caught in glass — the shoreline's calm, poured still, for the wall your evenings gather around.",
    craft:
      "Drawn by hand in oil pastel, then flooded in transparent epoxy — every layer cured before the next, until the surface holds like deep water.",
    theme: "#0b2d4d", // deep marine navy — dark counterpoint to the satin sky-blue shoot
    image: "/gallery/ocean-in-six.webp",
    alt: "Ocean in Six — six glossy epoxy wall discs in layered ocean blues on sky-blue satin",
  },
  {
    title: "Drift & Ember",
    numeral: "II",
    style: "Epoxy Resin Diorama",
    medium: "Die-cast Porsche & tinted epoxy on gloss board",
    materials:
      "Gloss acrylic board · Sculpted volcanic rock · Molten-red epoxy · Die-cast 911 GT3 RS",
    size: "Framed panel · Made to measure",
    story:
      "A GT3 RS caught mid-drift on molten ground — adrenaline framed, for the room where your fastest stories live.",
    craft:
      "Volcanic rock hand-sculpted and scorched, molten-red epoxy poured into every fissure, the die-cast 911 set into a mirror-black flood and its drift-smoke teased from spun fibre.",
    theme: "#3d0b10", // deep oxblood — molten counterpoint to the crimson satin backdrop
    image: "/gallery/drift-and-ember.webp",
    alt: "Drift & Ember — a black Porsche 911 GT3 RS drifting across charred volcanic rock veined with molten-red epoxy, on crimson satin",
  },
  {
    title: "Nur",
    numeral: "III",
    style: "Contemporary Calligraphy",
    medium: "‘Light’ · Acrylic & gold leaf on canvas",
    materials:
      "Stretched canvas · Layered acrylic · Gold-leaf calligraphy · Silver float frame",
    size: "Framed canvas · Made to measure",
    story:
      "Gold scripture rising through a breaking sky — devotion made luminous, a centrepiece for the wall that gives a home its calm.",
    craft:
      "Sky and clouds built up in layered acrylic, the calligraphy hand-drawn stroke by stroke, and the central verse raised in gold leaf — set in a floating silver frame.",
    theme: "#211a4d", // midnight indigo-violet — gold-on-blue signature, counterpoint to the bronze satin
    image: "/gallery/nur.webp",
    alt: "Nur — contemporary Arabic calligraphy in gold rising over a deep indigo ground that opens into a turquoise, cloud-filled sky, in a silver float frame",
  },
  {
    title: "Golden Hour",
    numeral: "IV",
    style: "Textured Triptych",
    medium: "Gold leaf & textured acrylic on canvas",
    materials:
      "Three canvas panels · Textured acrylic · Gold leaf · Deep-ocean blues",
    size: "Triptych · Three panels · Made to measure",
    story:
      "Three panels of gilded surf that carry the coast indoors — the calm of a sunlit shore, hung where your home breathes widest.",
    craft:
      "Deep-ocean blues built up in textured relief beneath a poured gold-leaf horizon, across three canvases hung as one continuous tide.",
    theme: "#1c2a5e", // deep ocean indigo
    image: "/gallery/golden-hour.webp",
    alt: "Golden Hour — a gold-and-blue textured ocean triptych on the wall of a sunlit coastal room overlooking the sea at sunset",
    orientation: "landscape",
  },
  {
    title: "Oneness",
    numeral: "V",
    style: "Gilded Calligraphy",
    medium: "Gold leaf on deep-navy canvas, gilt-framed",
    materials:
      "Canvas · Deep-navy ground · Gold-leaf script · Gilt frame",
    size: "Framed square · Made to measure",
    story:
      "Gold scripture turning on midnight blue — a still point of faith for the corner where oud smoke and evening prayer gather.",
    craft:
      "The navy ground laid by hand, the verse drawn in a slow circle and raised in gold leaf, then set behind glass in a gilt frame.",
    theme: "#5a4718", // antique gold — warm counterpoint drawn from the gilt script
    image: "/gallery/oneness.webp",
    alt: "Oneness — a square gold Arabic calligraphy on deep navy in a gilt frame, above a carved wood console with a brass incense burner and amber prayer beads",
  },
  {
    title: "Andalus",
    numeral: "VI",
    style: "Alcohol Ink & Resin",
    medium: "Alcohol ink, gold & arabesque under resin",
    materials:
      "Round panel · Alcohol inks · Gold leaf · Arabesque stencil · Resin glaze",
    size: "Round panel · Made to measure",
    story:
      "Jewelled light pooled in resin beneath a lace of arabesque — a Moorish courtyard's colour, kept for the wall the sun visits.",
    craft:
      "Alcohol inks flooded and bloomed wet-into-wet, gold leaf drifted through, an arabesque lace stencilled over, then sealed under a deep resin glaze on a round panel.",
    theme: "#0e463c", // deep emerald — jewel tone drawn from the resin blooms
    image: "/gallery/andalus.webp",
    alt: "Andalus — a round jewel-toned alcohol-ink and resin artwork laced with white arabesque patterns, set in a Moorish arched sandstone niche with lattice light",
  },
];

const whatsappUrl = (work: Work) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    `Hello — I love ${work.title} (${work.style}) from the Casted Luxe gallery and would like to commission a similar piece.`,
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

/* Small expand glyph shown on hover/focus to hint the tile opens full view */
function ExpandIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

/* Artwork tile — photographed pieces render in the frame and open a
   full-definition lightbox on click; the rest keep the "Awaiting
   unveiling" placeholder until their photos arrive. */
function ArtworkTile({ work }: { work: Work }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  if (work.image) {
    // The frame's shape follows the image: portrait product shots fill a
    // tall 3:4 frame (and stretch to the column on desktop); landscape
    // lifestyle shots fill a wide 3:2 frame. Either way the image covers
    // the frame edge-to-edge — no letterboxing.
    const isLandscape = work.orientation === "landscape";

    return (
      <>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View ${work.title} in full`}
          className={`sheet-edge group relative flex min-h-0 cursor-zoom-in flex-col overflow-hidden rounded-xl border border-umber/40 bg-paper p-1.5 text-left ${
            isLandscape
              ? "aspect-[16/9]"
              : "aspect-[3/4] md:aspect-auto md:h-full"
          }`}
        >
          <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[3px] border border-umber/15 bg-cream">
            <Image
              src={work.image}
              alt={work.alt ?? work.title}
              fill
              sizes={isLandscape ? "(min-width: 768px) 48rem, 100vw" : "(min-width: 768px) 45vw, 100vw"}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />

            {/* Landscape lifestyle shots carry the piece name on the image
                itself, top-right, over a soft scrim — no separate name tile */}
            {isLandscape && (
              <div className="pointer-events-none absolute right-0 top-0 max-w-[78%] rounded-bl-3xl bg-gradient-to-bl from-ink/80 via-ink/45 to-transparent pb-10 pl-14 pr-4 pt-3 text-right sm:pr-6 sm:pt-4">
                <p className="font-serif text-[0.6rem] uppercase tracking-[0.3em] text-cream/85 sm:text-xs">
                  {work.numeral} — of six
                </p>
                <p className="mt-0.5 font-script text-3xl leading-tight text-cream sm:text-4xl">
                  {work.title}
                </p>
                <p className="mt-1 font-serif text-xs italic text-cream/85 sm:text-sm">
                  {work.medium}
                </p>
              </div>
            )}

            {/* Discoverability hint — fades in on hover/focus */}
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 font-serif text-xs tracking-wide text-cream opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <ExpandIcon />
              View full piece
            </span>
          </div>
        </button>

        <Lightbox
          open={open}
          onClose={() => {
            setOpen(false);
            triggerRef.current?.focus();
          }}
          src={work.image}
          alt={work.alt ?? work.title}
          caption={work.title}
        />
      </>
    );
  }

  return (
    <div className="sheet-edge flex aspect-[3/4] min-h-0 items-center justify-center overflow-hidden rounded-xl border border-umber/40 bg-paper p-1.5 md:aspect-auto md:h-full">
      <div className="flex h-full w-full items-center justify-center rounded-[3px] border border-umber/15 bg-cream">
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

/* ── Reusable bento tiles ── */

function NameTile({ work, className = "" }: { work: Work; className?: string }) {
  return (
    <div
      className={`sheet-edge rounded-2xl px-6 py-5 sm:px-8 sm:py-6 ${className}`}
      style={{ backgroundColor: work.theme }}
    >
      <p className="font-serif text-xs uppercase tracking-[0.3em] text-cream/70">
        {work.numeral} — of six
      </p>
      <h3 className="mt-2 font-script text-4xl text-cream sm:text-5xl">
        {work.title}
      </h3>
      <p className="mt-2 font-serif text-base italic text-cream/85 sm:text-lg">
        {work.medium}
      </p>
    </div>
  );
}

function StoryTile({ work, className = "" }: { work: Work; className?: string }) {
  return (
    <div
      className={`sheet-edge rounded-2xl bg-paper px-6 py-5 sm:px-8 sm:py-6 ${className}`}
    >
      <p className="font-serif text-xs uppercase tracking-[0.26em] text-umber/70">
        The story
      </p>
      <p className="mt-2 font-serif text-lg italic leading-relaxed text-ink sm:text-xl">
        {work.story}
      </p>
    </div>
  );
}

function DetailTile({
  label,
  value,
  prose = false,
  compact = false,
  className = "",
}: {
  label: string;
  value: string;
  prose?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`sheet-edge rounded-2xl bg-paper ${
        compact ? "px-4 py-3 sm:px-4 sm:py-3" : "px-5 py-4 sm:px-6 sm:py-5"
      } ${className}`}
    >
      <p className="font-serif text-[0.65rem] uppercase tracking-[0.26em] text-umber/70 sm:text-xs">
        {label}
      </p>
      <p
        className={
          prose
            ? `mt-1 font-serif leading-snug text-ink ${compact ? "text-[0.8rem] sm:text-sm" : "text-sm sm:text-base"}`
            : `mt-1 font-serif font-semibold leading-snug text-ink ${compact ? "text-sm sm:text-base" : "text-base sm:text-lg"}`
        }
      >
        {value}
      </p>
    </div>
  );
}

function CtaTile({ work, className = "" }: { work: Work; className?: string }) {
  return (
    <div
      className={`sheet-edge rounded-2xl bg-cream px-6 py-5 sm:px-8 sm:py-6 ${className}`}
    >
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
          Whisper to the Atelier
        </a>
        <a
          href={mailUrl(work)}
          className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-umber/60 px-5 py-2.5 font-serif text-base font-semibold tracking-wide text-ink transition-colors duration-200 hover:border-royal hover:text-royal"
        >
          Send an Enquiry
        </a>
      </div>
    </div>
  );
}

/* One bento composition. Two shapes:
   • Portrait pieces — a wide rectangle: tall artwork on the left, a column
     of name / story / detail / CTA tiles on the right, both stretched to
     the same height so it reads as one flush rectangle.
   • Landscape (lifestyle) pieces — a big SQUARE: the wide image fills a
     landscape frame across the top, and the tiles rearrange beneath it
     (name + story on one side, the four detail tiles on the other, CTA
     across the base) to fill the block out to a square. */
function BentoPiece({ work }: { work: Work }) {
  if (work.orientation === "landscape") {
    // Compact, one-viewport composition: the wide image (with the piece
    // name overlaid on it) sits on top, and the info packs tightly beneath
    // — story + CTA on one side, the four detail tiles 2×2 on the other.
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:gap-4">
        <ArtworkTile work={work} />

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:items-stretch">
          {/* Story + CTA */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <StoryTile work={work} className="flex-1" />
            <CtaTile work={work} />
          </div>

          {/* The four detail tiles, packed 2×2, compact to hold one viewport */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <DetailTile label="Materials" value={work.materials} compact />
            <DetailTile label="Art style" value={work.style} compact />
            <DetailTile label="Size" value={work.size} compact />
            <DetailTile label="The craft" value={work.craft} prose compact />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-7xl gap-3 sm:gap-4 md:grid-cols-[1fr_1.15fr] md:items-stretch">
      <ArtworkTile work={work} />

      <div className="flex flex-col gap-3 sm:gap-4">
        <NameTile work={work} />
        <StoryTile work={work} />

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <DetailTile label="Materials" value={work.materials} />
          <DetailTile label="Art style" value={work.style} />
        </div>

        <div className="grid grid-cols-[0.85fr_1.15fr] gap-3 sm:gap-4">
          <DetailTile label="Size" value={work.size} />
          <DetailTile label="The craft" value={work.craft} prose />
        </div>

        <CtaTile work={work} />
      </div>
    </div>
  );
}

export default function Gallery() {
  const scope = useReveal<HTMLElement>();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const ctx = gsap.context(() => {
      const pieces = gsap.utils.toArray<HTMLElement>("[data-piece]");

      pieces.forEach((piece) => {
        const card = piece.querySelector<HTMLElement>("[data-card]");

        // Appearance scrub: rises to full size as it arrives, recedes
        // smaller as it leaves — the neighbours read as previews.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: piece,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
          .fromTo(
            card,
            { y: 72, scale: 0.93 },
            { y: 0, scale: 1, ease: "power1.out", duration: 0.42 },
          )
          .to(
            card,
            { y: -72, scale: 0.95, ease: "power1.in", duration: 0.42 },
            0.58,
          );
      });
    }, section);

    // Background morph driven by real visibility: whichever piece is most
    // in view owns the section tone (its own `theme` — the contrast colour
    // pulled from that piece's palette). Using an IntersectionObserver keeps
    // the colour tied to what's actually on screen, so it never drifts to a
    // neighbour's colour the way fixed scroll-threshold triggers can when the
    // pinned hero and content-sized pieces shift the layout.
    const pieces = Array.from(
      section.querySelectorAll<HTMLElement>("[data-piece]"),
    );
    const ratios = new Map<Element, number>();
    let currentTheme = "";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target, e.intersectionRatio));

        let bestRatio = 0;
        let bestTheme = "";
        pieces.forEach((p) => {
          const r = ratios.get(p) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestTheme = p.dataset.theme ?? "";
          }
        });

        if (bestTheme && bestTheme !== currentTheme) {
          currentTheme = bestTheme;
          gsap.to(section, {
            backgroundColor: bestTheme,
            duration: 0.7,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    pieces.forEach((p) => io.observe(p));

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={(el) => {
        scope.current = el;
        sectionRef.current = el;
      }}
      id="gallery"
      aria-label="Featured works"
      className="relative bg-cream pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto max-w-7xl px-6 pb-6 sm:pb-10">
        <SectionHeading eyebrow="Featured Works" title="The Collection" />

        <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
          Six original commissions, each one made to be lived with —
          scroll to wander the collection.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {WORKS.map((work) => (
          <article
            key={work.title}
            data-piece
            data-theme={work.theme}
            className="flex min-h-[92svh] items-center justify-center py-8"
          >
            <div data-card className="w-full">
              <BentoPiece work={work} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
