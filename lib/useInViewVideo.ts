"use client";

import { useEffect, type RefObject } from "react";

/**
 * Defers a muted looping video until it matters: with preload="none" on
 * the element, nothing is downloaded at page load — the video starts
 * fetching and playing only when it nears the viewport, and pauses again
 * when it leaves. Keeps below-the-fold films from competing with the
 * hero on mobile connections (Core Web Vitals friendly).
 */
export function useInViewVideo(
  ref: RefObject<HTMLVideoElement | null>,
  enabled = true,
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || !enabled) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      // start fetching a moment before the section scrolls into view
      { rootMargin: "300px 0px" },
    );

    io.observe(video);
    return () => io.disconnect();
  }, [ref, enabled]);
}
