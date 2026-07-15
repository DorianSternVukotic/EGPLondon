# EGP Aesthetics — cartoon line-art generation job (for Sol) — v5

## 1. Job summary

Generate **58 images** for a luxury London aesthetics clinic website. Each image
is a minimal line-art illustration of one treatment (54) or one treatment
category (4). Every prompt below is fully self-contained — generate one image
per prompt, in order. **Save each image with the exact filename given** (the
website maps files to pages by these names).

You (Sol) already hold the uploaded reference illustrations from this session —
**treat them as the visual reference for every image in this batch.**

Two standing rules shape every prompt:

- **Style (v5, your own description of the reference set):** minimalist
  monochrome line art — thin-to-medium **soft-gray** contour lines, smooth
  slightly hand-drawn vector strokes, simplified but anatomically recognizable
  forms, cropped compositions, large negative space, calm clinical elegance.
- **Subject (v3):** every image depicts either the **concern** (drawn in the
  act of fading — before→after inside one motif) or the **finished result**
  (smooth, lifted, dewy, full). The **procedure is never shown**: no syringes,
  needles, cannulas, derma-pens, applicators, brushes or machines anywhere.

## 2. Global output settings

- **Aspect ratio:** 393:422 (≈ 14:15, slightly-portrait). If unsupported, use
  1:1 and keep the subject clear of all edges so the sides can be cropped.
- **Resolution:** at least 1024 px on the short side. PNG or webp output
  (final site format is webp; conversion is fine).
- **One subject per image.** No collages, no variants in-frame.

## 3. Style rules (already baked into every prompt — do not override)

- Thin-to-medium **soft medium-gray** contour lines — never heavy black —
  smooth, clean, slightly hand-drawn vector strokes with restrained
  line-weight variation.
