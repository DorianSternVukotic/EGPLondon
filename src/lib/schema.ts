import { site } from './site';

export interface Crumb { name: string; href: string; }

/** Absolute URL in the exact form pages are served/canonicalized (trailing slash). */
export const absUrl = (path: string) => {
  const p = path.endsWith('/') || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`;
  return new URL(p, site.url).href;
};

export const breadcrumbList = (items: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: absUrl(c.href),
  })),
});

export const faqPage = (qas: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qas.map((x) => ({
    '@type': 'Question',
    name: x.q,
    acceptedAnswer: { '@type': 'Answer', text: x.a },
  })),
});

export const medicalProcedure = (opts: {
  name: string;
  description: string;
  url: string;
  bodyLocation?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalProcedure',
  // provider isn't a valid MedicalProcedure property; the clinic↔procedure link
  // runs the other way — MedicalClinic.availableService points at this @id
  // (Base.astro's availableService prop).
  '@id': `${absUrl(opts.url)}#procedure`,
  name: opts.name,
  description: opts.description,
  url: absUrl(opts.url),
  procedureType: 'https://schema.org/NoninvasiveProcedure',
  ...(opts.bodyLocation ? { bodyLocation: opts.bodyLocation } : {}),
});
