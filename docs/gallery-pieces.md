# Gallery pieces — the recipe

Standing instructions for adding each new artwork to the collection bento
(`components/sections/Gallery.tsx`, the `WORKS` array). Every piece follows
the same six steps so the gallery stays consistent as the six commissions
are photographed and unveiled one by one.

The bento is one flush rectangle: the artwork on the left, a stretched
column of tiles on the right (name → story → materials/style →
size/craft → CTA). On phones it collapses to a single vertical stack.

## Steps for a new piece

1. **Optimise the image.** Convert the raw photo to WebP into
   `public/gallery/<slug>.webp`, longest edge ~1600px, quality ~82. Aim
   for well under 500 KB. Use sharp (already installed):

   ```bash
   node -e "require('sharp')('<raw>.png').resize({width:1536,height:2048,fit:'inside'}).webp({quality:86}).toFile('public/gallery/<slug>.webp').then(console.log)"
   ```

   Export at ~2048px (long edge, quality ~82–86): the same file feeds both
   the cropped tile *and* the full-definition **lightbox** — clicking a
   tile opens the whole, uncropped image, so it must stay crisp at large
   sizes. Keep it under ~500 KB.

   **Orientation.** Portrait/product shots (`aspect-[3/4]`, shoot tall) use
   the default layout: tall image on the left, tiles on the right. For a
   wide **landscape lifestyle** shot, set `orientation: "landscape"` on the
   WORK — it switches to a compact, one-viewport composition: a cinematic
   16:9 image on top with the piece name overlaid top-right, and the tiles
   packed beneath. The image frame is a thin sleek mount (1px border + a
   hair of paper mat) — never a chunky border.

2. **Fill every `WORKS` field** for the piece (no field left blank):
   - `title` — a real, evocative name. **Never "Commission N".** The
     numbering lives in the `numeral` field + the "N — of six" eyebrow.
   - `style` — the technique, title case (e.g. "Epoxy Wall Showpiece").
   - `medium` — the honest medium line (e.g. "Oil pastel & transparent
     epoxy on acrylic board").
   - `materials` — a short `·`-separated list of what it's made of.
   - `size` — form + "Made to measure".
   - `image` / `alt` — the WebP path and a descriptive alt. Omit both and
     the tile falls back to the "Awaiting unveiling" placeholder.

3. **`story`** — one fancy, creative line. Look at the artwork, feel its
   mood, and sell a *lifestyle*, not the object: where it lives in a home,
   what it does to a room, the evening it belongs to. Make it relatable
   and aspirational. No fluff, no filler — one line that earns its place.

4. **`craft`** — real process facts, not poetry: how many layers, cure
   time, the hand-finishing steps. This signals labour and justifies the
   price. Keep it to a sentence or two.

5. **`theme`** — a **solid** colour (no gradients, no texture). Pull it
   from the artwork's own palette, but go **darker and higher-contrast**
   than the photo's backdrop so the name tile reads as a rich counterpoint
   to the image. Cream text sits on top, so the colour must stay deep
   enough for that text to pass. Example: *Ocean in Six* is shot on
   sky-blue satin → theme is deep marine navy `#0b2d4d`.

6. **CTA copy references the piece by title.** The WhatsApp and email
   builders (`whatsappUrl`, `mailUrl`) already interpolate `work.title`
   and `work.style` — no per-piece edit needed, just keep the title good.

## Notes

- The section background crossfades to each piece's `theme` on scroll
  (GSAP reads the `data-theme` attribute). A good, deep `theme` therefore
  also sets the mood of the whole viewport as the piece takes the frame.
- WhatsApp button label is **"Whisper to the Atelier"** (brand voice) —
  keep it, don't revert to a generic "WhatsApp <name>".
- The brand is spelled **Casted Luxe** in site copy (the repo folder says
  "Crafted Luxe"); match existing copy.
