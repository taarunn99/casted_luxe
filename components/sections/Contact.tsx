"use client";

import { useState } from "react";
import { useReveal } from "@/lib/useReveal";
import SectionHeading from "@/components/ui/SectionHeading";

const ENQUIRY_EMAIL = "tarun.s@lapizblue.com";
const WHATSAPP_URL =
  "https://wa.me/971558005474?text=" +
  encodeURIComponent(
    "Hello Crafted Luxe — I'd love to commission a customised art piece.",
  );

export default function Contact() {
  const scope = useReveal<HTMLElement>();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Commission enquiry — ${form.name || "Crafted Luxe website"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputClasses =
    "w-full border-b border-umber/40 bg-transparent px-1 py-3 font-serif text-lg text-ink placeholder:text-umber/50 placeholder:italic focus:border-royal focus:outline-none transition-colors duration-200";

  return (
    <section
      ref={scope}
      id="contact"
      aria-label="Commission enquiries"
      className="relative bg-lilac/50 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Commissions" title="DM for Customised Works" />

        <p className="gsap-reveal mx-auto mt-8 max-w-2xl text-center font-serif text-xl italic text-umber">
          Tell us the story you want turned into art — Ashrat replies to every
          enquiry personally.
        </p>

        <div className="mt-16 grid gap-14 md:grid-cols-2">
          {/* Enquiry form */}
          <form onSubmit={handleSubmit} className="gsap-reveal" noValidate={false}>
            <div className="space-y-7">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block font-serif text-sm uppercase tracking-[0.22em] text-umber"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block font-serif text-sm uppercase tracking-[0.22em] text-umber"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block font-serif text-sm uppercase tracking-[0.22em] text-umber"
                >
                  Your vision
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Describe the piece you have in mind…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-9 inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-full bg-royal px-8 py-3 font-serif text-lg font-semibold tracking-wide text-lilac transition-colors duration-200 hover:bg-umber sm:w-auto"
            >
              Send Enquiry
            </button>
          </form>

          {/* WhatsApp + direct */}
          <div className="gsap-reveal flex flex-col justify-center">
            <div className="sheet-edge rounded-sm bg-cream p-8 sm:p-10">
              <p className="font-script text-4xl text-ink">Prefer to chat?</p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink/90">
                Message us on WhatsApp and start your commission in a
                conversation — photos, ideas, sizes, all of it.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-royal px-7 py-3 font-serif text-lg font-semibold text-royal transition-colors duration-200 hover:bg-royal hover:text-lilac"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp the Atelier
              </a>
              <div className="pencil-rule my-7" />
              <p className="font-serif text-sm uppercase tracking-[0.22em] text-umber">
                Enquiries
              </p>
              <a
                href={`mailto:${ENQUIRY_EMAIL}`}
                className="mt-1 inline-block font-serif text-lg text-royal underline-offset-4 hover:underline"
              >
                {ENQUIRY_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
