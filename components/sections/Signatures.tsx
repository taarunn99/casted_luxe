/**
 * The Atelier's Signatures — the About page's closing band: the four
 * material languages every commission draws from. Static, crawlable
 * copy that also carries the craft keywords.
 */

const SIGNATURES = [
  {
    title: "Poured Resin",
    line: "Layer over glass-clear layer of epoxy, each cured before the next, until colour floats in real depth.",
  },
  {
    title: "Gold Leaf",
    line: "True metal leaf laid by hand — it answers lamplight and dawn the way no print ever can.",
  },
  {
    title: "Canvas & Pigment",
    line: "Oil, acrylic and ink built into texture you can read with your fingertips.",
  },
  {
    title: "Light",
    line: "Backlit reliefs and luminous glazes — pieces that keep their glow long after dark.",
  },
];

export default function Signatures() {
  return (
    <section
      aria-label="The atelier's signature materials"
      className="relative border-t border-umber/10 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center font-serif text-lg italic uppercase tracking-[0.28em] text-umber/80">
          Materials &amp; Craft
        </p>
        <h2 className="mt-6 text-center font-script text-5xl text-ink sm:text-6xl">
          The Atelier&rsquo;s Signatures
        </h2>
        <div className="pencil-rule mx-auto mt-8 w-40" />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {SIGNATURES.map((s, i) => (
            <div
              key={s.title}
              className="sheet-edge rounded-xl border border-umber/20 bg-paper/70 px-6 py-8 text-center"
            >
              <p
                className="font-script text-2xl text-royal/40"
                aria-hidden="true"
              >
                {["I", "II", "III", "IV"][i]}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-3 font-serif text-base leading-relaxed text-ink/80">
                {s.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
