"use client";

import { useState } from "react";
import Image from "next/image";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ENQUIRY_EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
  WORKS,
  type Work,
} from "@/lib/works";

/**
 * Speak with the Atelier — the home page's closing conversation.
 * A two-panel chat in the brand palette: the eight pieces sit on the left
 * as conversations; the right side is a quiet chat with the atelier. The
 * visitor picks a piece (or a new commission), types, and Send opens
 * Hamdan's WhatsApp with the piece context and their note prefilled.
 * The atelier also "shares" its Instagram in the thread — a link-preview
 * bubble for @artshi.resin — so the social lives inside the story of the
 * conversation instead of a footer row.
 */

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon({ size = 22, id = "igGrad" }: { size?: number; id?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FED373" />
          <stop offset="35%" stopColor="#F15245" />
          <stop offset="70%" stopColor="#D92E7F" />
          <stop offset="100%" stopColor="#9B36B7" />
        </linearGradient>
      </defs>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke={`url(#${id})`} strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" stroke={`url(#${id})`} strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.3" fill={`url(#${id})`} />
    </svg>
  );
}

function MailIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export default function AtelierChat() {
  const scope = useReveal<HTMLElement>();
  const [selected, setSelected] = useState<Work | null>(null);
  const [message, setMessage] = useState("");

  const send = () => {
    const context = selected
      ? `Hello — I'm writing about ${selected.title} (${selected.style}) from the Casted Luxe gallery.`
      : "Hello — I'd love to begin a commission with Casted Luxe.";
    const text = message.trim() ? `${context}\n\n${message.trim()}` : context;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const mailHref =
    `mailto:${ENQUIRY_EMAIL}?subject=` +
    encodeURIComponent(
      selected ? `Commission enquiry — ${selected.title}` : "Commission enquiry",
    );

  return (
    <section
      ref={scope}
      id="atelier-chat"
      aria-label="Speak with the atelier"
      className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <SectionHeading eyebrow="Begin a Commission" title="Speak with the Atelier" />

      <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
        Every piece begins as a conversation — this one opens straight into
        the atelier&rsquo;s WhatsApp.
      </p>

      {/* The chat card */}
      <div className="gsap-reveal sheet-edge mt-14 rounded-xl border border-umber/40 bg-paper p-1.5">
        <div className="grid overflow-hidden rounded-[3px] border border-umber/15 bg-cream md:grid-cols-[0.95fr_1.45fr]">
          {/* ── The pieces, as conversations ── */}
          <div className="min-w-0 border-b border-umber/15 md:border-b-0 md:border-r">
            <p className="px-4 pt-4 font-serif text-xs uppercase tracking-[0.26em] text-umber/70">
              The Pieces
            </p>
            <div className="flex gap-1.5 overflow-x-auto p-3 md:max-h-[430px] md:flex-col md:overflow-y-auto">
              {/* A new commission — the blank canvas */}
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-pressed={selected === null}
                className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors md:w-full ${
                  selected === null ? "bg-lilac/70" : "hover:bg-paper"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-umber/20 bg-paper font-script text-xl text-royal">
                  +
                </span>
                <span className="min-w-0 pr-1">
                  <span className="block truncate font-serif text-sm font-semibold text-ink">
                    A new commission
                  </span>
                  <span className="block truncate font-serif text-xs italic text-umber/70">
                    Begin from a feeling
                  </span>
                </span>
              </button>

              {WORKS.map((work) => (
                <button
                  key={work.title}
                  type="button"
                  onClick={() => setSelected(work)}
                  aria-pressed={selected?.title === work.title}
                  className={`flex shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors md:w-full ${
                    selected?.title === work.title ? "bg-lilac/70" : "hover:bg-paper"
                  }`}
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-umber/20">
                    {work.image && (
                      <Image
                        src={work.image}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <span className="min-w-0 pr-1">
                    <span className="block truncate font-serif text-sm font-semibold text-ink">
                      {work.title}
                    </span>
                    <span className="block truncate font-serif text-xs italic text-umber/70">
                      {work.style}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── The conversation ── */}
          <div className="flex min-h-[430px] min-w-0 flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-umber/15 px-4 py-3 sm:px-5">
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-umber/20 bg-paper font-script text-2xl leading-none text-royal">
                A
              </span>
              <div className="min-w-0">
                <p className="font-serif font-semibold leading-tight text-ink">
                  The Atelier
                </p>
                <p className="font-serif text-xs italic text-umber/70">
                  Ashrat · replies on WhatsApp
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Casted Luxe on Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-paper"
                >
                  <InstagramIcon id="igGradHeader" />
                </a>
                <a
                  href={mailHref}
                  aria-label="Email the atelier"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-umber transition-colors hover:bg-paper hover:text-royal"
                >
                  <MailIcon />
                </a>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 p-4 sm:p-6">
              <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm border border-umber/15 bg-paper px-4 py-2.5 font-serif text-[15px] leading-relaxed text-ink shadow-sm">
                Every piece begins as a conversation.
              </p>
              <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm border border-umber/15 bg-paper px-4 py-2.5 font-serif text-[15px] leading-relaxed text-ink shadow-sm">
                Start yours — the piece, the wall, or just the feeling.
              </p>

              {/* The atelier shares its Instagram — a link preview in the thread */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-fit max-w-[85%] rounded-2xl rounded-tl-sm border border-umber/15 bg-paper p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:max-w-[19rem]"
              >
                <span className="flex items-center gap-3">
                  <InstagramIcon size={30} id="igGradCard" />
                  <span className="min-w-0">
                    <span className="block font-serif text-sm font-semibold text-ink">
                      {INSTAGRAM_HANDLE}
                    </span>
                    <span className="block font-serif text-xs italic leading-snug text-umber/75">
                      The atelier, behind the scenes — pours, studio days, new
                      pieces first.
                    </span>
                  </span>
                </span>
                <span className="mt-2 block font-serif text-xs font-semibold tracking-wide text-royal">
                  Follow on Instagram →
                </span>
              </a>
            </div>

            {/* Composer */}
            <div className="border-t border-umber/15 p-3 sm:p-4">
              {selected && (
                <div className="mb-2 flex w-fit items-center gap-2 rounded-full bg-lilac/70 px-3 py-1 font-serif text-xs text-royal">
                  Re: {selected.title}
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    aria-label="Clear selected piece"
                    className="cursor-pointer text-royal/70 transition-colors hover:text-royal"
                  >
                    ✕
                  </button>
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-label="Your message to the atelier"
                  placeholder={
                    selected
                      ? `Ask about ${selected.title}…`
                      : "Tell us what you dream of hanging…"
                  }
                  className="h-11 min-w-0 flex-1 rounded-full border border-umber/25 bg-white/70 px-4 font-serif text-[15px] text-ink placeholder:text-umber/50 focus:border-royal focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#128C4B] px-5 font-serif text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#0b6b38]"
                >
                  <WhatsAppIcon />
                  Send
                </button>
              </form>
              <p className="mt-2.5 text-center font-serif text-xs italic text-umber/60">
                Opens WhatsApp with your note — or{" "}
                <a href={mailHref} className="underline transition-colors hover:text-royal">
                  write by email
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
