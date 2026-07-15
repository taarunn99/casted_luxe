type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="gsap-reveal font-serif italic text-lg tracking-[0.28em] uppercase text-umber/80 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="gsap-reveal font-script text-5xl sm:text-6xl lg:text-7xl leading-tight text-ink">
        {title}
      </h2>
      <div className="gsap-reveal pencil-rule w-40 mx-auto mt-6" />
    </div>
  );
}
