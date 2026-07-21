"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger.
 * Lenis drives the scroll position; ScrollTrigger listens to it,
 * and GSAP's ticker drives Lenis' rAF loop for perfect sync.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return; // native scroll for reduced motion

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out glide
      smoothWheel: true,
      // Touch stays NATIVE: Lenis's synthetic touch (syncTouch) hard-locks
      // scrolling on iOS WebKit with pinned sections. Phone smoothness comes
      // from the eased scrub (0.7) + the video seek lerp instead.
      touchMultiplier: 1.5,
      anchors: true, // smooth-scroll #anchor links
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
