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
    if (!enabled) return;

    // The <video> often mounts a tick later than this effect (it renders
    // only once the device tier resolves), so poll briefly until the
    // element exists before observing — otherwise the observer would
    // never attach and the film would sit on its poster forever.
    let io: IntersectionObserver | null = null;
    let tries = 0;
    let timer: number | undefined;

    const attach = () => {
      const video = ref.current;
      if (!video) {
        if (tries++ < 40) timer = window.setTimeout(attach, 50);
        return;
      }
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (video.paused) video.play().catch(() => {});
          } else {
            video.pause();
          }
        },
        // start fetching a moment before the section scrolls into view
        { rootMargin: "300px 0px" },
      );
      io.observe(video);
    };
    attach();

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [ref, enabled]);
}
