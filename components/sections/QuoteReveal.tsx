"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useInViewVideo } from "@/lib/useInViewVideo";
import styles from "./quote-reveal.module.css";

/**
 * The brand-reel finale on the home page (last section before the footer).
 * A huge quote — "Made to be lived with." — sits over a tiny video square
 * playing the seven-piece reel in a dark aesthetic. Scrolling pins the
 * section and expands the square's clip-path mask to full bleed while the
 * quote dissolves; the reel then loops full-bleed until the pin releases
 * into the footer.
 *
 * Same mask technique as GalleryHero. The <video> renders only once `tier`
 * resolves, and the timeline waits for it (tier in deps) so it never tweens
 * a null target.
 *
 * prefers-reduced-motion → static: the reel plays contained, quote shown,
 * no pin / scrub.
 */

const PIN_DESKTOP = "+=200%";
const PIN_TOUCH = "+=140%";

// The small square starts on the RIGHT of the quote — the pair reads as
// one centred composition on the dark ground — then blooms to full bleed.
const CLIP_START_DESKTOP = "inset(39% 15% 39% 69% round 0.9rem)";
const CLIP_START_TOUCH = "inset(41% 6% 41% 60% round 0.75rem)";
const CLIP_END = "inset(0% 0% 0% 0% round 0rem)";

export default function QuoteReveal() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const washRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLHeadingElement | null>(null);
  const mantraRef = useRef<HTMLParagraphElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tier, setTier] = useState<"desktop" | "mobile" | null>(null);

  // The reel fetches + plays only when the section nears the viewport
  useInViewVideo(videoRef, !reducedMotion);

  useEffect(() => {
    setReducedMotion(prefersReducedMotion());
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    setTier(touch && portrait ? "mobile" : "desktop");
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    // wait for tier so the <video> ref exists before the timeline captures it
    if (!section || reducedMotion || !tier) return;

    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    // The box geometry must agree with the CSS quote position, which
    // switches on width — not pointer — so narrow windows of any kind
    // (phones, split-screen desktops, iPads) get the compact composition.
    const isCompact = window.matchMedia("(max-width: 767px)").matches;

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

      // the tiny square blooms to full bleed
      tl.fromTo(
        frameRef.current,
        { clipPath: isCompact ? CLIP_START_TOUCH : CLIP_START_DESKTOP },
        { clipPath: CLIP_END, duration: 0.82, ease: "power2.inOut" },
        0.05,
      );

      // camera pull-back: the film settles as the mask opens
      tl.fromTo(
        mediaRef.current,
        { scale: 1.25 },
        { scale: 1, duration: 0.9, ease: "power1.out" },
        0.05,
      );

      // dark veil lifts, the reel comes to life
      tl.fromTo(
        washRef.current,
        { opacity: 0.82 },
        { opacity: 0.26, duration: 0.7, ease: "power1.in" },
        0.2,
      );

      // the quote dissolves before the reel owns the frame
      tl.to(
        quoteRef.current,
        { opacity: 0, y: -44, scale: 0.965, duration: 0.34, ease: "power2.in" },
        0.26,
      );

      // deep in the scroll, the second beat surfaces over the film —
      // three words arriving line by line, right-most aligned
      const lines = mantraRef.current
        ? Array.from(mantraRef.current.children)
        : [];
      lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power1.out" },
          0.62 + i * 0.11,
        );
      });

      // scroll cue dies the instant the visitor scrolls
      tl.to(hintRef.current, { opacity: 0, duration: 0.03, ease: "none" }, 0.004);
    }, section);

    return () => ctx.revert();
  }, [reducedMotion, tier]);

  return (
    <section
      ref={sectionRef}
      aria-label="Made to be lived with — the collection in motion"
      className={styles.hero}
    >
      <div ref={frameRef} className={styles.frame}>
        <div ref={mediaRef} className={styles.mediaInner}>
          {tier && (
            <video
              ref={videoRef}
              className={styles.video}
              poster="/reel/reel-poster.webp"
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
            >
              {tier === "mobile" ? (
                <>
                  <source
                    src="/reel/reel-720p-hevc.mp4"
                    type='video/mp4; codecs="hvc1"'
                  />
                  <source src="/reel/reel-720p.mp4" type="video/mp4" />
                </>
              ) : (
                <source src="/reel/reel.mp4" type="video/mp4" />
              )}
            </video>
          )}
          <div ref={washRef} className={styles.wash} aria-hidden="true" />
        </div>
      </div>

      <h2 ref={quoteRef} className={styles.quote}>
        Made to be <em>lived&nbsp;with.</em>
      </h2>

      <p ref={mantraRef} className={styles.mantra} aria-hidden="true">
        <span className={styles.mantraLine}>Timeless.</span>
        <span className={styles.mantraLine}>Handcrafted.</span>
        <span className={`${styles.mantraLine} ${styles.mantraForever}`}>
          <em>Forever.</em>
        </span>
      </p>

      {!reducedMotion && (
        <div ref={hintRef} className={styles.scrollHint} aria-hidden="true">
          <div className={styles.scrollHintInner}>
            <span>Scroll</span>
            <i />
          </div>
        </div>
      )}
    </section>
  );
}
