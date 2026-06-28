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

/** Subject pools, each ordered with the most on-subject art first and kept broad
    (≥2 members) so a category's cards rotate through several illustrations rather
    than repeating one or two. Regenerative/biostimulation treatments lead with
    the science line-art (vial / DNA). */
const POOLS = {
  science: [ART.vial, ART.dna, ART.faceHand, ART.faceWoman],
  face: [ART.faceWoman, ART.faceHand, ART.profileLips, ART.vial, ART.dna],
  lips: [ART.profileLips, ART.faceWoman, ART.faceHand],
  body: [ART.bodyFemale, ART.bodyArmsUp, ART.maleAbs, ART.profilesPair],
  hair: [ART.hair, ART.profilesPair],
  skin: [ART.faceHand, ART.faceWoman, ART.vial, ART.dna, ART.profileLips],
} as const;
type PoolKey = keyof typeof POOLS;

const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};
const pick = (pool: readonly string[], seed: string) => pool[hash(seed) % pool.length];

/** Pick the subject pool key for a treatment from its name/category. */
const poolKeyFor = (hay: string, categorySlug?: string): PoolKey => {
  if (categorySlug === 'hair' || /hair|scalp/.test(hay)) return 'hair';
  if (categorySlug === 'lips' || /\blip\b|\blips\b|lip /.test(hay)) return 'lips';
  if (categorySlug === 'body' || /body|fat|cellulite|coolsculpt|freez|contour|tighten|radiofrequenc|ultrasound|sculpt/.test(hay)) return 'body';
  if (/prp|exosome|polynucleotide|profhilo|sculptra|booster|mesotherap|stem|nctf|collagen|biostim|microneedl|peel/.test(hay)) return 'science';
  if (categorySlug === 'skin' || /facial|detox|cleansing|pigment|acne|texture|glow/.test(hay)) return 'skin';
  return 'face'; // face, anti-wrinkle, most fillers
};
const poolFor = (hay: string, categorySlug?: string): readonly string[] => POOLS[poolKeyFor(hay, categorySlug)];

/** Centerpiece cartoons for a whole category's cards, in render order. Each
    subject pool keeps its own cursor so its members cycle evenly, and a card is
    nudged to the next member whenever it would repeat the card before it — so the
    grid stays varied with no two adjacent cards sharing the same line-art. */
export const cartoonsForTreatments = (
  items: { slug: string; name: string; categorySlug?: string }[],
): string[] => {
  const cursor = new Map<PoolKey, number>();
  const out: string[] = [];
  items.forEach((t, idx) => {
    const key = poolKeyFor(`${t.slug} ${t.name}`.toLowerCase(), t.categorySlug);
    const pool = POOLS[key];
    let n = cursor.get(key) ?? 0;
    let art = pool[n % pool.length];
    if (idx > 0 && art === out[idx - 1] && pool.length > 1) { n++; art = pool[n % pool.length]; }
    cursor.set(key, n + 1);
    out.push(art);
  });
  return out;
};

/** Cartoon for a whole category block (homepage featured), keyed by category name. */
export const cartoonForCategory = (name: string): string =>
  pick(poolFor(name.toLowerCase(), name.toLowerCase().replace(/[^a-z]/g, '')), name);

/* ── Condition card imagery ───────────────────────────────────────────
   Each concern is matched to a tasteful, real stock close-up of the relevant
   face or body area (public/assets/conditions/*.jpg). First matching rule wins,
   so order from most-specific to most-generic. Shared by the homepage
   "Explore by condition" grid, the /conditions index and each condition hero. */
const condPhoto = (n: string) => `/assets/conditions/${n}.jpg`;

// FACE — order matters (e.g. brows before eyes, gummy-smile before lips).
const faceConditionRules: [RegExp, string][] = [
  [/eyebrow|\bbrow/, condPhoto('brows')],
  [/eye|tear|periorbit/, condPhoto('under-eye')],
  [/acne|blemish|spot|congest/, condPhoto('acne')],
  [/rosacea|redness|flush|thread.?vein|couperos/, condPhoto('rosacea')],
  [/pigment|melasma|freckle|sun.?damage|hyperpig/, condPhoto('pigmentation')],
  [/gummy|smile|teeth|tooth/, condPhoto('smile')],
  [/lip|barcode|perioral|mouth|smoker/, condPhoto('lips')],
  [/jowl|heavy.?lower|lower.?face|sagging/, condPhoto('neck')],
  [/chin|jaw|bruxism|masseter|pebble/, condPhoto('jawline')],
  [/nasolabial|cheek|fold|shadow|marionette|mid.?face/, condPhoto('cheeks')],
];

// BODY — order matters (thigh before laxity so inner-thigh maps to legs).
const bodyConditionRules: [RegExp, string][] = [
  [/cellulite/, condPhoto('cellulite')],
  [/thigh|\bleg/, condPhoto('cellulite')],
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
