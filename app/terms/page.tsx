import type { Metadata } from "next";
import Link from "next/link";
import { ENQUIRY_EMAIL, WHATSAPP_NUMBER } from "@/lib/works";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern commissions, payments, cancellations and delivery of original artworks by Casted Luxe.",
};

const LAST_UPDATED = "28 July 2026";

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-serif text-2xl font-semibold text-ink">
        <span className="mr-2 text-royal">{n}.</span>
        {title}
      </h2>
      <div className="mt-3 space-y-3 font-serif text-lg leading-relaxed text-ink/90">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-36 sm:pt-40">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-royal">
        The Fine Print
      </p>
      <h1 className="mt-4 font-script text-5xl text-ink sm:text-6xl">
        Terms &amp; Conditions
      </h1>
      <div className="pencil-rule mt-8 w-40" />
      <p className="mt-6 font-serif italic text-umber">
        Last updated: {LAST_UPDATED}
      </p>

      <p className="mt-8 font-serif text-lg leading-relaxed text-ink/90">
        These terms govern the website castedluxe.com and every
        commission placed with Casted Luxe (&ldquo;the Atelier&rdquo;,
        &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site or commissioning
        a piece, you agree to them. Each artwork is an original, handmade
        commission — these terms are written around that.
      </p>

      <Section n="1" title="The works">
        <p>
          Every piece is a one-of-a-kind, made-to-order artwork, created by
          hand for the person who commissions it. Variations in colour,
          texture, finish and detail are the nature of handmade work — they
          are part of the piece, not defects. Photographs on the site are as
          faithful as screens allow; the physical work may differ slightly.
        </p>
      </Section>

      <Section n="2" title="Commissions & orders">
        <p>
          Commissions begin as a conversation — over WhatsApp, email or
          Instagram. A commission is confirmed, and work begins, once the
          deposit described below has been received. Made-to-measure details
          (size, palette, placement) are agreed in writing during that
          conversation.
        </p>
      </Section>

      <Section n="3" title="Pricing & payment">
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>
            Each commission is quoted individually. Quotes are in UAE dirhams
            (AED) unless agreed otherwise.
          </li>
          <li>
            A deposit of <strong>30% of the commission price</strong> is
            payable to begin the work.{" "}
            <strong>This deposit is non-refundable</strong> — it secures the
            artist&rsquo;s time and the materials for a piece made only for
            you.
          </li>
          <li>
            The remaining <strong>70% balance</strong> is payable on
            completion of the piece, <strong>before delivery or dispatch</strong>.
          </li>
        </ul>
      </Section>

      <Section n="4" title="Cancellations">
        <p>
          Because every piece is made to order, cancellation is possible{" "}
          <strong>
            only within two (2) days of the order being placed
          </strong>
          , and even then <strong>only in rare cases</strong>, upon written
          request, and at the Atelier&rsquo;s sole discretion.
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>
            The <strong>30% deposit is not refundable</strong>, including
            where a cancellation request is accepted.
          </li>
          <li>
            After two days from the order, the commission cannot be cancelled
            — materials are committed and the work is under way.
          </li>
        </ul>
      </Section>

      <Section n="5" title="No returns or exchanges">
        <p>
          Commissioned artworks are personalised, made-to-order goods.{" "}
          <strong>We do not accept returns or exchanges</strong>, and
          made-to-order pieces are exempt from the cooling-off return periods
          that apply to ready-made goods bought online.
        </p>
        <p>
          Nothing in these terms limits rights that cannot be excluded under
          UAE law. If a piece arrives damaged in transit, or is materially
          different from what was agreed in writing, tell us within{" "}
          <strong>48 hours of delivery</strong> with photographs; the remedy
          will be, in the first instance, repair or restoration of the work by
          the artist.
        </p>
      </Section>

      <Section n="6" title="Delivery">
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>
            We deliver across the <strong>UAE and the GCC</strong>, and{" "}
            <strong>worldwide on request</strong>.
          </li>
          <li>
            Delivery timelines are good-faith estimates — handmade work takes
            the time it takes, and shipping is subject to carriers.
          </li>
          <li>
            For deliveries outside the UAE, customs duties, import taxes and
            local charges are borne by the client.
          </li>
          <li>
            Packaging, insurance and installation are arranged per commission.
            Risk in the piece passes to you on delivery.
          </li>
        </ul>
      </Section>

      <Section n="7" title="Caring for the piece">
        <p>
          Each piece leaves the atelier with care guidance. We are not
          responsible for damage arising after delivery — including improper
          hanging or mounting, direct sunlight, humidity, or cleaning with
          unsuitable products.
        </p>
      </Section>

      <Section n="8" title="Intellectual property">
        <p>
          You own the physical artwork. The artist retains the copyright in
          the work and in all images of it — reproduction, resale of prints,
          or commercial use of the imagery requires written permission. The
          Atelier may photograph commissioned pieces for its portfolio and
          social channels unless you ask us not to in writing. The content of
          this website — images, films and text — belongs to Casted Luxe and
          may not be reproduced.
        </p>
      </Section>

      <Section n="9" title="Liability">
        <p>
          To the fullest extent permitted by law, the Atelier&rsquo;s total
          liability in connection with a commission is limited to the price
          paid for that commission. Nothing in these terms excludes liability
          that cannot be excluded under applicable law, or affects your
          non-waivable statutory rights as a consumer.
        </p>
      </Section>

      <Section n="10" title="Governing law">
        <p>
          These terms are governed by the laws of the United Arab Emirates,
          and the courts of the UAE have jurisdiction over any dispute. Before
          anything formal — talk to us; nearly everything is resolvable in a
          conversation.
        </p>
      </Section>

      <Section n="11" title="Changes & contact">
        <p>
          We may update these terms from time to time; the date above shows
          the current version. Questions are welcome:
        </p>
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>
            Email:{" "}
            <a
              href={`mailto:${ENQUIRY_EMAIL}`}
              className="underline transition-colors hover:text-royal"
            >
              {ENQUIRY_EMAIL}
            </a>
          </li>
          <li>
            WhatsApp:{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-royal"
            >
              +971 55 800 5474
            </a>
          </li>
        </ul>
        <p>
          See also our{" "}
          <Link
            href="/privacy"
            className="underline transition-colors hover:text-royal"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </Section>
    </main>
  );
}
