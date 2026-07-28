/**
 * The collection — single source of truth for the eight commissioned
 * pieces and the atelier's contact channels. Consumed by the gallery
 * showcase and the home-page atelier chat. Per-piece recipe lives in
 * docs/gallery-pieces.md.
 */

export const ENQUIRY_EMAIL = "tarun.s@lapizblue.com";
export const WHATSAPP_NUMBER = "971558005474";
export const INSTAGRAM_HANDLE = "@artshi.resin";
export const INSTAGRAM_URL = "https://www.instagram.com/artshi.resin/";

export type Work = {
  title: string;
  numeral: string;
  style: string;
  medium: string;
  materials: string;
  size: string;
  story: string;
  craft: string;
  theme: string;
  image?: string;
  alt?: string;
  // "landscape" lifestyle shots are matted (shown whole) rather than
  // cropped to fill the portrait frame like the flat product photos.
  orientation?: "portrait" | "landscape";
};

export const WORKS: Work[] = [
  {
    title: "Ocean in Six",
    numeral: "I",
    style: "Epoxy Wall Showpiece",
    medium: "Oil pastel & transparent epoxy on acrylic board",
    materials: "Acrylic board · Oil pastels · Transparent epoxy",
    size: "Set of six discs · Made to measure",
    story:
      "Six tides caught in glass — the shoreline's calm, poured still, for the wall your evenings gather around.",
    craft:
      "Drawn by hand in oil pastel, then flooded in transparent epoxy — every layer cured before the next, until the surface holds like deep water.",
    theme: "#0b2d4d", // deep marine navy — dark counterpoint to the satin sky-blue shoot
    image: "/gallery/ocean-in-six.webp",
    alt: "Ocean in Six — six glossy epoxy wall discs in layered ocean blues on sky-blue satin",
  },
  {
    title: "Drift & Ember",
    numeral: "II",
    style: "Epoxy Resin Diorama",
    medium: "Die-cast Porsche & tinted epoxy on gloss board",
    materials:
      "Gloss acrylic board · Sculpted volcanic rock · Molten-red epoxy · Die-cast 911 GT3 RS",
    size: "Framed panel · Made to measure",
    story:
      "A GT3 RS caught mid-drift on molten ground — adrenaline framed, for the room where your fastest stories live.",
    craft:
      "Volcanic rock hand-sculpted and scorched, molten-red epoxy poured into every fissure, the die-cast 911 set into a mirror-black flood and its drift-smoke teased from spun fibre.",
    theme: "#3d0b10", // deep oxblood — molten counterpoint to the crimson satin backdrop
    image: "/gallery/drift-and-ember.webp",
    alt: "Drift & Ember — a black Porsche 911 GT3 RS drifting across charred volcanic rock veined with molten-red epoxy, on crimson satin",
  },
  {
    title: "Nur",
    numeral: "III",
    style: "Contemporary Calligraphy",
    medium: "‘Light’ · Acrylic & gold leaf on canvas",
    materials:
      "Stretched canvas · Layered acrylic · Gold-leaf calligraphy · Silver float frame",
    size: "Framed canvas · Made to measure",
    story:
      "Gold scripture rising through a breaking sky — devotion made luminous, a centrepiece for the wall that gives a home its calm.",
    craft:
      "Sky and clouds built up in layered acrylic, the calligraphy hand-drawn stroke by stroke, and the central verse raised in gold leaf — set in a floating silver frame.",
    theme: "#211a4d", // midnight indigo-violet — gold-on-blue signature, counterpoint to the bronze satin
    image: "/gallery/nur.webp",
    alt: "Nur — contemporary Arabic calligraphy in gold rising over a deep indigo ground that opens into a turquoise, cloud-filled sky, in a silver float frame",
  },
  {
    title: "Golden Hour",
    numeral: "IV",
    style: "Textured Triptych",
    medium: "Gold leaf & textured acrylic on canvas",
    materials:
      "Three canvas panels · Textured acrylic · Gold leaf · Deep-ocean blues",
    size: "Triptych · Three panels · Made to measure",
    story:
      "Three panels of gilded surf that carry the coast indoors — the calm of a sunlit shore, hung where your home breathes widest.",
    craft:
      "Deep-ocean blues built up in textured relief beneath a poured gold-leaf horizon, across three canvases hung as one continuous tide.",
    theme: "#1c2a5e", // deep ocean indigo
    image: "/gallery/golden-hour.webp",
    alt: "Golden Hour — a gold-and-blue textured ocean triptych on the wall of a sunlit coastal room overlooking the sea at sunset",
    orientation: "landscape",
  },
  {
    title: "Oneness",
    numeral: "V",
    style: "Gilded Calligraphy",
    medium: "Gold leaf on deep-navy canvas, gilt-framed",
    materials:
      "Canvas · Deep-navy ground · Gold-leaf script · Gilt frame",
    size: "Framed square · Made to measure",
    story:
      "Gold scripture turning on midnight blue — a still point of faith for the corner where oud smoke and evening prayer gather.",
    craft:
      "The navy ground laid by hand, the verse drawn in a slow circle and raised in gold leaf, then set behind glass in a gilt frame.",
    theme: "#5a4718", // antique gold — warm counterpoint drawn from the gilt script
    image: "/gallery/oneness.webp",
    alt: "Oneness — a square gold Arabic calligraphy on deep navy in a gilt frame, above a carved wood console with a brass incense burner and amber prayer beads",
  },
  {
    title: "Andalus",
    numeral: "VI",
    style: "Alcohol Ink & Resin",
    medium: "Alcohol ink, gold & arabesque under resin",
    materials:
      "Round panel · Alcohol inks · Gold leaf · Arabesque stencil · Resin glaze",
    size: "Round panel · Made to measure",
    story:
      "Jewelled light pooled in resin beneath a lace of arabesque — a Moorish courtyard's colour, kept for the wall the sun visits.",
    craft:
      "Alcohol inks flooded and bloomed wet-into-wet, gold leaf drifted through, an arabesque lace stencilled over, then sealed under a deep resin glaze on a round panel.",
    theme: "#0e463c", // deep emerald — jewel tone drawn from the resin blooms
    image: "/gallery/andalus.webp",
    alt: "Andalus — a round jewel-toned alcohol-ink and resin artwork laced with white arabesque patterns, set in a Moorish arched sandstone niche with lattice light",
  },
  {
    title: "Qamar",
    numeral: "VII",
    style: "Illuminated Relief",
    medium: "‘Moon’ · Backlit hand-carved relief",
    materials:
      "Hand-carved lunar relief · Round frame · Warm backlight",
    size: "Round · Freestanding · Made to measure",
    story:
      "A full moon you can keep lit — hand-carved craters that glow a room to dusk, long after the desert sky goes dark.",
    craft:
      "Every crater carved by hand into the disc, then lit from within so the ridges catch the light like real lunar shadow.",
    theme: "#131620", // cool midnight — the night sky the moon rises from
    image: "/gallery/qamar.webp",
    alt: "Qamar — a backlit hand-carved lunar relief glowing in a round frame on desert sand beneath a starry night sky",
  },
  {
    title: "Sunfall",
    numeral: "VIII",
    style: "Luminous Landscape",
    medium: "Oil on canvas",
    materials:
      "Stretched canvas · Oil paints · Layered luminous glazes",
    size: "Stretched canvas · Made to measure",
    story:
      "A grove that keeps its own sun — golden light held on canvas, glowing for the room where your day winds down.",
    craft:
      "Bare trees drawn dark over a luminous yellow ground, the sun's rays pulled through in long diagonal strokes and built up in layered glazes until the canvas holds its own light.",
    theme: "#2b350c", // deep olive — the painting's dark undergrowth, counterpoint to the golden light
    image: "/gallery/sunfall.webp",
    alt: "Sunfall — a golden sunlit forest painting on canvas, standing amid a real cool misty pine forest with ferns and moss",
  },
];
