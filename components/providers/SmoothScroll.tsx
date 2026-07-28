"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis smooth scrolling synced with GSAP ScrollTrigger.
 * Lenis drives the scroll position; ScrollTrigger listens to it,
 * and GSAP's ticker drives Lenis' rAF loop for perfect sync.
 *
 * Scroll can NEVER stay stuck. Every mechanism that stops scrolling is
 * accounted for and self-healing:
 *  - Locks are reference-counted (lockScroll/unlockScroll) and idempotent.
 *  - A route change grants amnesty: all locks cleared, Lenis restarted,
 *    dimensions re-measured, ScrollTrigger refreshed.
 *  - bfcache restores (Safari/Chrome back-forward) re-sync everything.
 *  - A watchdog sweeps every 2.5s: if nothing legitimately holds a lock
 *    but the page is locked anyway (overflow:hidden, stopped Lenis, or a
 *    stale intro-lock with no intro sheet in the DOM), it unlocks.
 */

let activeLenis: Lenis | null = null;
let lockCount = 0;

function applyLockState() {
  if (typeof document === "undefined") return;
  if (lockCount > 0) {
    activeLenis?.stop();
    document.documentElement.style.overflow = "hidden";
  } else {
    document.documentElement.style.overflow = "";
    try {
      activeLenis?.start();
    } catch {
      /* lenis may be mid-destroy during unmount — harmless */
    }
  }
}

export function lockScroll() {
  lockCount += 1;
  applyLockState();
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  applyLockState();
}

export function forceUnlockScroll() {
  lockCount = 0;
  applyLockState();
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstPath = useRef(true);

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
    activeLenis = lenis;
    applyLockState(); // honour any lock taken before init; start otherwise

    lenis.on("scroll", ScrollTrigger.update);

    // Diagnostics handle (harmless): lets us verify in the field that the
    // raf heartbeat is alive and inspect Lenis state without a rebuild.
    const dbg = { beats: 0 };
    (window as unknown as Record<string, unknown>).__luxeScroll = { lenis, dbg };

    const tick = (time: number) => {
      dbg.beats++;
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // bfcache restore (back/forward): timers and state thaw exactly as
    // they were, which can resurrect a stale lock or stale measurements.
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      forceUnlockScroll();
      document.documentElement.classList.remove("intro-lock");
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("pageshow", onPageShow);

    // THE stuck-scroll killer. When the window is hidden or fully occluded
    // (covered by another window), Chrome suspends requestAnimationFrame;
    // GSAP's ticker is rAF-driven, so Lenis stops being driven — yet its
    // wheel listener keeps consuming events. If the rAF chain fails to
    // resume on return (a real Chrome/macOS occlusion failure mode), the
    // page scrolls nowhere until a refresh. So: explicitly wake the GSAP
    // ticker whenever the page becomes visible again…
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        gsap.ticker.wake();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    // …and monitor the heartbeat: if the page is visible but the ticker
    // hasn't beaten since the last check, force-revive it.
    let lastBeats = -1;
    const heartbeat = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (dbg.beats === lastBeats) {
        gsap.ticker.wake();
      }
      lastBeats = dbg.beats;
    }, 2000);

    return () => {
      window.clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      window.removeEventListener("pageshow", onPageShow);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      activeLenis = null;
    };
  }, []);

  // Route-change amnesty: a navigation must never inherit a scroll lock
  // (whatever component held it has unmounted), and the new page's height
  // must be re-measured so Lenis and ScrollTrigger agree with reality.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    forceUnlockScroll();
    document.documentElement.classList.remove("intro-lock");
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        activeLenis?.resize();
        ScrollTrigger.refresh();
      }),
    );
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Watchdog: recover from ANY unforeseen lock without needing a refresh.
  useEffect(() => {
    const sweep = window.setInterval(() => {
      const html = document.documentElement;
      const introInDom = !!document.querySelector("[data-sheet-intro]");

      // intro-lock class with no intro sheet mounted → stale, clear it
      if (!introInDom && html.classList.contains("intro-lock")) {
        html.classList.remove("intro-lock");
      }

      // nothing holds a lock, yet the page is locked → heal it
      if (lockCount === 0) {
        if (html.style.overflow === "hidden") {
          html.style.overflow = "";
        }
        if (!introInDom && activeLenis?.isStopped) {
          try {
            activeLenis.start();
          } catch {
            /* noop */
          }
        }
      }
    }, 2500);
    return () => window.clearInterval(sweep);
  }, []);

  return <>{children}</>;
}
