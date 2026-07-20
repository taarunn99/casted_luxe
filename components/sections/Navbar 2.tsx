"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Seamless over the home hero — the bar only gains its cream backdrop once
  // the section after the pinned hero reaches the top. On inner pages it
  // solidifies after the slightest scroll.
  useEffect(() => {
    const onScroll = () => {
      const afterHero = document.getElementById("after-hero");
      setScrolled(
        afterHero
          ? afterHero.getBoundingClientRect().top <= 96
          : window.scrollY > 24,
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(59,28,10,0.12)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="flex w-full items-center justify-between pl-3 pr-4 sm:pl-4 sm:pr-6 py-3"
      >
        {/* Logo — left */}
        <Link
          href="/"
          aria-label="Casted Luxe — home"
          className="flex items-center shrink-0"
        >
          <span className="font-script text-2xl sm:text-3xl text-ink leading-none pt-1">
            Casted Luxe
          </span>
        </Link>

        {/* Links — center (desktop) */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`font-serif text-lg font-medium tracking-wide transition-colors duration-200 hover:text-royal relative after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-royal after:transition-all after:duration-300 hover:after:w-full ${
                    active ? "text-royal after:w-full" : "text-ink after:w-0"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA — right (desktop) */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center min-h-11 rounded-full bg-umber px-6 py-2 font-serif text-base font-semibold tracking-wide text-cream cursor-pointer transition-colors duration-200 hover:bg-ink"
          >
            Craft Your Vision
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex h-11 w-11 items-center justify-center cursor-pointer text-ink"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-cream/95 backdrop-blur-md border-t border-umber/15"
          >
            <ul className="flex flex-col px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-serif text-xl text-ink hover:text-royal transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3 pb-2">
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full min-h-11 rounded-full bg-umber px-6 py-2.5 font-serif text-lg font-semibold text-cream cursor-pointer transition-colors duration-200 hover:bg-ink"
                >
                  Craft Your Vision
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
