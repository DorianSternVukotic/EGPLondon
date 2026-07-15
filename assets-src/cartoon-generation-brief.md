# Cartoon line-art — generation brief (v5: Sol, soft-gray editorial line style; problem/result focus, no procedure imagery)

The current 10 sheets in `public/assets/cartoons/` are generic placeholders
cycled across all 54 treatment rows. This brief specifies a **unique,
subject-accurate image per treatment** plus 4 large category watermarks.
The generation-ready prompt list lives in
`assets-src/sol-cartoon-instructions.md`.

**v3 change:** every image depicts either the **concern** (drawn in the act of
fading — a before→after inside one motif) or the **finished result** (smooth,
lifted, dewy, full). The procedure is never shown — **no syringes, needles,
cannulas, derma-pens, applicators, brushes or machines** anywhere. The Sol 5.6
generation results from v2 (in `assets-src/egp-cartoons-sol-5.6/`) were
rejected largely because they leaned on procedure imagery.

**v4 change (superseded):** briefly retargeted to Grok; its output was
rejected too. Grok's clean-vector trigger-word advice is dropped.

**v5 change:** generation retargeted back to **Sol**, using Sol's own
"stronger" template for matching the reference set it holds in-session:
*"Minimalist editorial medical line drawing of [subject], monochrome soft-gray
ink lines, smooth vector-style contours, restrained line-weight variation,
simplified anatomy, sparse internal details, flat white background, large
negative space, partially cropped composition, subtle elegant beauty-clinic
aesthetic, clean healthcare iconography, no shadows, no gradients, no color,
no text, no border, no scenery, no photorealism."* Key traits: **soft gray**
lines (never heavy black / high contrast), restrained weight variation,
cropped compositions, and an occasional **solid-gray fill allowed for hair or
one small accent**. Sol's negative prompt (photorealistic, watercolor, pencil
texture, thick black outlines, cartoon exaggeration, high contrast, …) is
extended with our procedure bans.

**Filenames = treatment slugs** (e.g. `anti-wrinkle-injections.webp`). When the
files land, Claude wires a slug→file map in `src/lib/treatmentMedia.ts`;
missing files fall back to the current pool system, so partial batches are fine.

## Shared style spec (every image)

Prompt skeleton — keep constant, swap only the subject (Sol's recommended
template):

> Minimalist editorial medical line drawing of **[subject from the list
> below]**, monochrome soft-gray ink lines, smooth vector-style contours,
> restrained line-weight variation, simplified anatomy, sparse internal
> details, flat white background, large negative space, partially cropped
> composition with the subject slightly right of centre on a slightly-portrait
> canvas, subtle elegant beauty-clinic aesthetic, clean healthcare
> iconography, no shadows, no gradients, no color, no text, no border, no
> scenery, no photorealism.

