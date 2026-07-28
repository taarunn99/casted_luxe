import type { Metadata } from "next";
import Link from "next/link";
import { ENQUIRY_EMAIL, INSTAGRAM_URL } from "@/lib/works";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Casted Luxe handles the personal information shared with the atelier — what we collect, why, and your rights.",
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

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-28 pt-36 sm:pt-40">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-royal">
        Your Trust
      </p>
      <h1 className="mt-4 font-script text-5xl text-ink sm:text-6xl">
        Privacy Policy
      </h1>
      <div className="pencil-rule mt-8 w-40" />
      <p className="mt-6 font-serif italic text-umber">
        Last updated: {LAST_UPDATED}
      </p>

      <p className="mt-8 font-serif text-lg leading-relaxed text-ink/90">
        Casted Luxe (&ldquo;the Atelier&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) is an art atelier based in the United Arab Emirates.
        This policy explains what personal information we handle through
        castedluxe.com and our commission conversations, why we handle it, and the rights you have —
        in line with the UAE Personal Data Protection Law (Federal Decree-Law
        No. 45 of 2021).
      </p>

      <Section n="1" title="What we collect">
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>
            <strong>What you share with us.</strong> When you contact the
            atelier — over WhatsApp, email or Instagram — we receive what you
            send: your name, contact details, delivery address, and the
            details of the piece you&rsquo;d like commissioned.
          </li>
          <li>
            <strong>Technical data.</strong> Our hosting provider keeps
            standard server logs (IP address, browser type, pages requested)
            to run and secure the site.
          </li>
          <li>
            <strong>Analytics &amp; cookies.</strong> We may use analytics
            tools (such as Google Tag Manager / Google Analytics) to
            understand how the site is used — page views, approximate
            location, device type. Where such tools set cookies, you can block
            or clear them in your browser at any time.
          </li>
        </ul>
      </Section>

      <Section n="2" title="What we don't do">
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>No accounts — the site has no login and stores no profiles.</li>
          <li>
            No card details — payments are arranged directly with you; the
            website never collects payment information.
          </li>
          <li>
            No selling of data — your information is never sold or rented to
            anyone.
          </li>
        </ul>
      </Section>

      <Section n="3" title="Why we use it">
        <p>We process personal information only for:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>
            <strong>Answering you</strong> — replying to enquiries you send us
            (performance of a contract / your request).
          </li>
          <li>
            <strong>Making and delivering your commission</strong> — sizing,
            delivery, installation and aftercare (performance of a contract).
          </li>
          <li>
            <strong>Running the site safely</strong> — security, debugging and
            improvement (legitimate interests).
          </li>
          <li>
            <strong>Understanding our audience</strong> — analytics as
            described above (consent, where required).
          </li>
        </ul>
      </Section>

      <Section n="4" title="Who else is involved">
        <p>
          The channels you reach us on are run by their own providers, under
          their own privacy policies: WhatsApp and Instagram (Meta), your
          email provider, our website host (Vercel) and — if analytics are
          active — Google. Some of these providers process data outside the
          UAE; where that happens, it is done under the safeguards those
          providers maintain and as permitted by UAE law. We share commission
          details with couriers and installers only as needed to deliver your
          piece.
        </p>
      </Section>

      <Section n="5" title="How long we keep it">
        <p>
          Enquiry messages are kept for as long as the conversation is live.
          Commission records — what was made, for whom, and where it was
          delivered — are kept for as long as needed for warranty, aftercare
          and legal obligations, then deleted.
        </p>
      </Section>

      <Section n="6" title="Your rights">
        <p>Under the UAE PDPL you may, at any time, ask to:</p>
        <ul className="list-disc space-y-2 pl-6 marker:text-royal">
          <li>access a copy of the personal data we hold about you;</li>
          <li>correct it, or have it deleted;</li>
          <li>restrict or object to how it is processed;</li>
          <li>receive it in a portable format;</li>
          <li>withdraw any consent you have given.</li>
        </ul>
        <p>
          Write to{" "}
          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            className="underline transition-colors hover:text-royal"
          >
            {ENQUIRY_EMAIL}
          </a>{" "}
          and we will respond. You may also complain to the UAE Data Office if
          you believe your data has been mishandled.
        </p>
      </Section>

      <Section n="7" title="Security & children">
        <p>
          We keep access to your information limited to the people who need it
          to make and deliver your commission, over channels protected by
          encryption in transit. The site is not directed at children, and we
          do not knowingly collect children&rsquo;s data.
        </p>
      </Section>

      <Section n="8" title="Changes & contact">
        <p>
          If this policy changes, the date above changes with it. Questions
          about your data are always welcome at{" "}
          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            className="underline transition-colors hover:text-royal"
          >
            {ENQUIRY_EMAIL}
          </a>
          , or find the atelier on{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline transition-colors hover:text-royal"
          >
            Instagram
          </a>
          . See also our{" "}
          <Link
            href="/terms"
            className="underline transition-colors hover:text-royal"
          >
            Terms &amp; Conditions
          </Link>
          .
        </p>
      </Section>
    </main>
  );
}
