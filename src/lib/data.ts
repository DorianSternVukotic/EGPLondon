import servicesRaw from '../data/services.json';
import conditionsRaw from '../data/conditions.json';
import concernsLocalRaw from '../data/concerns-local.json';
import galleryRaw from '../data/gallery.json';
import reviewsRaw from '../data/reviews.json';

/* ── Types ─────────────────────────────────────────────────────────── */
export interface Treatment {
  id: string;
  name: string;
  slug: string;
  description: string;
  details: string;
  benefits: string[];
  preparation: string;
  aftercare: string;
  duration: number;
  price: number;
  discountedPrice: number | null;
  isFeatured: boolean;
  requiresConsultation: boolean;
  downtimeDays: number | null;
  resultsWeeks: number | null;
  category: string;
  categorySlug: string;
}

export interface Condition {
  id: string;
  title: string;
  slug: string;
  category: string; // "Face Conditions" | "Body Conditions"
  group: 'face' | 'body';
  description: string;
  treatments: { label: string; price: number | null; slug: string | null }[];
  popular: boolean;
}

/* ── Helpers ───────────────────────────────────────────────────────── */
const tidy = (s: string | null | undefined) => (s ?? '').trim();
const normSlug = (s: string) => s.replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();

export const formatPrice = (p: number | null | undefined) =>
  p == null ? '' : p === 0 ? 'Free' : `£${p.toLocaleString('en-GB')}`;

export const formatDuration = (m: number | null | undefined) => {
  if (!m) return '';
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
};

/* A deterministic, brand-tinted gradient used as a placeholder where the
   source data carries no imagery (all image_url are null). */
const gradients = [
  'linear-gradient(135deg,#e6ddd1 0%,#d4c9bc 100%)',
  'linear-gradient(135deg,#efeae3 0%,#c9c1b0 100%)',
  'linear-gradient(135deg,#d4c9bc 0%,#9d9585 100%)',
  'linear-gradient(135deg,#f2ede5 0%,#cfc3b4 100%)',
  'linear-gradient(135deg,#e9e2d6 0%,#b5ad9d 100%)',
];
export const placeholderGradient = (seed: string) => {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return gradients[h % gradients.length];
};

/* ── Treatments (the bookable menu = "BOOK NOW" tab, deduped) ──────── */
const _treatments: Treatment[] = (() => {
  const seen = new Set<string>();
  return (servicesRaw.services as any[])
    .filter((s) => s.main_tab?.slug === 'book-now')
    .filter((s) => (seen.has(s.slug) ? false : (seen.add(s.slug), true)))
    .map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      description: tidy(s.description),
      details: tidy(s.details),
      benefits: Array.isArray(s.benefits) ? s.benefits.filter(Boolean) : [],
      preparation: tidy(s.preparation),
      aftercare: tidy(s.aftercare),
      duration: s.duration ?? 0,
      price: s.price ?? 0,
      discountedPrice: s.discounted_price ?? null,
      isFeatured: !!s.is_featured,
      requiresConsultation: !!s.requires_consultation,
      downtimeDays: s.downtime_days ?? null,
      resultsWeeks: s.results_duration_weeks ?? null,
      category: s.category?.name ?? 'Treatments',
      categorySlug: s.category?.slug ?? 'treatments',
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
})();

/* ── Conditions (deduped by normalised slug) ───────────────────────── */

/* Condition records name treatments loosely ("PRP Treatment", "Sculptra")
   rather than by menu name — map those spellings to real treatment pages.
   Labels with no bookable equivalent ("Combined Treatment", "IPL Therapy",
   "Skincare Routine") are deliberately absent and render unlinked. */
