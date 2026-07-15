"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, LUXE_EASE } from "@/lib/gsap";

/**
 * Scroll-reveal for a section: every `.gsap-reveal` inside the returned
 * ref fades + rises in with a stagger when the section enters the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: { y?: number; stagger?: number; start?: string } = {},
) {
  const scope = useRef<T | null>(null);
  const { y = 48, stagger = 0.12, start = "top 78%" } = options;

  useEffect(() => {
    const el = scope.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(".gsap-reveal");
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: LUXE_EASE,
          stagger,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start]);

  return scope;
}

export { gsap, ScrollTrigger };
