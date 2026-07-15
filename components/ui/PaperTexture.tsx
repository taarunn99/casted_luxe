/**
 * Drawing-sheet grain overlay — pure inline SVG (zero network cost).
 * feTurbulence fractal noise tinted to the paper beige (#e5e4dc),
 * multiplied over the cream base for a realistic sheet finish.
 */
export default function PaperTexture() {
  return (
    <svg
      className="paper-grain"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <filter id="paper-noise" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="3"
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0.898
                  0 0 0 0 0.894
                  0 0 0 0 0.863
                  0 0 0 0.6 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-noise)" />
    </svg>
  );
}