- Canvas ~0.93:1 portrait (existing sheets are 393×422; generate 2–3×, export webp).
- Flat white / very light warm-gray background (#F6F5F3 target) — rendered
  under `mix-blend-multiply`, whites vanish; never mid-grey, dark or textured.
- Soft medium-gray lines, thin-to-medium, smooth and slightly hand-drawn with
  restrained weight variation — never heavy black or high contrast; no
  shading/colour; solid gray only as an occasional hair/accent fill.
- Row images show as small square medallions (80–112 px) — the subject must
  read in a tight square crop; keep one clear focal point.
- **Problem or result, never the procedure.** No tools or devices. Allowed
  objects are symbolic motifs only: droplets, waves, snowflakes, sparkle
  glints, stipple dots, guide arcs/arrows, a measuring-tape hint — plus two
  needle-free still-life product icons (PRP test tube, NCTF vial).
- Droplets mean moisture/liquid products only (boosters, hydration,
  mesotherapy, PRP, exosomes). Filler is a structural gel — filler subjects
  use volume arcs, contour strokes and soft rounded forms, never droplets.
- The 4 watermark sheets additionally MUST be right-weighted (subject in the
  right 60 %, left third empty) — text overlays them from the left.

## FACE category (17)

| File (slug).webp | Draw |
|---|---|
| 3-step-under-eye-signature-treatment | Closed eye in close-up, under-eye smooth and bright, three delicate droplet marks in an arc under the lower lid (result) |
| 5-point-facelift | Three-quarter female face reading gently lifted, five small dots (temple, brow tail, cheekbone, jawline, chin) joined by one subtle lifting arc (result) |
| deep-cleansing-facial | Fresh luminous face, eyes closed, two sparkle glints on the cheek and one clean highlight sweep along the jaw (result) |
| deep-hydra-detox-facial | Dewy quenched face with water droplets and a gentle wave motif flowing across the cheek (result) |
| digital-skin-analysis-consultation | Female face overlaid with a fine scanning grid / reticle lines (service — no problem/result to draw) |
| exosomes-face | Large droplet releasing a cluster of tiny vesicle circles beside a serene renewed profile (science motif) |
| free-discovery-consultation | Two profiles in conversation — practitioner and client facing each other (service) |
| full-face-balancing | Front-on face in serene harmony with a light vertical symmetry axis and proportion arcs (result) |
| injectable-mesotherapy | Dewy revitalised cheek with a constellation of tiny dew dots and one soft radiance stroke — no syringe (result) |
| medical-skin-peels | Face profile with a delicate translucent layer lifting away, smooth fresh contour beneath (problem→result) |
| microneedling-facial | Face where a patch of fine uneven stipple texture on the cheek smooths into a clean luminous contour — no derma-pen (problem→result) |
| nctf-under-eye-skin-booster | Rested bright closed eye, tiny needle-free vial beside it as still-life icon, fine dew droplets beneath the lash line (result) |
| prp-face | Still-life test tube with a visibly separated plasma layer, droplets and a radiance stroke — no hand, no needle (science motif) |
| polynucleotides-face | Single elegant flowing filament/strand curving beside a firm renewed profile (science motif) |
| profhilo | Front-on face with dewy luminous skin, five glow points per side (cheek, jaw) and soft radiance rays (result) |
| sculptra-face | Profile with firm lifted cheek and a delicate dot-lattice scaffold along it (collagen rebuilding, result) |
| skin-boosters | Droplet landing on a dewy plump cheek with fine ripple rings (result) |

## Anti-wrinkle category (14)

| File (slug).webp | Draw |
|---|---|
| anti-wrinkle-injections | Serene upper face, eyes closed, faint lines at forehead and eye corners dissolving into dots — no syringe (problem→result) |
| baby-botox | Youthful smooth forehead with one single whisper-faint line fading — subtlest refinement, face natural and mobile (problem→result) |
| brow-lift | Eye with elegant brow and a soft upward arc lifting the brow tail, eye open and lifted (result) |
| bruxism-grinding | Side profile jaw with a small tension starburst at the masseter easing away, jaw relaxed (problem→result) |
| bunny-lines | Nose close-up with tiny diagonal lines on the bridge sides fading, bridge smooth (problem→result) |
| eye-wrinkles | Eye corner with crow's-feet rays softening into dots, skin left smooth (problem→result) |
| forehead-lines | Forehead close-up with horizontal wave lines smoothing flat (problem→result) |
| glabella-lines | Two brows with the vertical "11" frown lines between them dissolving, brow serene (problem→result) |
| gummy-smile | Balanced smile with a thin upper teeth line, lip resting naturally, small guide arrow easing it downward (result) |
| jaw-slimming | Lower face front-on with a V-taper guide from wide to slim refined jaw contour (problem→result) |
| lip-lines | Lips with fine radial lines around the mouth fading out, lip border smooth and defined (problem→result) |
| neck-lift | Taut neck-and-jawline profile with upward sweep strokes along the neck (result) |
| pebble-chin | Chin close-up, stippled texture dots smoothing into a clean curve (problem→result) |
| barcode-lips | Lips close-up with fine vertical lines above the upper lip fading, skin left smooth (problem→result) |

## Fillers category (12)

| File (slug).webp | Draw |
|---|---|
| cheek-mid-face-filler | Three-quarter face with a luminous crescent along a beautifully lifted cheekbone (result) |
| chin-filler | Profile with a subtle projection arc guide at the chin (result) |
| dermal-fillers-cheeks | Front-on face with soft lifted circles at the apples of the cheeks, cheeks full and lifted (result) |
| dermal-fillers-nasolabial | Front-on face with the nose-to-mouth fold line softening/fading (problem→result) |
| filler-dissolving | Small soft sphere dispersing into scattered particles beside a smooth natural cheek (problem→result) |
| filler-marionette-lines | Mouth corners with downward lines lifting into a neutral curve (problem→result) |
| filler-nasolabial-folds | Profile view with the nasolabial crease smoothing (different angle from dermal-fillers-nasolabial) |
| jawline-filler | Strong clean jawline profile traced ear-to-chin with one defining stroke (result) |
| lip-enhancement | Lips with a subtle halo outline just beyond the natural lip line — gently enhanced volume (result) |
| lip-hydration | Lips with a water droplet and dewy sheen marks (result) |
| tear-trough-filler | Under-eye hollow's shadow line fading, soft restored crescent of volume beneath the lash line — no cannula (problem→result) |
| temple-filler | Upper side of face with a small rounded volume arc at the temple hollow (result) |

## BODY category (6)

| File (slug).webp | Draw |
|---|---|
| body-fat-burning-mesotherapy | Torso with the former softer waist outline dissolving into particles, a slimmer curve traced inside it — no injection dots (problem→result) |
| coolsculpting | Torso with a soft flank bulge redrawn as a slim inward line, snowflake crystals drifting beside the waist — no applicator cup (problem→result) |
| fat-freezing-abolten | Slim smooth abdomen with frost crystals, an inward slimming contour arrow, measuring-tape hint (result) |
| rf-ultrasound-tightening | Taut smooth thigh-and-hip contour with concentric wave arcs sweeping along the skin — no device head (result) |
| ultrasound-lift-tighten | Firm lifted face-to-neck profile with rising wave arcs (result) |
| ultrasound-mesotherapy-combined | Smooth toned torso outline with wave arcs plus micro-dots together (result) |

## HAIR (2) / LIPS (1) / SKIN (2)

| File (slug).webp | Draw |
|---|---|
| laser-hair-removal | Smooth sweeping leg contour, tiny stubble dots near the ankle dissolving away, one sparkle glint on the shin — no device (problem→result) |
| prp-hair-treatment | Crown/scalp parting with new-growth hair strokes sprouting, hair fuller and denser around them (result) |
| lip-fillers | Full softly sculpted lips front-on with one confident voluminous outline and a soft inner curve accentuating the plump lower lip — no syringe (result) |
| chemical-peel | Close-up cheek with a whisper-thin layer curling back like a turning page, brighter skin and sparkle glints beneath — no brush (problem→result) |
| microneedling | Skin-surface study, no face: uneven stipple dots resolving into smooth renewal strokes with a sheen mark — no pen (problem→result) |

## Category watermarks (4) — shown LARGE, must be right-weighted

| File | Draw | Where it shows |
|---|---|---|
| cat-face.webp | Serene three-quarter female face, eyes closed | FACE consultation card (/treatments) + homepage featured block |
| cat-anti-wrinkle.webp | Smooth relaxed forehead and closed eyes, faint expression lines dissolving into dots — no syringe | Anti-wrinkle consultation card + homepage featured block |
| cat-fillers.webp | Elegant profile with harmoniously full lips, a cheekbone crescent with supporting volume arc, and a defining jawline stroke — no syringe, no droplet | Fillers consultation card + homepage featured block |
| cat-body.webp | Standing female figure, elegant single contour | BODY consultation card (/treatments) |

## Implementation notes (for Claude, after generation)

- Add a `slug → /assets/cartoons/<slug>.webp` map in `src/lib/treatmentMedia.ts`
  with pool fallback for missing files; point `cartoonForCategory` at the 4
  `cat-*.webp` sheets.
- Recalibrate `medallionFocus` per new sheet (zoom origin + scale, eyeballed).
- Fix the Sculptra quirk while there ("sculpt" matches the body-pool regex
  before the science pool).
- Concern/condition cards use photos, not cartoons — out of scope.
