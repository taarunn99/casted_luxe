"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-3"
      >
        {/* Logo — left */}
        <Link
          href="#top"
          aria-label="Crafted Luxe — home"
          className="flex items-center gap-2 shrink-0"
        >
          <Image
            src="/logo.svg"
            alt="Crafted Luxe logo"
            width={64}
            height={64}
            priority
            className="h-14 w-14 sm:h-16 sm:w-16"
          />
          <span className="font-script text-2xl sm:text-3xl text-ink leading-none pt-1">
            Crafted Luxe
          </span>
        </Link>

        {/* Links — center (desktop) */}
        <ul className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-serif text-lg font-medium text-ink tracking-wide transition-colors duration-200 hover:text-royal relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-royal after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA — right (desktop) */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex items-center min-h-11 rounded-full bg-royal px-6 py-2 font-serif text-base font-semibold tracking-wide text-lilac cursor-pointer transition-colors duration-200 hover:bg-umber"
          >
            DM for Customised Works
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
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full min-h-11 rounded-full bg-royal px-6 py-2.5 font-serif text-lg font-semibold text-lilac cursor-pointer transition-colors duration-200 hover:bg-umber"
                >
                  DM for Customised Works
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