- **Background:** flat white / very light warm-gray (#F6F5F3 target), uniform
  and untextured. The site multiplies these images onto coloured surfaces, so
  any tone shift or texture will show as dirt — keep the field clean.
- Little to no shading; no gradients, no crosshatching, no colour, no text.
  An occasional **solid soft-gray fill is allowed only for hair or one tiny
  accent**, as in the reference set.
- Simplified but anatomically recognizable human forms, sparse internal
  detail; close or partial crops with generous negative space.
- **Problem or result, never the procedure.** Each subject is either the
  concern drawn dissolving — lines breaking into dots and vanishing, folds
  smoothing, contours redrawn slimmer or lifted — or the beautiful outcome
  already achieved. **No syringes, needles, cannulas, derma-pens, rollers,
  applicators, brushes, wands or machines appear in any image.**
- Allowed objects are symbolic motifs only: droplets, waves, snowflake
  crystals, sparkle glints, stipple dots, thin guide arcs and arrows, a
  measuring-tape hint — plus two still-life product icons named explicitly in
  their prompts (the PRP test tube, the NCTF vial), always without a needle.
- Droplets stand for moisture and liquid products only (skin boosters,
  hydration, mesotherapy, PRP, exosomes). Filler is a structural gel, not a
  liquid — filler subjects use volume arcs, defined contour strokes and soft
  rounded forms instead, never droplets.
- Calm, clinical, elegant, understated — refined beauty-clinic category
  illustration, never cartoonish exaggeration.
- When a face or figure appears, depict the **same elegant woman** with softly
  defined features throughout the series, so the set reads as one artist's work.

## 4. Negative prompt (apply to every image if the tool accepts one)

> photorealistic, colorful, heavy shading, watercolor, pencil texture,
> cross-hatching, 3D render, detailed background, dramatic lighting, thick
> black outlines, cartoon exaggeration, text, labels, frame, clutter, high
> contrast, syringe, needle, cannula, injection, derma-pen, dermaroller,
> medical device, machine, instrument, hand holding a tool, watermark,
> signature, dark or mid-grey background, background texture, multiple scenes,
> blood, distorted anatomy

## 5. Consistency protocol

1. Generate **`cat-face.webp` first** and treat it — together with the
   uploaded reference illustrations — as the series anchor.
2. Keep seed/style settings identical across the batch and match every image
   to the reference set's line weight, gray tone and crop feel.
3. Batch order: the 4 category watermarks, then FACE, ANTI-WRINKLE, FILLERS,
   BODY, then the rest.

---

## 6. Prompts

### Category watermarks — generate first (these render LARGE behind text: the subject must occupy the RIGHT 60 % of the canvas, left third empty)

**`cat-face.webp`** *(series anchor)*
> Minimalist editorial medical line drawing of a serene woman's face in three-quarter view, eyes closed, hair sweeping back with a soft solid-gray hair accent, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, composed in the right 60 % of a slightly-portrait canvas with the left third left as empty white space, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`cat-anti-wrinkle.webp`**
> Minimalist editorial medical line drawing of a serene woman's smooth relaxed forehead and closed eyes, three faint horizontal expression lines dissolving into tiny dots and vanishing to one side, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, composed in the right 60 % of a slightly-portrait canvas with the left third left as empty white space, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`cat-fillers.webp`**
> Minimalist editorial medical line drawing of an elegant female profile with harmoniously full lips, one luminous crescent line traced along the cheekbone with a soft supporting volume arc nestled beneath it, and one clean defining stroke tracing the jawline, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, composed in the right 60 % of a slightly-portrait canvas with the left third left as empty white space, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`cat-body.webp`**
> Minimalist editorial medical line drawing of a standing female figure drawn in one elegant continuous contour from shoulder to thigh, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, composed in the right 60 % of a slightly-portrait canvas with the left third left as empty white space, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

### FACE treatments (17) — subject slightly right of centre, one clear focal point (these also appear as small square crops)

**`3-step-under-eye-signature-treatment.webp`**
> Minimalist editorial medical line drawing of a close-up of a closed eye with long lashes, the under-eye area smooth and bright, three delicate droplet marks arranged in a gentle arc beneath the lower lid, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`5-point-facelift.webp`**
> Minimalist editorial medical line drawing of a woman's face in three-quarter view with five small dots marked at the temple, brow tail, cheekbone, jawline and chin, joined by one subtle upward-lifting arc, the whole face reading gently lifted, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`deep-cleansing-facial.webp`**
> Minimalist editorial medical line drawing of a serene woman's face with eyes closed, fresh luminous skin, two small sparkle glints high on the cheek and one clean sweeping highlight line along the jaw, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`deep-hydra-detox-facial.webp`**
> Minimalist editorial medical line drawing of a woman's face with eyes closed, dewy quenched skin, three water droplets and one gentle wave motif flowing across her cheek, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`digital-skin-analysis-consultation.webp`**
> Minimalist editorial medical line drawing of a woman's face front-on overlaid with a fine light scanning grid of thin straight lines, like a gentle digital analysis reticle, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`exosomes-face.webp`**
> Minimalist editorial medical line drawing of one large droplet releasing a cluster of tiny circles, floating beside a serene female profile with renewed smooth skin, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`free-discovery-consultation.webp`**
> Minimalist editorial medical line drawing of two elegant head-and-shoulder profiles facing each other in calm conversation, a practitioner and a client, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`full-face-balancing.webp`**
> Minimalist editorial medical line drawing of a woman's face front-on in serene harmony, with a light vertical symmetry axis and two thin proportion arcs across brow and lip level, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`injectable-mesotherapy.webp`**
> Minimalist editorial medical line drawing of a serene woman's cheek, dewy and revitalised, with a constellation of tiny dew dots along the skin and one soft radiance line rising from them, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`medical-skin-peels.webp`**
> Minimalist editorial medical line drawing of a female profile with one delicate translucent layer lifting away from the cheek like a fine leaf, revealing a smooth fresh contour beneath, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`microneedling-facial.webp`**
> Minimalist editorial medical line drawing of a serene woman's face where a small patch of fine uneven stipple texture on the cheek smooths into one clean renewed luminous contour, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`nctf-under-eye-skin-booster.webp`**
> Minimalist editorial medical line drawing of a close-up of a closed eye, rested and bright, a tiny elegant vial standing beside it as a still-life icon and three fine dew droplets beneath the lash line, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`prp-face.webp`**
> Minimalist editorial medical line drawing of a slender test tube standing as a still-life icon with a visibly separated plasma layer drawn as a single dividing line, two small droplets beside it and one soft radiance line, no hands, no needle, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`polynucleotides-face.webp`**
> Minimalist editorial medical line drawing of one elegant flowing filament strand curving in a soft double loop beside a serene female profile with firm renewed skin, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`profhilo.webp`**
> Minimalist editorial medical line drawing of a woman's face front-on with dewy luminous skin, five small glow points marked on each side across cheek and jaw with thin soft radiance rays spreading gently from them, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`sculptra-face.webp`**
> Minimalist editorial medical line drawing of a female profile with a firm lifted cheek contour and a delicate lattice of small dots connected by thin lines along the cheek, suggesting a fine rebuilding scaffold under the skin, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`skin-boosters.webp`**
> Minimalist editorial medical line drawing of a single droplet landing on a woman's dewy cheek with two fine ripple rings spreading around it, the skin plump and luminous, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

### ANTI-WRINKLE treatments (14)

**`anti-wrinkle-injections.webp`**
> Minimalist editorial medical line drawing of a serene woman's upper face with eyes closed, faint expression lines at the forehead and eye corners dissolving into dots and vanishing, the skin left smooth and calm, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`baby-botox.webp`**
> Minimalist editorial medical line drawing of a youthful smooth forehead with soft natural brows and one single whisper-faint line fading at its centre, the subtlest possible refinement, the face natural and mobile, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`brow-lift.webp`**
> Minimalist editorial medical line drawing of a close-up of one elegant eye with a defined eyebrow and a soft thin arc sweeping upward from the brow tail, the eye reading open and lifted, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`bruxism-grinding.webp`**
> Minimalist editorial medical line drawing of a female side profile of the lower face and jaw with a small starburst of short tension lines at the jaw corner easing and dissolving away, the jaw relaxed, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`bunny-lines.webp`**
> Minimalist editorial medical line drawing of a close-up of an elegant nose and inner eyes with tiny diagonal lines on the sides of the nose bridge fading out, the bridge left smooth, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`eye-wrinkles.webp`**
> Minimalist editorial medical line drawing of the outer corner of a closed eye with a few crow's-feet rays that soften and break into small dots as they fade, the surrounding skin smooth, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`forehead-lines.webp`**
> Minimalist editorial medical line drawing of a close-up of a forehead and brows where three horizontal wave lines progressively smooth into a single flat calm line, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`glabella-lines.webp`**
> Minimalist editorial medical line drawing of two elegant eyebrows with the two short vertical frown lines between them dissolving into dots, the brow serene, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`gummy-smile.webp`**
> Minimalist editorial medical line drawing of a gentle balanced smile showing a thin upper teeth line, the upper lip resting naturally with one small curved guide arrow easing it softly downward, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`jaw-slimming.webp`**
> Minimalist editorial medical line drawing of a woman's lower face front-on with two thin guide lines forming a V-taper from a wider jaw to a slimmer refined chin contour, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`lip-lines.webp`**
> Minimalist editorial medical line drawing of elegant lips with fine radial lines around the mouth fading and dissolving outward, the lip border smooth and defined, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`neck-lift.webp`**
> Minimalist editorial medical line drawing of an elegant taut neck and jawline in profile with two thin sweeping lines rising upward along the neck toward the jaw, suggesting lift, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`pebble-chin.webp`**
> Minimalist editorial medical line drawing of a close-up of a chin where a patch of tiny stipple dots smooths into one clean unbroken curve, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`barcode-lips.webp`**
> Minimalist editorial medical line drawing of a close-up of elegant lips with fine vertical lines above the upper lip fading away, the skin above the lip left smooth, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

### FILLERS treatments (12)

**`cheek-mid-face-filler.webp`**
> Minimalist editorial medical line drawing of a woman's face in three-quarter view with one luminous crescent line traced along a beautifully lifted cheekbone, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`chin-filler.webp`**
> Minimalist editorial medical line drawing of a female profile with a subtle dashed projection arc just in front of the chin suggesting refined forward balance, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`dermal-fillers-cheeks.webp`**
> Minimalist editorial medical line drawing of a woman's face front-on with one soft circle at the apple of each cheek and a small lifting tick above each, the cheeks full and lifted, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`dermal-fillers-nasolabial.webp`**
> Minimalist editorial medical line drawing of a woman's face front-on with the fold line from nose to mouth corner softening and fading on one side, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`filler-dissolving.webp`**
> Minimalist editorial medical line drawing of one small soft sphere beside a smooth natural cheek contour dispersing into a drift of scattered small particles that fade away, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`filler-marionette-lines.webp`**
> Minimalist editorial medical line drawing of a close-up of elegant lips and chin where two short downward lines at the mouth corners are lifted into a serene neutral curve, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`filler-nasolabial-folds.webp`**
> Minimalist editorial medical line drawing of a female side profile with the nasolabial crease between nose and mouth smoothing into the cheek, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`jawline-filler.webp`**
> Minimalist editorial medical line drawing of a striking female profile whose jawline is traced from ear to chin in one clean confident defining line, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`lip-enhancement.webp`**
> Minimalist editorial medical line drawing of elegant full lips with a subtle second outline halo traced just beyond the natural lip line, suggesting gently enhanced volume, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`lip-hydration.webp`**
> Minimalist editorial medical line drawing of elegant lips with one water droplet above them and two small dewy sheen marks on the lower lip, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`tear-trough-filler.webp`**
> Minimalist editorial medical line drawing of a close-up of a closed eye where the under-eye hollow's faint shadow line fades away, with a soft restored crescent of smooth volume beneath the lash line, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`temple-filler.webp`**
> Minimalist editorial medical line drawing of the upper side of a woman's face with brow and hairline, and a small rounded arc restoring softness at the temple hollow, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

### BODY treatments (6)

**`body-fat-burning-mesotherapy.webp`**
> Minimalist editorial medical line drawing of an elegant female torso in contour, the former softer waist outline faint and dissolving into small particles while a slimmer refined curve is traced confidently inside it, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`coolsculpting.webp`**
> Minimalist editorial medical line drawing of a female torso contour where a soft outward curve at the flank is redrawn as a slim inward line, three delicate snowflake crystals drifting beside the waist, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`fat-freezing-abolten.webp`**
> Minimalist editorial medical line drawing of a front-on abdomen contour, slim and smooth, with two small frost crystals, one thin inward-curving slimming arrow at the waist and a hint of measuring tape below, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`rf-ultrasound-tightening.webp`**
> Minimalist editorial medical line drawing of an elegant thigh-and-hip contour, taut and smooth, with three thin concentric wave arcs sweeping along the skin suggesting firmness returning, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`ultrasound-lift-tighten.webp`**
> Minimalist editorial medical line drawing of a female face-and-neck profile, firm and lifted, with three thin wave arcs rising upward along the jaw and cheek suggesting lift, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`ultrasound-mesotherapy-combined.webp`**
> Minimalist editorial medical line drawing of an elegant torso contour, smooth and toned, with thin wave arcs sweeping across it and a scatter of tiny dots inside the arcs, combining two therapies in one motif, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

### HAIR / LIPS / SKIN treatments (5)

**`laser-hair-removal.webp`**
> Minimalist editorial medical line drawing of a smooth extended female leg drawn in one clean sweeping contour, a scatter of tiny stubble dots near the ankle dissolving away, one small sparkle glint on the polished shin, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`prp-hair-treatment.webp`**
> Minimalist editorial medical line drawing of the crown of a woman's head with flowing hair parted in the middle, drawn with a soft solid-gray hair accent, several fine new-growth hair lines sprouting along the parting, the hair fuller and denser around them, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`lip-fillers.webp`**
> Minimalist editorial medical line drawing of full softly sculpted elegant lips front-on with one confident voluminous outline and a second soft inner curve accentuating the plump lower lip, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`chemical-peel.webp`**
> Minimalist editorial medical line drawing of a close-up of a smooth cheek where a whisper-thin translucent layer curls back at one corner like a turning page, revealing brighter fresh skin marked with two small sparkle glints, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, simplified anatomy, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

**`microneedling.webp`**
> Minimalist editorial medical line drawing of a close-up skin-surface study with no face, a drift of fine uneven stipple dots on one side resolving into two smooth unbroken renewal lines with a soft sheen mark, monochrome soft-gray ink lines, smooth vector-style contours, restrained line-weight variation, sparse internal details, flat white background, large negative space, partially cropped composition with the subject slightly right of centre on a slightly-portrait canvas, subtle elegant beauty-clinic aesthetic, clean healthcare iconography, no shadows, no gradients, no color, no text, no border, no scenery, no photorealism.

---

## 7. Delivery checklist

- [ ] 58 files, each named exactly as its heading (webp, or png for conversion)
- [ ] Soft-gray lines throughout — no heavy black outlines, no high contrast
- [ ] All backgrounds flat white / very light warm-gray, no tone shift or texture
- [ ] No shading, colour, text or borders; solid gray only as an occasional
      hair/accent fill
- [ ] **No syringes, needles, cannulas, devices or tools in any image** — only
      the PRP test tube and NCTF vial appear as still-life icons, needle-free
- [ ] The 4 `cat-*` watermarks right-weighted with an empty left third
- [ ] Faces recognisably the same woman across the series
- [ ] Deliver into `public/assets/cartoons/` — the site falls back to current
      placeholders for any file not yet delivered, so partial batches are safe