const treatmentAliases: Record<string, string> = {
  'radiofrequency & ultrasound': 'rf-ultrasound-tightening',
  'prp treatment': 'prp-face',
  'ultrasound lift & tighten': 'ultrasound-lift-tighten',
  'ultrasound therapy': 'ultrasound-lift-tighten',
  'fat freezing treatment': 'fat-freezing-abolten',
  'medical skin peels': 'medical-skin-peels',
  '3-step under-eye treatment': '3-step-under-eye-signature-treatment',
  'under-eye skin booster': 'nctf-under-eye-skin-booster',
  'profhilo': 'profhilo',
  'barcode lips treatment': 'barcode-lips',
  'bruxism treatment': 'bruxism-grinding',
  'masseter treatment': 'jaw-slimming',
  'pebble chin treatment': 'pebble-chin',
  'sculptra': 'sculptra-face',
  'gummy smile treatment': 'gummy-smile',
  'nasolabial folds filler': 'filler-nasolabial-folds',
  'body fat burning mesotherapy': 'body-fat-burning-mesotherapy',
  'exosomes': 'exosomes-face',
  'anti-wrinkle injections': 'anti-wrinkle-injections',
  'forehead lines treatment': 'forehead-lines',
  'eye wrinkles': 'eye-wrinkles',
  'ultrasound + mesotherapy': 'ultrasound-mesotherapy-combined',
};

