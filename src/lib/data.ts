import servicesRaw from '../data/services.json';
import conditionsRaw from '../data/conditions.json';
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
};

const _conditions: Condition[] = (() => {
  const seen = new Set<string>();
  const treatmentByName = new Map(_treatments.map((t) => [t.name.toLowerCase(), t.slug]));
  const bySlug = new Set(_treatments.map((t) => t.slug));
  return (conditionsRaw.conditions as any[])
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
        return { label, price, slug };
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

/* ── Customer reviews (approved only) ──────────────────────────────── */
export interface Review {
  name: string;
  rating: number;
  title: string;
  comment: string;
}
const _reviews: Review[] = (reviewsRaw.reviews as any[])
  .filter((r) => r.is_approved !== false)
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
