"use client";

/**
 * PageTurn — Casted Luxe
 * The drawing sheet returns on every internal navigation: the moment the
 * route changes, the sheet covers the screen, a destination line is inked
 * into the corner, and the page is turned away — downward on one
 * navigation, upward on the next, alternating like leafing through a
 * sketchbook. (The first load belongs to SheetIntro.)
 *
 * Performance-first: display:none until a navigation happens (zero paint
 * cost), pointer-events:none always (never blocks a tap — INP safe), no
 * scroll lock, and prefers-reduced-motion skips it entirely.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const LINES: Record<string, string> = {
  "/": "Returning home",
  "/about": "Meeting the artist",
  "/gallery": "Unveiling the collection",
  "/contact": "Opening the conversation",
  "/terms": "Reading the fine print",
  "/privacy": "Guarding your trust",
};

export default function PageTurn() {
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isFirst = useRef(true);
  const flip = useRef(0);

  useEffect(() => {
    // The fresh-load reveal is SheetIntro's — start turning pages only
    // from the first internal navigation.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (prefersReducedMotion()) return;

    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text) return;

    text.textContent = LINES[pathname] ?? "Turning the page";

    // Alternate the turn: first nav sweeps down (top → bottom), the next
    // sweeps up, and so on.
    const dir = flip.current % 2 === 0 ? 1 : -1;
    flip.current += 1;

    const tl = gsap.timeline();
    tl.set(root, { display: "block", yPercent: 0, rotation: 0 });
    tl.fromTo(
      text,
      { clipPath: "inset(-20% 100% -20% 0)" },
      { clipPath: "inset(-20% 0% -20% 0)", duration: 0.5, ease: "power1.inOut" },
      0.05,
    );
    tl.to(
      root,
      {
        yPercent: dir * 106,
        rotation: dir * 1.2,
        duration: 0.95,
        ease: "power4.inOut",
        transformOrigin: dir === 1 ? "bottom center" : "top center",
      },
      "+=0.15",
    );
    tl.set(root, { display: "none" });

    return () => {
      tl.kill();
      gsap.set(root, { display: "none" });
    };
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{ display: "none" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[103svh] bg-paper will-change-transform shadow-[0_36px_80px_-12px_rgba(44,20,5,0.4)]"
    >
      {/* soft sheet lighting */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 38%, rgba(241,239,227,0.55) 0%, rgba(229,228,220,0) 55%, rgba(59,28,10,0.07) 100%)",
        }}
      />

      {/* pulp mottling — one light-weight texture pass */}
      <svg
        className="absolute inset-0 h-full w-full mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="turn-fibres" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="11"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.78
                    0 0 0 0 0.75
                    0 0 0 0 0.69
                    0 0 0 0.45 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#turn-fibres)" />
      </svg>

      {/* faint margin line */}
      <div className="absolute inset-y-0 left-10 hidden w-px bg-umber/10 sm:block" />

      {/* deckled edges — bottom for upward turns, top for downward turns */}
      <svg
        className="absolute -bottom-4 left-0 h-5 w-full text-paper"
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0 0h1200v6c-24 3-42 9-66 7s-38-8-62-6-40 9-64 9-40-10-64-9-40 8-64 7-40-8-64-7-40 9-64 9-40-9-64-9-40 8-64 7-40-8-64-6-40 9-64 9-40-10-64-9-40 8-64 6-40-8-64-7-40 9-64 9-40-9-64-8-38 7-58 6V0z"
        />
      </svg>
      <svg
        className="absolute -top-4 left-0 h-5 w-full rotate-180 text-paper"
        viewBox="0 0 1200 20"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0 0h1200v6c-24 3-42 9-66 7s-38-8-62-6-40 9-64 9-40-10-64-9-40 8-64 7-40-8-64-7-40 9-64 9-40-9-64-9-40 8-64 7-40-8-64-6-40 9-64 9-40-10-64-9-40 8-64 6-40-8-64-7-40 9-64 9-40-9-64-8-38 7-58 6V0z"
        />
      </svg>

      {/* the inked destination line, bottom-left */}
      <div className="absolute bottom-10 left-6 sm:bottom-14 sm:left-14">
        <p
          ref={textRef}
          className="font-script text-3xl text-ink sm:text-5xl [clip-path:inset(-20%_100%_-20%_0)]"
        />
      </div>
    </div>
  );
}
