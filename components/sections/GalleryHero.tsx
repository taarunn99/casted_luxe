"use client";

/**
 * GalleryHero — Casted Luxe
 * Pinned, scroll-scrubbed opener for the gallery (Spectra-style):
 * the atelier film sits as a small rounded card beneath an oversized
 * editorial headline; scrolling expands the card's mask to full bleed
 * while a royal-lilac colour wash dissolves into the plaster's natural
 * warmth and the film settles out of its push-in.
 *
 * Mask technique: the media layer is full-bleed from the first frame;
 * a clip-path inset is what reads as the "card", so the expansion is
 * pure GPU mask — no layout, corners stay crisp the whole way.
 *
 * prefers-reduced-motion → static mid-size card, everything visible,
 * no pin.
 */

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import styles from "./gallery-hero.module.css";

// Scroll distance the hero stays pinned — shorter on touch so the
// reveal completes in a couple of swipes.
const PIN_DESKTOP = "+=220%";
const PIN_TOUCH = "+=145%";

// Mask states: small framed card → full bleed.
const CLIP_START_DESKTOP = "inset(24% 19% round 1.6rem)";
const CLIP_START_TOUCH = "inset(29% 8% round 1.1rem)";
const CLIP_END = "inset(0% 0% round 0rem)";

export default function GalleryHero() {
  const scope = useReveal<HTMLElement>({ y: 34, stagger: 0.16 });
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tier, setTier] = useState<"desktop" | "mobile" | null>(null);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    // Resolution/orientation-tiered film: portrait touch devices (phones)
    // get a 9:16 centre-crop encode — HEVC first (~40% lighter, native on
    // iOS), H.264 high-profile fallback. Everything else keeps the 1080p
    // master untouched.
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    setTier(touch && portrait ? "mobile" : "desktop");
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isTouch ? PIN_TOUCH : PIN_DESKTOP,
          scrub: isTouch ? 0.3 : 0.7,
          pin: true,
          anticipatePin: 1,
        },
      });

      // The mask blooms from framed card to full bleed
      tl.fromTo(
        frameRef.current,
        { clipPath: isTouch ? CLIP_START_TOUCH : CLIP_START_DESKTOP },
        { clipPath: CLIP_END, duration: 0.78, ease: "power1.inOut" },
        0.06,
      );

      // Camera pull-back: the film settles as the mask opens
      tl.fromTo(
        mediaRef.current,
        { scale: 1.22 },
        { scale: 1, duration: 0.86, ease: "power1.out" },
        0.06,
      );

      // Colour morph: the dark veil lifts and the pigment blooms into
      // full colour as the mask opens
      tl.fromTo(
        washRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.7, ease: "power1.in" },
        0.18,
      );
      if (!isTouch) {
        // Desktop gets the full desaturate-to-vivid ramp; filters over a
        // playing film are too costly on mobile GPUs, where the veil
        // alone carries the effect.
        tl.fromTo(
          videoRef.current,
          { filter: "saturate(0.3) brightness(0.72)" },
          { filter: "saturate(1) brightness(1)", duration: 0.7, ease: "power1.in" },
          0.18,
        );
      }

      // The small labels bow out once the film owns the frame
      tl.to(
        topBarRef.current,
        { opacity: 0, y: -16, duration: 0.16, ease: "power1.in" },
        0.72,
      );

      // The scroll cue dies the instant the visitor starts scrolling
      tl.to(hintRef.current, { opacity: 0, duration: 0.03, ease: "none" }, 0.004);
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={(el) => {
        scope.current = el;
        sectionRef.current = el;
      }}
      aria-label="The gallery — introduction"
      className={styles.hero}
    >
      <div ref={frameRef} className={styles.frame}>
        <div ref={mediaRef} className={styles.mediaInner}>
          {tier && (
            <video
              ref={videoRef}
              className={styles.video}
              poster={
                tier === "mobile"
                  ? "/gallery/ink-poster-portrait.webp"
                  : "/gallery/ink-poster.webp"
              }
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              tabIndex={-1}
            >
              {tier === "mobile" ? (
                <>
                  <source
                    src="/gallery/ink-720p-hevc.mp4"
                    type='video/mp4; codecs="hvc1"'
                  />
                  <source src="/gallery/ink-720p.mp4" type="video/mp4" />
                </>
              ) : (
                <source src="/gallery/ink.mp4" type="video/mp4" />
              )}
            </video>
          )}
          <div ref={washRef} className={styles.wash} aria-hidden="true" />
        </div>
      </div>

      <div ref={topBarRef} className={styles.topBar}>
        <p className={`${styles.eyebrow} gsap-reveal`}>The Gallery</p>
        <p className={`${styles.counter} gsap-reveal`} aria-label="Six commissions">
          I&thinsp;—&thinsp;VI
        </p>
      </div>

      <h1 className={`${styles.headline} gsap-reveal`}>
        Every piece, <em>a&nbsp;signature.</em>
      </h1>

      {!reducedMotion && (
        <div ref={hintRef} className={styles.scrollHint} aria-hidden="true">
          <div className={styles.scrollHintInner}>
            <span>Scroll to unveil</span>
            <i />
          </div>
        </div>
      )}
    </section>
  );
}
