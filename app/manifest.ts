import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Casted Luxe — Custom Art Pieces by Ashrat",
    short_name: "Casted Luxe",
    description:
      "Luxury handcrafted art pieces, made to commission by Ashrat.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1efe3",
    theme_color: "#3a0f62",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
