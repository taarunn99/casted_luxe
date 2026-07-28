/**
 * The Casted Luxe Promise — the home page's closing vow, a quiet band of
 * three commitments before the footer. Static, crawlable text; no
 * animation — the words carry it.
 */

const PROMISES = [
  {
    word: "Original.",
    line: "No prints, no reproductions — every piece is the only one of its kind, made once and never again.",
  },
  {
    word: "Measured.",
    line: "Built to your wall, your palette, your story — nothing here comes off a shelf.",
  },
  {
    word: "Signed.",
    line: "Finished by Ashrat's hand, signed, and delivered with its own care notes.",
  },
];

export default function AtelierPromise() {
  return (
    <section
      aria-label="The Casted Luxe promise"
      className="relative border-t border-umber/10 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-serif text-lg italic uppercase tracking-[0.28em] text-umber/80">
          The Casted Luxe Promise
        </p>

        <div className="mt-12 grid gap-12 text-center sm:grid-cols-3 sm:gap-8">
          {PROMISES.map((p) => (
            <div key={p.word}>
              <p className="font-script text-4xl text-royal sm:text-5xl">
                {p.word}
              </p>
              <p className="mx-auto mt-4 max-w-xs font-serif text-lg leading-relaxed text-ink/85">
                {p.line}
              </p>
            </div>
          ))}
        </div>

        <div className="pencil-rule mx-auto mt-16 w-40" />
      </div>
    </section>
  );
}
