/** DEMO MEDIA ONLY — imagery for the treatments page + homepage featured blocks.
    Category photos pulled from skinspirit.com (public/assets/demo); cartoon
    line-art supplied by the client (public/assets/cartoons). Not final imagery. */
export interface CatMedia { photo: string; blurb: string; }

/** Category banner photo + blurb, keyed by a treatment's `categorySlug`. */
export const catMeta: Record<string, CatMedia> = {
  face: { photo: '/assets/demo/cat-face.webp', blurb: 'Regenerative facials and rejuvenation for a healthy, natural glow.' },
  'anti-wrinkle': { photo: '/assets/demo/cat-injectables.webp', blurb: 'Refined anti-wrinkle treatments that soften lines while keeping your expressions your own.' },
  fillers: { photo: '/assets/demo/cat-fillers.jpg', blurb: 'Subtle dermal fillers to restore volume, contour and balance.' },
  body: { photo: '/assets/demo/cat-body.jpg', blurb: 'Body contouring and skin-tightening to refine and renew.' },
  skin: { photo: '/assets/demo/cat-skin.jpg', blurb: 'Targeted skin treatments for tone, texture and clarity.' },
  hair: { photo: '/assets/demo/cat-laser.jpg', blurb: 'Regenerative hair and scalp treatments to support natural growth.' },
  lips: { photo: '/assets/demo/cat-wellness.jpg', blurb: 'Natural lip enhancement, in proportion with your features.' },
};

export const fallbackMedia: CatMedia = {
  photo: '/assets/demo/cat-face.webp',
  blurb: 'Expert, regenerative treatments tailored to you.',
};

export const mediaForSlug = (slug?: string): CatMedia => catMeta[slug ?? ''] ?? fallbackMedia;

/** Full cartoon line-art pool. */
export const cartoons = [
  '/assets/cartoons/category12122.webp',
  '/assets/cartoons/category19577.webp',
  '/assets/cartoons/category26289.webp',
  '/assets/cartoons/category50064.webp',
  '/assets/cartoons/category59085.webp',
  '/assets/cartoons/category72859.webp',
  '/assets/cartoons/category75876.webp',
  '/assets/cartoons/category87331.webp',
  '/assets/cartoons/category91566.webp',
  '/assets/cartoons/category98864.webp',
];

/** Deterministic "random" cartoon from the pool, seeded by a string (slug/name)
    so it varies per treatment but stays stable across builds. */
export const cartoonFor = (seed: string): string => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return cartoons[h % cartoons.length];
};

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
