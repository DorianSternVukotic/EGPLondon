/**
 * Re-sync the local data snapshots from the live site's public API.
 * Usage: npm run sync:data
 *
 * services/conditions/reviews are raw mirrors (rendering-side filters live in
 * src/lib/data.ts). Gallery photos are stored locally by index
 * (public/assets/photos/caseN-{before,after}.webp), so if the gallery items
 * change the script warns you to re-download and re-check the photo mapping.
 */
import { writeFile, readFile } from 'node:fs/promises';

const BASE = 'https://www.egpaesthetics.co.uk/api';
const targets = [
  { endpoint: 'services', file: 'src/data/services.json' },
  { endpoint: 'conditions', file: 'src/data/conditions.json' },
  { endpoint: 'reviews', file: 'src/data/reviews.json' },
  { endpoint: 'gallery', file: 'src/data/gallery.json' },
];

for (const { endpoint, file } of targets) {
  const res = await fetch(`${BASE}/${endpoint}`);
  if (!res.ok) {
    console.error(`✗ ${endpoint}: HTTP ${res.status} — kept existing ${file}`);
    continue;
  }
  const fresh = await res.json();

  if (endpoint === 'gallery') {
    const oldIds = JSON.parse(await readFile(file, 'utf8')).galleryItems.map((g) => g.id);
    const newIds = fresh.galleryItems.map((g) => g.id);
    if (JSON.stringify(oldIds) !== JSON.stringify(newIds)) {
      console.warn(
        '⚠ gallery items changed — local caseN-*.webp photos map by index.\n' +
          '  Re-download the before/after images and re-check galleryCaseFor() in src/lib/data.ts.',
      );
    }
  }

  await writeFile(file, JSON.stringify(fresh, null, 2) + '\n');
  const count = Object.values(fresh)[0]?.length;
  console.log(`✓ ${endpoint}: ${count} records → ${file}`);
}