const _conditions: Condition[] = (() => {
  const seen = new Set<string>();
  const treatmentByName = new Map(_treatments.map((t) => [t.name.toLowerCase(), t.slug]));
  const treatmentBySlug = new Map(_treatments.map((t) => [t.slug, t]));
  const bySlug = new Set(_treatments.map((t) => t.slug));
  return ([...(conditionsRaw.conditions as any[]), ...(concernsLocalRaw.conditions as any[])])
    .filter((c) => c.is_active !== false)
    .map((c) => ({ ...c, _slug: normSlug(c.slug) }))
    .filter((c) => (seen.has(c._slug) ? false : (seen.add(c._slug), true)))
    .map((c) => {
      const treatments = (c.treatments ?? []).map((t: string) => {
        const m = t.match(/^(.*?)(?:\s*[-–]\s*£\s*([\d,]+))?$/);
        const label = (m?.[1] ?? t).trim();
        const price = m?.[2] ? Number(m[2].replace(/,/g, '')) : null;
        // best-effort internal link to a real treatment page
        const key = label.toLowerCase();
        const aliased = treatmentAliases[key];
        const slug = treatmentByName.get(key) ?? (aliased && bySlug.has(aliased) ? aliased : null);
        // Condition records carry their own price strings which drift out of
        // date — when the label resolves to a real treatment, always show that
        // treatment's current menu price instead.
        const live = slug ? treatmentBySlug.get(slug) : undefined;
        return { label, price: live ? (live.discountedPrice ?? live.price) : price, slug };
      });
      return {
        id: c.id,
        title: c.title,
        slug: c._slug,
        category: c.category,
        group: /body/i.test(c.category) ? ('body' as const) : ('face' as const),
        description: tidy(c.description),
        treatments,
        popular: !!c.popular,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
})();

/* ── Public accessors ──────────────────────────────────────────────── */
export const getTreatments = () => _treatments;
export const getConditions = () => _conditions;
export const getFeaturedTreatments = () => _treatments.filter((t) => t.isFeatured);
export const getTreatment = (slug: string) => _treatments.find((t) => t.slug === slug);
export const getCondition = (slug: string) => _conditions.find((c) => c.slug === slug);

export const treatmentCategories = () => {
  const map = new Map<string, Treatment[]>();
  for (const t of _treatments) {
    const key = t.category;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(t);
  }
  return [...map.entries()].map(([name, items]) => ({ name, items }));
};

export const conditionGroups = () => ({
  face: _conditions.filter((c) => c.group === 'face'),
  body: _conditions.filter((c) => c.group === 'body'),
});

/* ── Concern categories ────────────────────────────────────────────────
   Editorial taxonomy set by Dr Galina (July 2026). Her named concerns come
   first in each category, followed by clearly-related existing pages; any
   condition in no category renders under "More concerns we treat". */
export interface ConcernCategory {
  key: string;
  title: string;
  group: 'face' | 'body' | 'prevention';
  intro: string;
  slugs: string[];
}

export const concernCategories: ConcernCategory[] = [
  {
    key: 'eye-area',
    title: 'Eye area',
    group: 'face',
    intro: 'Hooded lids, hollows and dark circles — precise, delicate work for the area that shows tiredness first.',
    slugs: ['hooded-upper-eyelids', 'under-eye-hollows', 'dark-under-eye-circles', 'eye-bags', 'low-eyebrows'],
  },
  {
    key: 'volume-collagen',
    title: 'Volume loss & collagen depletion',
    group: 'face',
    intro: 'From gradual collagen loss to the deflation that can follow rapid weight loss — rebuilt with biostimulation, not overfilling.',
    slugs: ['collagen-depletion', 'facial-ageing-after-weight-loss', 'flat-cheeks', 'nasolabial-folds', 'shadows-around-nasolabial-folds'],
  },
  {
    key: 'jawline-contouring',
    title: 'Jawline & facial contouring',
    group: 'face',
    intro: 'Definition through the chin, jaw and lower face — contoured without surgery.',
    slugs: ['double-chin', 'jowling', 'heavy-lower-face', 'flat-pebble-chin', 'bruxism'],
  },
  {
    key: 'pigmentation-melasma',
    title: 'Pigmentation & melasma',
    group: 'face',
    intro: 'Dark spots, sun damage and melasma, treated with medical-grade peels and skin science.',
    slugs: ['hyperpigmentation-melasma'],
  },
  {
    key: 'fine-lines-wrinkles',
    title: 'Fine lines & wrinkles',
    group: 'face',
    intro: 'Softening upper-face lines, accordion lines and lip lines while keeping every expression your own.',
    slugs: ['upper-face-wrinkles', 'accordion-lines', 'barcode-lines-around-lips'],
  },
  {
    key: 'acne-scarring',
    title: 'Acne & acne scarring',
    group: 'face',
    intro: 'Active breakouts, scarring and the pigmentation they leave behind.',
    slugs: ['acne-acne-scarring', 'post-inflammatory-pigmentation'],
  },
  {
    key: 'redness-sensitive',
    title: 'Redness & sensitive skin',
    group: 'face',
    intro: 'Calming rosacea and reactive, easily flushed skin with a gentle, medically guided plan.',
    slugs: ['rosacea', 'sensitive-skin'],
  },
  {
    key: 'weight-loss-skin',
    title: 'Loose skin after rapid weight loss',
    group: 'body',
    intro: 'GLP-1 and rapid weight loss can leave skin behind — we tighten and rebuild it non-surgically.',
    slugs: ['loose-skin-knees', 'loose-abdominal-skin', 'sagging-skin-skin-laxity'],
  },
  {
    key: 'prevention',
    title: 'Prevention & skin awareness',
    group: 'prevention',
    intro:
      'A growing group of patients comes to us before a concern takes hold — driven by greater skin awareness, social media and high-definition cameras. Preventative, low-intervention treatments protect skin quality early.',
    slugs: ['early-signs-of-ageing'],
  },
];

/* Near-duplicate records in the source data, soft-retired from the index
   (their pages stay live so no URLs break). */
const hiddenDupes = new Set(['double-chin-jawline-fat', 'cellulite-thighs-buttocks-abdomen']);

export interface ResolvedConcernCategory extends ConcernCategory {
  items: Condition[];
}

export const concernTaxonomy = () => {
  const bySlug = new Map(_conditions.map((c) => [c.slug, c]));
  const resolve = (cat: ConcernCategory): ResolvedConcernCategory => ({
    ...cat,
    items: cat.slugs.map((s) => bySlug.get(s)).filter(Boolean) as Condition[],
  });
  const placed = new Set(concernCategories.flatMap((c) => c.slugs));
  return {
    face: concernCategories.filter((c) => c.group === 'face').map(resolve),
    body: concernCategories.filter((c) => c.group === 'body').map(resolve),
    prevention: resolve(concernCategories.find((c) => c.group === 'prevention')!),
    more: _conditions.filter((c) => !placed.has(c.slug) && !hiddenDupes.has(c.slug)),
  };
};

/* Concerns related to a given one — same concern category first, topped up
   from the same face/body group. */
export const relatedConcerns = (c: Condition, n = 4) => {
  const bySlug = new Map(_conditions.map((x) => [x.slug, x]));
  const cat = concernCategories.find((k) => k.slugs.includes(c.slug));
  const inCat = (cat?.slugs ?? [])
    .filter((s) => s !== c.slug)
    .map((s) => bySlug.get(s))
    .filter(Boolean) as Condition[];
  const fill = _conditions.filter(
    (x) => x.group === c.group && x.slug !== c.slug && !inCat.includes(x) && !hiddenDupes.has(x.slug),
  );
  return [...inCat, ...fill].slice(0, n);
};

/* Treatments suggested as "related" for a given treatment (same category). */
export const relatedTreatments = (t: Treatment, n = 4) =>
  _treatments.filter((x) => x.category === t.category && x.slug !== t.slug).slice(0, n);

/* Conditions that list a given treatment — the treatment→condition back-links. */
export const conditionsForTreatment = (t: Treatment) =>
  _conditions.filter((c) => c.treatments.some((x) => x.slug === t.slug));

/* ── Before/after gallery (real photos, downloaded locally by index) ── */
export interface GalleryCase {
  id: string;
  title: string;
  description: string;
  projectType: string;
  before: string;
  after: string;
  serviceName: string | null;
}
const _gallery: GalleryCase[] = (galleryRaw.galleryItems as any[])
  .filter((g) => g.is_active !== false)
  .map((g, i) => ({
    id: g.id,
    title: g.title ?? '',
    description: tidy(g.description),
    projectType: g.project_type ?? '',
    before: `/assets/photos/case${i}-before.webp`,
    after: `/assets/photos/case${i}-after.webp`,
    serviceName: g.service?.name ?? null,
  }));
export const getGallery = () => _gallery;

/* Before/after imagery may only appear on pages whose treatment/concern the
   photographed case actually demonstrates — anything else misrepresents a
   clinical result. Keyed by the gallery item's stable id so a data re-sync
   can't silently shift which photos land on which page. */
const galleryCaseBySlug: Record<string, string> = {
  // Case: 5-point lifting protocol — mid-face support, under-eye hollowing, facial descent.
  '5-point-facelift': '3fae6618-0fd6-4db6-86ac-07052e8d0e56',
  'dark-under-eye-circles': '3fae6618-0fd6-4db6-86ac-07052e8d0e56',
  'under-eye-hollows': '3fae6618-0fd6-4db6-86ac-07052e8d0e56',
  'flat-cheeks': '3fae6618-0fd6-4db6-86ac-07052e8d0e56',
  // Case: upper-face anti-wrinkle treatment — softened forehead dynamic lines.
  'anti-wrinkle-injections': 'e2a1ad28-7b46-4e74-9a9c-1b7357e2d4de',
  'forehead-lines': 'e2a1ad28-7b46-4e74-9a9c-1b7357e2d4de',
  'upper-face-wrinkles': 'e2a1ad28-7b46-4e74-9a9c-1b7357e2d4de',
  // Case: natural lip enhancement — central volume, definition, hydration.
  'lip-hydration': '1868f522-2fb1-444a-83d4-8a0d03e6feb5',
  'lip-enhancement': '1868f522-2fb1-444a-83d4-8a0d03e6feb5',
  'lip-fillers': '1868f522-2fb1-444a-83d4-8a0d03e6feb5',
};
export const galleryCaseFor = (slug: string): GalleryCase | null => {
  const id = galleryCaseBySlug[slug];
  return (id && _gallery.find((g) => g.id === id)) || null;
};

/* ── Customer reviews (approved only) ──────────────────────────────── */
export interface Review {
  name: string;
  rating: number;
  title: string;
  comment: string;
}
/* The live feed's moderation lets link-spam through (e.g. SEO outreach messages
   approved as "reviews") — anything containing a URL is not a client review. */
const looksLikeSpam = (r: any) => /https?:\/\/|www\./i.test(`${r.comment ?? ''} ${r.customer_name ?? ''}`);
const _reviews: Review[] = (reviewsRaw.reviews as any[])
  .filter((r) => r.is_approved !== false && !looksLikeSpam(r))
  .map((r) => ({
    name: r.customer_name ?? 'Verified client',
    rating: r.rating ?? 5,
    title: tidy(r.title),
    comment: tidy(r.comment),
  }));
export const getReviews = () => _reviews;

export const reviewStats = () => {
  const count = _reviews.length;
  const average = count ? Math.round((_reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0;
  return { count, average };
};
