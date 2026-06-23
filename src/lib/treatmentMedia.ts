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
