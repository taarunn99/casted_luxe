"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { lockScroll, unlockScroll } from "@/components/providers/SmoothScroll";

/**
 * Full-definition artwork viewer. A click on a gallery tile opens this:
 * a centered container that loads the whole, uncropped image with a close
 * cross, on desktop and mobile alike.
 *
 * Portalled to <body> — the gallery tiles live inside GSAP-transformed
 * cards, and a position:fixed element inside a transformed ancestor would
 * be trapped by it, so it must escape to the document root. Uses a plain
 * <img> (not next/image) so the viewer gets the asset at full definition.
 */
export default function Lightbox({
  open,
  onClose,
  src,
  alt,
  caption,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reduce = useReducedMotion();

  // Keep the latest onClose without destabilising the lock effect below —
  // its deps must be [open] only, so the scroll lock is taken exactly once
  // per open and released exactly once per close.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Escape to close + focus the cross while open; lock the page behind it.
  useEffect(() => {
    if (!open) return;

    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 40);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      unlockScroll();
    };
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: "easeOut" }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={caption ? `${caption} — full view` : "Artwork full view"}
        >
          {/* Close cross */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close full view"
            className="absolute right-4 top-4 z-10 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-cream/10 text-cream ring-1 ring-cream/30 backdrop-blur-sm transition-colors duration-200 hover:bg-cream/20 sm:right-6 sm:top-6"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {/* Image container — clicking the art itself does not close */}
          <motion.figure
            className="relative flex max-h-full max-w-full flex-col items-center"
            initial={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: reduce ? 1 : 0.98, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="sheet-edge max-h-[86svh] w-auto max-w-full rounded-lg border border-umber/40 bg-paper object-contain"
            />
            {caption && (
              <figcaption className="mt-4 font-script text-2xl text-cream sm:text-3xl">
                {caption}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
