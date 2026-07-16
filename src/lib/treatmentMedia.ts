/** Imagery for the treatments page + homepage featured blocks.
    Cartoon line-art is final (Sol v5.6 set, one sheet per treatment — see
    assets-src/cartoon-generation-brief.md). Category PHOTOS are still DEMO
    MEDIA pulled from skinspirit.com (public/assets/demo) — launch blocker. */
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface CatMedia { photo: string; blurb: string; }

/** Category banner photo + blurb, keyed by a treatment's `categorySlug`.
    Blurbs lead on advanced, non-surgical science — not "filler by default". */
export const catMeta: Record<string, CatMedia> = {
  face: { photo: '/assets/demo/cat-face.webp', blurb: 'Advanced, non-surgical facial rejuvenation — biostimulation and medical skin science, not filler by default.' },
  'anti-wrinkle': { photo: '/assets/demo/cat-injectables.webp', blurb: 'Precise, micro-dosed anti-wrinkle treatment that softens lines while keeping every expression your own.' },
  fillers: { photo: '/assets/demo/cat-fillers.jpg', blurb: 'Considered dermal filler, used with restraint to restore balance — never to overfill.' },
  body: { photo: '/assets/demo/cat-body.jpg', blurb: 'Non-invasive body contouring and skin-tightening, powered by ultrasound, radiofrequency and cryolipolysis.' },
  skin: { photo: '/assets/photos/area-eye.webp', blurb: 'Medical-grade skin treatments — peels, microneedling and boosters that rebuild tone, texture and clarity.' },
  hair: { photo: '/assets/demo/cat-laser.jpg', blurb: 'Regenerative hair and scalp treatment that supports your own natural growth.' },
  lips: { photo: '/assets/photos/area-lips.webp', blurb: 'Natural lip enhancement, kept in proportion with the rest of your face.' },
};

export const fallbackMedia: CatMedia = {
  photo: '/assets/demo/cat-face.webp',
  blurb: 'Advanced, non-surgical treatments, tailored to you.',
};

export const mediaForSlug = (slug?: string): CatMedia => catMeta[slug ?? ''] ?? fallbackMedia;

/* ── Cartoon line-art (Sol v5.6) ──────────────────────────────────────
   One sheet per bookable treatment, filename = slug, plus four large
   category sheets (cat-*.webp) — soft-gray editorial strokes on a
   near-white field, subject slightly right of centre on a ~0.93:1 portrait
   canvas, designed to sit under mix-blend-multiply. */
const cartoon = (name: string) => `/assets/cartoons/${name}.webp`;

/** Sheets on disk, read once at build time — a treatment without its own
    sheet (e.g. a new service after a data re-sync) falls back to its
    category art instead of 404ing. */
const sheets = new Set(
  readdirSync(fileURLToPath(new URL('../../public/assets/cartoons/', import.meta.url)))
    .filter((f) => f.endsWith('.webp'))
    .map((f) => f.replace(/\.webp$/, '')),
);

/** Subject focus for the row vignettes on the treatments index. Every Sol
    sheet follows the same composition template, so one default focus works;
    add per-sheet overrides here (keyed by the /assets path) only where the
    subject sits off-template. `scale` is damped by larger frames
    (see treatments/index.astro). */
export interface MedallionFocus { origin: string; scale: number; }
export const medallionFocus: Record<string, MedallionFocus> = {};
export const fallbackFocus: MedallionFocus = { origin: '58% 42%', scale: 1.7 };

/** Category watermark art, keyed by lowercased category name/slug. The three
    categories without a dedicated cat-* sheet lean on a representative
    treatment sheet. */
const CAT_ART: Record<string, string> = {
  face: cartoon('cat-face'),
  'anti-wrinkle': cartoon('cat-anti-wrinkle'),
  fillers: cartoon('cat-fillers'),
  body: cartoon('cat-body'),
  hair: cartoon('prp-hair-treatment'),
  lips: cartoon('lip-fillers'),
  skin: cartoon('chemical-peel'),
};

/** Cartoon for a whole category block (homepage featured + /treatments cards). */
export const cartoonForCategory = (name: string): string =>
  CAT_ART[name.trim().toLowerCase()] ?? cartoon('cat-face');

/** The free-discovery-consultation sheet — used wherever a consultation CTA
    wants art of the consultation itself rather than a category's subject. */
export const consultationCartoon = cartoon('free-discovery-consultation');

/** Centerpiece cartoons for a category's menu rows, in render order — each
    treatment shows its own sheet (or its category art if missing). */
export const cartoonsForTreatments = (
  items: { slug: string; name: string; categorySlug?: string }[],
): string[] =>
  items.map((t) => (sheets.has(t.slug) ? cartoon(t.slug) : cartoonForCategory(t.categorySlug ?? 'face')));

/* ── Condition card imagery ───────────────────────────────────────────
   Each concern is matched to a tasteful, real stock close-up of the relevant
   face or body area (public/assets/conditions/*.jpg). First matching rule wins,
   so order from most-specific to most-generic. Shared by the homepage
   "Explore by condition" grid, the /conditions index and each condition hero. */
const condPhoto = (n: string) => `/assets/conditions/${n}.jpg`;

// FACE — order matters (e.g. brows before eyes, gummy-smile before lips).
const faceConditionRules: [RegExp, string][] = [
  [/eyebrow|\bbrow|hooded|eyelid|forehead|upper.?face/, condPhoto('brows')],
  [/eye|tear|periorbit/, condPhoto('under-eye')],
  [/acne|blemish|spot|congest/, condPhoto('acne')],
  [/rosacea|redness|flush|sensitive|thread.?vein|couperos/, condPhoto('rosacea')],
  [/pigment|melasma|freckle|sun.?damage|hyperpig/, condPhoto('pigmentation')],
  [/gummy|smile|teeth|tooth/, condPhoto('smile')],
  [/lip|barcode|perioral|mouth|smoker/, condPhoto('lips')],
  [/jowl|heavy.?lower|lower.?face|sagging|weight.?loss/, condPhoto('neck')],
  [/chin|jaw|bruxism|masseter|pebble/, condPhoto('jawline')],
  [/nasolabial|cheek|fold|shadow|marionette|mid.?face|accordion|collagen/, condPhoto('cheeks')],
];

// BODY — order matters (thigh before laxity so inner-thigh maps to legs).
const bodyConditionRules: [RegExp, string][] = [
  [/cellulite/, condPhoto('cellulite')],
  [/thigh|\bleg|knee/, condPhoto('cellulite')],
  [/stretch.?mark/, condPhoto('stretch-marks')],
  [/belly|abdom|tummy|stomach|post.?pregnan|bloat|water.?retention|swelling/, condPhoto('belly')],
  [/love.?handle|flank|waist|muffin/, condPhoto('waist')],
  [/arm|bingo|elbow/, condPhoto('arms')],
  [/double.?chin|jawline.?fat|\bneck|submental/, condPhoto('neck')],
  [/sagging|laxity|saggy|loose|crepe|décolle|decolle/, condPhoto('decolletage')],
];

/** Representative photo for a condition card — accurate per concern, stable
    across builds. Falls back to a clean portrait / décolletage if nothing matches. */
export const conditionPhoto = (c: { slug: string; title: string; group: 'face' | 'body' }): string => {
  const hay = `${c.slug} ${c.title}`.toLowerCase();
  const rules = c.group === 'body' ? bodyConditionRules : faceConditionRules;
  for (const [re, photo] of rules) if (re.test(hay)) return photo;
  return c.group === 'body' ? condPhoto('decolletage') : condPhoto('face');
};
