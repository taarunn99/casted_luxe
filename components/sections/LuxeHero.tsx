"use client";

/**
 * LuxeHero — Casted Luxe
 * Full-bleed hero with the bas-relief motion video, "Eternally Yours" centered,
 * and a scroll-driven parallax / fade sequence.
 *
 * Zero dependencies. Optimised:
 *  - video only plays when in view (IntersectionObserver)
 *  - rAF-throttled scroll handler, passive listener
 *  - poster + <Image> fallback, so LCP is the still image, not the video
 *  - prefers-reduced-motion → static image, no scroll effects
 *
 * Files expected in /public:
 *  /hero/hero-poster.webp   (optimised still of the bas-relief)
 *  /hero/hero.webm          (VP9/AV1, primary)
 *  /hero/hero.mp4           (H.264, fallback)
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./luxe-hero.module.css";

export default function LuxeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Play/pause video only while hero is on screen (saves battery + CPU)
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reducedMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [reducedMotion]);

  // Scroll-driven animation: parallax video, text drift + fade, cream veil in
  useEffect(() => {
    if (reducedMotion) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const section = sectionRef.current;
      if (!section) return;
      const h = section.offsetHeight;
      // 0 at top of page → 1 when hero fully scrolled past
      const p = Math.min(Math.max(window.scrollY / h, 0), 1);

      if (mediaRef.current) {
        // Video scrolls at half speed and gently scales — the "luxury drift"
        mediaRef.current.style.transform = `translate3d(0, ${p * 50}vh, 0) scale(${1 + p * 0.06})`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${p * -12}vh, 0)`;
        contentRef.current.style.opacity = String(1 - Math.min(p * 1.6, 1));
      }
      if (veilRef.current) {
        // Cream veil eases in near the end so the next section melts in
        veilRef.current.style.opacity = String(Math.max((p - 0.55) / 0.45, 0));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className={styles.hero}
      aria-label="Casted Luxe — introduction"
    >
      <div ref={mediaRef} className={styles.media}>
        {/* Poster renders instantly = fast LCP; video fades over it when ready */}
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
            className={`${styles.video} ${loaded ? styles.videoVisible : ""}`}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero/hero-poster.webp"
            onCanPlay={() => setLoaded(true)}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className={styles.tint} />
      </div>

      <div ref={contentRef} className={styles.content}>
        <p className={styles.eyebrow}>Casted Luxe · Atelier of Custom Art</p>
        <h1 className={styles.quote}>
          Eternally <em>Yours</em>
        </h1>
        <div className={styles.rule} />
        <p className={styles.sub}>
          Handcrafted by Ashrat&ensp;·&ensp;Every Piece a Signature
        </p>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>

      <div ref={veilRef} className={styles.veil} aria-hidden="true" />
    </section>
  );
}
