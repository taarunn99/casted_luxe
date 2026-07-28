import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "This page slipped out of the frame — return to the Casted Luxe gallery of bespoke commissioned artworks.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-royal">
        404
      </p>
      <h1 className="mt-4 font-script text-5xl text-ink sm:text-6xl">
        Out of the frame
      </h1>
      <div className="pencil-rule mx-auto mt-8 w-40" />
      <p className="mx-auto mt-6 max-w-md font-serif text-xl italic leading-relaxed text-umber">
        The page you were looking for isn&rsquo;t hanging here — but the
        collection is just a step away.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/gallery"
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-royal px-8 py-3 font-serif text-lg font-semibold tracking-wide text-lilac transition-colors duration-200 hover:bg-umber"
        >
          Wander the Gallery
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-umber/60 px-8 py-3 font-serif text-lg font-semibold tracking-wide text-ink transition-colors duration-200 hover:border-royal hover:text-royal"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
