/** /llms.txt — a machine-readable summary of the clinic for AI assistants
    (https://llmstxt.org). Generated at build time from the same live data as
    the pages, so prices and the treatment menu never drift from the site. */
import type { APIRoute } from 'astro';
import { getTreatments, getConditions, formatPrice } from '../lib/data';
import { absUrl } from '../lib/schema';
import { site, hours } from '../lib/site';

const oneLine = (s: string | null | undefined, max = 140) => {
  const t = (s ?? '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).replace(/\s+\S*$/, '')}…`;
};

// Leftover live-API pages canonicalized to curated twins — list only the primaries.
const SKIP_CONCERNS = new Set(['cellulite-thighs-buttocks-abdomen', 'double-chin-jawline-fat']);

export const GET: APIRoute = () => {
  const treatments = getTreatments();
  const concerns = getConditions().filter((c) => !SKIP_CONCERNS.has(c.slug));

  const byCategory = new Map<string, typeof treatments>();
  for (const t of treatments) {
    if (!byCategory.has(t.category)) byCategory.set(t.category, []);
    byCategory.get(t.category)!.push(t);
  }

  const treatmentLines = [...byCategory.entries()]
    .map(([category, list]) => {
      const rows = list.map((t) => {
        const price = t.price === 0 ? 'Free' : `from ${formatPrice(t.discountedPrice ?? t.price)}`;
        const desc = oneLine(t.description);
        return `- [${t.name}](${absUrl(`/treatments/${t.slug}`)}) — ${price}${desc ? `. ${desc}` : ''}`;
      });
      return `### ${category}\n\n${rows.join('\n')}`;
    })
    .join('\n\n');

  const concernLines = concerns
    .map((c) => `- [${c.title}](${absUrl(`/conditions/${c.slug}`)}) — ${oneLine(c.description)}`)
    .join('\n');

  const hourLines = hours.map((h) => `- ${h.day}: ${h.value}`).join('\n');

  const body = `# ${site.name} (London)

> ${site.description}

Key facts:

- Clinic: ${site.legalName}, ${site.address.street}, ${site.address.locality} ${site.address.postcode}, United Kingdom
- Phone: ${site.phone} (international: +44 7944 242079)
- Email: ${site.email}
- Website: ${site.url}
- Booking: ${absUrl('/book')} — enquiries are confirmed by the clinic team by phone or email
- The first discovery consultation is free, with no obligation to book treatment
- All prices below are "from" prices in GBP; the exact price is confirmed at consultation
- A consultation is required before any treatment; information on the site is educational and not a substitute for professional medical advice

Opening hours:

${hourLines}

## Treatments

Full menu: ${absUrl('/treatments')}

${treatmentLines}

## Concerns treated

Overview: ${absUrl('/conditions')}

${concernLines}

## About

- [About the clinic](${absUrl('/about')}) — founding story, team and approach
- [Find us](${absUrl('/find-us')}) — directions, parking and transport
- [Book an appointment](${absUrl('/book')})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
