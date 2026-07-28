"use client";

import Link from "next/link";
import { useReveal } from "@/lib/useReveal";

/**
 * A slim, artistic band teasing the commission process: the five
 * movements' Roman numerals threaded on a pencil rule, leading to
 * /process. Lives on the home page and the about page.
 */

const STEPS = [
  { numeral: "I", label: "Conversation" },
  { numeral: "II", label: "Vision" },
  { numeral: "III", label: "Quote" },
  { numeral: "IV", label: "Making" },
  { numeral: "V", label: "Arrival" },
];

export default function ProcessTeaser() {
  const scope = useReveal<HTMLElement>({ stagger: 0.08 });

  return (
    <section
      ref={scope}
      aria-label="The commission process — a glimpse"
      className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24"
    >
      <p className="gsap-reveal text-center font-serif text-lg italic uppercase tracking-[0.28em] text-umber/80">
        The Process
      </p>

      <Link
        href="/process"
        className="group mt-10 block"
        aria-label="Discover the commission process"
      >
        {/* the numerals, threaded on a rule */}
        <div className="gsap-reveal relative">
          <div
            aria-hidden="true"
            className="pencil-rule absolute left-0 right-0 top-[1.35rem] sm:top-[1.6rem]"
          />
          <ol className="relative flex items-start justify-between">
            {STEPS.map((s) => (
              <li key={s.numeral} className="flex flex-col items-center gap-2.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-umber/25 bg-cream font-script text-xl text-royal transition-all duration-300 group-hover:border-royal/50 sm:h-13 sm:w-13 sm:text-2xl">
                  {s.numeral}
                </span>
                <span className="hidden font-serif text-xs uppercase tracking-[0.18em] text-umber/70 sm:block">
                  {s.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="gsap-reveal mt-8 text-center font-serif text-lg italic text-umber transition-colors duration-200 group-hover:text-royal">
          From a conversation, to a signature — see how a piece comes to
          be&nbsp;→
        </p>
      </Link>
    </section>
  );
}
