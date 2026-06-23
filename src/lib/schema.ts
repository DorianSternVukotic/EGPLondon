import { site } from './site';

export interface Crumb { name: string; href: string; }

export const breadcrumbList = (items: Crumb[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: new URL(c.href, site.url).href,
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
  name: opts.name,
  description: opts.description,
  url: new URL(opts.url, site.url).href,
  procedureType: 'https://schema.org/NoninvasiveProcedure',
  ...(opts.bodyLocation ? { bodyLocation: opts.bodyLocation } : {}),
  provider: { '@id': `${site.url}/#clinic` },
});
