import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 min-h-11 px-7 py-2.5 font-serif text-lg font-semibold tracking-wide cursor-pointer rounded-full transition-colors duration-200 select-none";
  const styles =
    variant === "primary"
      ? "bg-royal text-lilac hover:bg-umber"
      : "border border-umber/60 text-ink hover:border-royal hover:text-royal";

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...externalProps}>
      {children}
    </Link>
  );
}
