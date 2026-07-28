"use client";

/**
 * SheetIntro — Casted Luxe
 * A beige drawing sheet covers the site on every visit. "Crafting your
 * experience" is written into the bottom-left corner as if by an ink pen,
 * then the whole sheet pulls up like a page being turned, revealing the
 * site beneath. Scroll is locked while the sheet is down.
 *
 * Built from scratch: GSAP timeline + inline SVG grain + a deckled lower
 * edge. prefers-reduced-motion → a simple quick fade instead.
 */

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function SheetIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const nibRef = useRef<HTMLSpanElement>(null);
  const flourishRef = useRef<SVGPathElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("intro-lock");
    const unlock = () => document.documentElement.classList.remove("intro-lock");

    // Failsafe: no matter what happens to the timeline, the page can
    // never stay locked — the lock dissolves after 7s regardless.
    const failsafe = window.setTimeout(unlock, 7000);

    if (prefersReducedMotion()) {
      const tween = gsap.to(root, {
        opacity: 0,
        duration: 0.5,
        delay: 0.6,
        ease: "power1.out",
        onComplete: () => {
          unlock();
          setDone(true);
        },
      });
      return () => {
        window.clearTimeout(failsafe);
        tween.kill();
        unlock();
      };
    }

    const flourish = flourishRef.current;
    const flourishLen = flourish ? flourish.getTotalLength() : 0;

    const tl = gsap.timeline({
      onComplete: () => {
        unlock();
        setDone(true);
      },
    });
    tl.timeScale(1.5);

    // The line is "written" left → right; a nib dot leads the stroke
    tl.fromTo(
      textRef.current,
      { clipPath: "inset(-20% 100% -20% 0)" },
      { clipPath: "inset(-20% 0% -20% 0)", duration: 1.6, ease: "power1.inOut" },
      0.4,
    );
    tl.fromTo(
      nibRef.current,
      { left: "0%", opacity: 1 },
      { left: "100%", duration: 1.6, ease: "power1.inOut" },
      0.4,
    ).to(nibRef.current, { opacity: 0, duration: 0.2 }, ">-0.1");

    // A small pen flourish underlines the words
    if (flourish) {
      tl.set(flourish, { strokeDasharray: flourishLen }, 0);
      tl.fromTo(
        flourish,
        { strokeDashoffset: flourishLen },
        { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" },
        "-=0.15",
      );
    }

    // The sheet is pulled up like a turned page
    tl.to(
      root,
      {
        yPercent: -106,
        rotation: -1.2,
        duration: 1.3,
        ease: "power4.inOut",
        transformOrigin: "top center",
      },
      "+=0.5",
    );

    return () => {
      window.clearTimeout(failsafe);
      tl.kill();
      unlock();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-sheet-intro
      className="fixed inset-x-0 top-0 z-[80] h-[103svh] bg-paper will-change-transform shadow-[0_36px_80px_-12px_rgba(44,20,5,0.4)]"
    >
      {/* soft sheet lighting — lighter heart, gently darker edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 38%, rgba(241,239,227,0.55) 0%, rgba(229,228,220,0) 55%, rgba(59,28,10,0.07) 100%)",
        }}
      />

      {/* drawing-sheet texture — coarse pulp mottling + visible fine grain */}
      <svg
        className="absolute inset-0 h-full w-full mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="sheet-fibres" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="7"
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
        <filter id="sheet-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.72
                    0 0 0 0 0.69
                    0 0 0 0 0.62
                    0 0 0 0.5 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#sheet-fibres)" />
        <rect width="100%" height="100%" filter="url(#sheet-grain)" opacity="0.55" />
      </svg>

      {/* faint margin line — a real drawing sheet detail */}
      <div className="absolute inset-y-0 left-10 hidden w-px bg-umber/10 sm:block" />

      {/* deckled lower edge of the sheet */}
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

      {/* the inked line, bottom-left */}
      <div className="absolute bottom-10 left-6 sm:bottom-14 sm:left-14">
        <div className="relative inline-block">
          <p
            ref={textRef}
            className="font-script text-3xl sm:text-5xl text-ink pr-2 [clip-path:inset(-20%_100%_-20%_0)]"
          >
            Crafting your experience
          </p>
          {/* the "nib" — a small ink dot that travels as the line is written */}
          <span
            ref={nibRef}
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink opacity-0"
          />
        </div>
        <svg
          className="mt-1 w-40 sm:w-56"
          viewBox="0 0 220 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            ref={flourishRef}
            d="M4 9 C 40 3, 80 12, 120 7 S 190 4, 216 8"
            stroke="var(--ink)"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
