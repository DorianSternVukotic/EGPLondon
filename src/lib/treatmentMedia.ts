/** DEMO MEDIA ONLY — imagery for the treatments page + homepage featured blocks.
    Category photos pulled from skinspirit.com (public/assets/demo); cartoon
    line-art supplied by the client (public/assets/cartoons). Not final imagery. */
export interface CatMedia { photo: string; blurb: string; }

/** Category banner photo + blurb, keyed by a treatment's `categorySlug`.
    Blurbs lead on advanced, non-surgical science — not "filler by default". */
export const catMeta: Record<string, CatMedia> = {
  face: { photo: '/assets/demo/cat-face.webp', blurb: 'Advanced, non-surgical facial rejuvenation — biostimulation and medical skin science, not filler by default.' },
  'anti-wrinkle': { photo: '/assets/demo/cat-injectables.webp', blurb: 'Precise, micro-dosed anti-wrinkle treatment that softens lines while keeping every expression your own.' },
  fillers: { photo: '/assets/demo/cat-fillers.jpg', blurb: 'Considered dermal filler, used with restraint to restore balance — never to overfill.' },
  body: { photo: '/assets/demo/cat-body.jpg', blurb: 'Non-invasive body contouring and skin-tightening, powered by ultrasound, radiofrequency and cryolipolysis.' },
  skin: { photo: '/assets/demo/cat-skin.jpg', blurb: 'Medical-grade skin treatments — peels, microneedling and boosters that rebuild tone, texture and clarity.' },
  hair: { photo: '/assets/demo/cat-laser.jpg', blurb: 'Regenerative hair and scalp treatment that supports your own natural growth.' },
  lips: { photo: '/assets/demo/cat-wellness.jpg', blurb: 'Natural lip enhancement, kept in proportion with the rest of your face.' },
};

export const fallbackMedia: CatMedia = {
  photo: '/assets/demo/cat-face.webp',
  blurb: 'Advanced, non-surgical treatments, tailored to you.',
};

export const mediaForSlug = (slug?: string): CatMedia => catMeta[slug ?? ''] ?? fallbackMedia;

/** Named cartoon line-art (public/assets/cartoons), so pools read clearly.
    Each is right-weighted line-art on a near-white field — designed to sit
    full-bleed under mix-blend-multiply with text overlaid on the left/bottom. */
const ART = {
  faceHand: '/assets/cartoons/category12122.webp',     // woman, hand at chin, eyes closed
  bodyArmsUp: '/assets/cartoons/category19577.webp',   // female torso, arms raised
  profileLips: '/assets/cartoons/category26289.webp',  // side profile, lips
  vial: '/assets/cartoons/category50064.webp',         // hand holding a serum/PRP vial
  maleAbs: '/assets/cartoons/category59085.webp',      // male torso / abdomen
  hair: '/assets/cartoons/category72859.webp',         // styled hair / scalp
  dna: '/assets/cartoons/category75876.webp',          // DNA double helix
  faceWoman: '/assets/cartoons/category87331.webp',    // woman's face, three-quarter
  bodyFemale: '/assets/cartoons/category91566.webp',   // female body, standing
  profilesPair: '/assets/cartoons/category98864.webp', // two male head/shoulder profiles
} as const;

/** Full pool (kept for any generic use). */
export const cartoons = Object.values(ART);

/** Subject pools so the now-prominent line-art matches the treatment. */
const POOLS = {
  science: [ART.vial, ART.dna],
  face: [ART.faceWoman, ART.faceHand],
  lips: [ART.profileLips, ART.faceWoman],
  body: [ART.bodyFemale, ART.bodyArmsUp, ART.maleAbs],
  hair: [ART.hair, ART.profilesPair],
  skin: [ART.faceHand, ART.faceWoman, ART.vial],
} as const;

const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};
const pick = (pool: readonly string[], seed: string) => pool[hash(seed) % pool.length];

/** Pick the subject pool for a treatment from its name/category, then choose a
    stable member by slug hash. Regenerative/biostimulation treatments lead with
    the science line-art (vial / DNA). */
const poolFor = (hay: string, categorySlug?: string): readonly string[] => {
  if (/prp|exosome|polynucleotide|profhilo|sculptra|booster|mesotherap|stem|nctf|collagen|biostim|microneedl|peel/.test(hay)) return POOLS.science;
  if (categorySlug === 'hair' || /hair|scalp/.test(hay)) return POOLS.hair;
  if (categorySlug === 'lips' || /\blip\b|\blips\b|lip /.test(hay)) return POOLS.lips;
  if (categorySlug === 'body' || /body|fat|cellulite|coolsculpt|freez|contour|tighten|radiofrequenc|ultrasound|sculpt/.test(hay)) return POOLS.body;
  if (categorySlug === 'skin' || /facial|detox|cleansing|pigment|acne|texture|glow/.test(hay)) return POOLS.skin;
  return POOLS.face; // face, anti-wrinkle, most fillers
};

/** Centerpiece cartoon for a treatment card — category-aware + stable per slug. */
export const cartoonForTreatment = (t: { slug: string; name: string; categorySlug?: string }): string =>
  pick(poolFor(`${t.slug} ${t.name}`.toLowerCase(), t.categorySlug), t.slug);

/** Cartoon for a whole category block (homepage featured), keyed by category name. */
export const cartoonForCategory = (name: string): string =>
  pick(poolFor(name.toLowerCase(), name.toLowerCase().replace(/[^a-z]/g, '')), name);

/** Legacy: deterministic cartoon from a seed string (kept for back-compat). */
export const cartoonFor = (seed: string): string => pick(cartoons, seed);

/* ── Condition card imagery ───────────────────────────────────────────
   Face concerns use the deaging-europe condition photos (public/assets/
   conditions). The reference site carries no body imagery, so body concerns
   fall back to clean clinic lifestyle photos, picked deterministically. */
const refPhoto = (n: string) => `/assets/conditions/${n}.jpg`;

// First matching rule wins; applied to FACE concerns only.
const faceConditionRules: [RegExp, string][] = [
  [/eye|tear/, refPhoto('eyes')],
  [/acne/, refPhoto('acne')],
  [/pigment|melasma|rosacea/, refPhoto('pigmentation')],
  [/jowl|sagging|heavy|chin|bruxism|jaw|neck/, refPhoto('sagging')],
  [/wrinkle|line|fold|brow|cheek|smile|lip|nasolabial/, refPhoto('wrinkles')],
];

const bodyConditionPhotos = [
  '/assets/demo/cat-body.jpg',
  '/assets/demo/cat-laser.jpg',
  '/assets/demo/cat-skin.jpg',
];

/** Representative photo for a condition card. Stable per slug across builds. */
export const conditionPhoto = (c: { slug: string; title: string; group: 'face' | 'body' }): string => {
  if (c.group === 'body') {
    let h = 0;
    for (let i = 0; i < c.slug.length; i++) h = (h * 31 + c.slug.charCodeAt(i)) >>> 0;
    return bodyConditionPhotos[h % bodyConditionPhotos.length];
  }
  const hay = `${c.slug} ${c.title}`.toLowerCase();
  for (const [re, photo] of faceConditionRules) if (re.test(hay)) return photo;
  return refPhoto('wrinkles'); // generic face fallback
};
