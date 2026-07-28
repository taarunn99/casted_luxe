"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";
import { useInViewVideo } from "@/lib/useInViewVideo";

/**
 * The brand reel on the About page — the seven-piece cinematic montage
 * playing as an ambient, muted, looping showcase with a corner unmute
 * control (the reel ships silent; the toggle is ready for an audio track).
 *
 * Placeholder sources (gallery ink film) are swapped to /reel/* once the
 * reel is generated. Keeps the existing scale-on-scroll entrance.
 */
export default function VideoSection() {
  const scope = useReveal<HTMLElement>();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [tier, setTier] = useState<"desktop" | "mobile" | null>(null);
  const [muted, setMuted] = useState(true);

  // The reel fetches + plays only when the frame nears the viewport
  useInViewVideo(videoRef);

  useEffect(() => {
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const portrait = window.matchMedia("(orientation: portrait)").matches;
    setTier(touch && portrait ? "mobile" : "desktop");
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Scale-on-scroll entrance, scrubbed by Lenis
      gsap.fromTo(
        frame,
        { scale: 0.92 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top 90%",
            end: "top 35%",
            scrub: true,
          },
        },
      );
    }, frame);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  };

  return (
    <section
      ref={scope}
      id="film"
      aria-label="Inside the atelier — film"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <SectionHeading eyebrow="Inside the Atelier" title="The Collection, in Motion" />

      <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
        Seven pieces, brought to life — a slow cinematic pass through the
        collection.
      </p>

      <div
        ref={frameRef}
        className="gsap-reveal sheet-edge mt-14 overflow-hidden rounded-xl border border-umber/40 bg-paper p-1.5 will-change-transform"
      >
        <div className="relative aspect-video overflow-hidden rounded-[3px] border border-umber/15 bg-ink">
          {tier && (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster="/reel/reel-poster.webp"
              muted
              loop
              playsInline
              preload="none"
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

          {/* Unmute / mute toggle */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute reel" : "Mute reel"}
            className="absolute bottom-3 right-3 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-cream ring-1 ring-cream/25 backdrop-blur-sm transition-colors duration-200 hover:bg-ink/85"
          >
            {muted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5z" />
                <path d="M22 9l-6 6M16 9l6 6" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
