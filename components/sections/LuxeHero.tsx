"use client";

/**
 * LuxeHero — Casted Luxe
 * Pinned, scroll-scrubbed hero: the bas-relief film plays *with* the scroll
 * (not on loop), the text materialises in stages — "Eternally Yours" first,
 * then the eyebrow and signature lines — and a cream veil melts the section
 * into the gallery beneath.
 *
 * Scrub technique: ScrollTrigger drives a target time; a gsap.ticker lerp
 * eases video.currentTime toward it so seeking stays silky under Lenis.
 * The mp4 is encoded all-intra (every frame a keyframe) for instant seeks.
 *
 * prefers-reduced-motion → static poster, all text visible, no pin.
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import styles from "./luxe-hero.module.css";

const PIN_LENGTH = "+=260%"; // scroll distance the hero stays pinned

export default function LuxeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || reducedMotion) return;

    let targetTime = 0;

    const ctx = gsap.context(() => {
      // Master pinned timeline — everything is scroll-driven.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: PIN_LENGTH,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const v = videoRef.current;
            if (v && v.duration) {
              // leave a hair of headroom so we never seek past the last frame
              targetTime = self.progress * (v.duration - 0.06);
            }
          },
        },
      });

      // Slow push-in on the film while pinned
      tl.fromTo(mediaRef.current, { scale: 1.0 }, { scale: 1.08, duration: 1 }, 0);

      // Stage 1 — "Eternally Yours" rises out of the marble
      tl.fromTo(
        quoteRef.current,
        { opacity: 0, y: 46 },
        { opacity: 1, y: 0, duration: 0.16, ease: "power1.out" },
        0.04,
      );

      // Stage 2 — the top and bottom lines follow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power1.out" },
        0.2,
      );
      tl.fromTo(
        ruleRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.08, ease: "power1.out" },
        0.24,
      );
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.1, ease: "power1.out" },
        0.27,
      );

      // Stage 3 — the composition holds, then lifts away
      tl.to(
        contentRef.current,
        { opacity: 0, y: -70, duration: 0.22, ease: "power1.in" },
        0.72,
      );

      // Stage 4 — cream veil melts the film into the gallery beneath
      tl.to(veilRef.current, { opacity: 1, duration: 0.18 }, 0.82);

      // The scroll cue dies the instant the visitor starts scrolling
      tl.to(hintRef.current, { opacity: 0, duration: 0.03, ease: "none" }, 0.004);
    }, section);

    // Silky video scrub: ease currentTime toward the scroll target each tick
    const smoothSeek = () => {
      const v = videoRef.current;
      if (!v || !v.duration || v.seeking) return;
      const next = v.currentTime + (targetTime - v.currentTime) * 0.14;
      if (Math.abs(next - v.currentTime) > 0.002) v.currentTime = next;
    };
    gsap.ticker.add(smoothSeek);

    // iOS/Safari won't allow programmatic seeking until playback is "blessed";
    // a muted play()+pause() on load unlocks frame-accurate scrubbing.
    const unlock = () => {
      video?.play().then(() => video.pause()).catch(() => {});
    };
    video?.addEventListener("loadedmetadata", unlock, { once: true });

    return () => {
      gsap.ticker.remove(smoothSeek);
      video?.removeEventListener("loadedmetadata", unlock);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className={styles.hero}
      aria-label="Casted Luxe — introduction"
    >
      <div ref={mediaRef} className={styles.media}>
        {/* Poster renders instantly = fast LCP; the film sits over it */}
        <Image
          src="/hero/hero-poster.webp"
          alt="Bas-relief sculpture of birds and flowers in cream plaster"
          fill
          preload
          sizes="100vw"
          className={styles.poster}
        />
        {!reducedMotion && (
          <video
            ref={videoRef}
            className={styles.video}
            muted
            playsInline
            preload="auto"
            poster="/hero/hero-poster.webp"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className={styles.tint} />
      </div>

      <div ref={contentRef} className={styles.content}>
        {/* Soft cream bokeh so the type always clears the marble */}
        <div className={styles.bokeh} aria-hidden="true" />
        <div className={styles.bokehSmall} aria-hidden="true" />

        <p ref={eyebrowRef} className={`${styles.eyebrow} gsap-reveal`}>
          Casted Luxe · Atelier of Custom Art
        </p>
        <h1 ref={quoteRef} className={`${styles.quote} gsap-reveal`}>
          Eternally <em>Yours</em>
        </h1>
        <div ref={ruleRef} className={`${styles.rule} gsap-reveal`} />
        <p ref={subRef} className={`${styles.sub} gsap-reveal`}>
          Handcrafted by Ashrat&ensp;·&ensp;Every Piece a Signature
        </p>
      </div>

      {!reducedMotion && (
        <div ref={hintRef} className={styles.scrollHint} aria-hidden="true">
          <div className={styles.scrollHintInner}>
            <span>Scroll to reveal</span>
            <i />
          </div>
        </div>
      )}

      <div ref={veilRef} className={styles.veil} aria-hidden="true" />
    </section>
  );
}
