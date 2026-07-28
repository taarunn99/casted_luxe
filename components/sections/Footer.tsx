import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-umber/15 bg-cream py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <Link href="/" aria-label="Casted Luxe — home">
          <Image
            src="/logo.svg"
            alt="Casted Luxe — by Ashrat"
            width={240}
            height={200}
            className="h-40 w-auto"
          />
        </Link>
        <p className="max-w-md font-serif italic text-lg text-umber">
          Custom art pieces, handcrafted by Ashrat.
        </p>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-8">
            {[
              { label: "Home", href: "/" },
              { label: "Gallery", href: "/gallery" },
              { label: "The Process", href: "/process" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-serif text-ink transition-colors duration-200 hover:text-royal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pencil-rule w-48" />
        <p className="font-serif text-sm text-umber/80">
          © {new Date().getFullYear()} Casted Luxe · All pieces are original
          works by Ashrat
        </p>
        <p className="-mt-2 font-serif text-sm text-umber/70">
          <Link
            href="/terms"
            className="transition-colors duration-200 hover:text-royal"
          >
            Terms &amp; Conditions
          </Link>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <Link
            href="/privacy"
            className="transition-colors duration-200 hover:text-royal"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
