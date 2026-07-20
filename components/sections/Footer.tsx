import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-umber/15 bg-cream py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center">
        <Link href="#top" aria-label="Back to top" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Casted Luxe logo"
            width={56}
            height={56}
            className="h-12 w-12"
          />
          <span className="font-script text-3xl text-ink">Casted Luxe</span>
        </Link>
        <p className="max-w-md font-serif italic text-lg text-umber">
          Custom art pieces, handcrafted by Ashrat.
        </p>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-8">
            {[
              { label: "Gallery", href: "#gallery" },
              { label: "About", href: "#about" },
              { label: "Contact", href: "#contact" },
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
      </div>
    </footer>
  );
}
