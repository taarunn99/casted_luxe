"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, LUXE_EASE } from "@/lib/gsap";
import Button from "@/components/ui/Button";

export default function Hero() {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".hero-item, .hero-flourish"), {
        opacity: 1,
        clearProps: "all",
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: LUXE_EASE } });

      tl.fromTo(
        ".hero-item",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.3, stagger: 0.18 },
        0.15,
      );

      // Flourish draws itself in like a pen stroke
      const path = el.querySelector<SVGPathElement>(".hero-flourish path");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(".hero-flourish", { opacity: 1 });
        tl.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
          0.7,
        );
      }

      // Gentle parallax drift of the headline as you scroll away
      gsap.to(".hero-parallax", {
        yPercent: -14,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      id="top"
      aria-label="Casted Luxe — introduction"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Soft lavender wash behind the headline */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lilac/70 blur-3xl"
      />

      <div className="hero-parallax relative z-10 flex flex-col items-center">
        <p className="hero-item font-serif italic text-xl sm:text-2xl tracking-[0.3em] uppercase text-umber/85 opacity-0">
          Atelier of Custom Art
        </p>

        <h1 className="hero-item mt-4 font-script text-7xl sm:text-8xl lg:text-9xl leading-[1.15] text-ink opacity-0">
          Casted Luxe
        </h1>

        {/* Hand-drawn flourish */}
        <svg
          className="hero-flourish mt-2 w-64 sm:w-80 opacity-0"
          viewBox="0 0 320 40"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 24 C 60 8, 110 34, 160 20 S 260 10, 312 22 M 140 30 C 155 34, 170 34, 184 29"
            stroke="#3a0f62"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        <p className="hero-item mt-6 max-w-xl font-serif text-2xl sm:text-3xl italic text-ink/90 opacity-0">
          Custom art pieces, handcrafted by{" "}
          <span className="text-royal not-italic font-semibold">Ashrat</span> —
          every piece a signature.
        </p>

        <div className="hero-item mt-10 flex flex-col sm:flex-row items-center gap-4 opacity-0">
          <Button href="#contact">Commission a Piece</Button>
          <Button href="#gallery" variant="outline">
            View the Works
          </Button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-item absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-2 text-umber/70">
          <span className="font-serif italic text-sm tracking-[0.25em] uppercase">
            Scroll
          </span>
          <svg
            width="18"
            height="26"
            viewBox="0 0 18 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            className="animate-bounce"
            aria-hidden="true"
          >
            <path d="M9 2v18M3 15l6 7 6-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
