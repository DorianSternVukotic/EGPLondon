# Production-readiness review — 2026-07-15 (pre-Galina-presentation)

## STATUS UPDATE (same evening — quick-wins round done)

Fixed and verified (build 100 pages clean; 360px scrollWidth = 360 on all key pages):
all of section B (mobile overflow, accessible mobile menu, ?treatment= client-side
prefill, /thank-you noindex + sitemap filter, price sync via live-price override in
data.ts, stale byline removed, gallery deduped + consent line reworded, 404 page,
favicon 1.6KB + apple-touch-icon, stock-photo captions neutralised); reviews.json
re-synced from live API (15 → 14 rendered; bestldn link-spam filtered in data.ts;
stock avatars → initials; review/aggregateRating JSON-LD stripped, hours + intl
phone added to schema); before/after photos now appear ONLY on the 10 pages whose
case matches (galleryCaseFor() map in data.ts, keyed by gallery item id) — all other
pages show no before/after; free-consultation emphasised site-wide (header
announcement bar, hero/CtaBand/condition CTAs prefill "Free Discovery Consultation",
treatment-page hero + sidebar links, /book aside panel); scripts/sync-data.mjs
restored (services/conditions/reviews/gallery from live API); site.ts reads
PUBLIC_WEB3FORMS_KEY from .env; geo coords exact.

Still open: A1 key itself (2-min user task), A2 skinspirit imagery, A5 doctor-vs-NP
wording, A6 legal pages, A7 redirects at cutover, sections C/E.

## STATUS UPDATE 2 (SEO + AI-discovery pass — section D closed)

D2 canonicals now trailing-slash (Base.astro normalizes; matches sitemap exactly);
D4 invalid MedicalProcedure.provider dropped — link now runs clinic→procedure via
MedicalClinic.availableService ↔ #procedure @id (schema.ts absUrl helper keeps all
JSON-LD URLs in canonical form); D5 duplicate concern pages
(cellulite-thighs-buttocks-abdomen, double-chin-jawline-fat) still build but
canonicalize to their curated twins and are excluded from the sitemap; D6 FAQPage
schema deliberately KEPT (no Google rich-result upside but AI crawlers consume it,
and the price/downtime answers are per-treatment, not pure duplicates); D7 og:image
width/height/alt + theme-color (#282d26) added; D8 fonts self-hosted via
@fontsource-variable (Newsreader opsz+italic, Hanken Grotesk, Spline Sans Mono) —
Google Fonts links removed (render-blocking + UK GDPR), rendering verified
identical by screenshot. Clinic schema upgraded MedicalBusiness → MedicalClinic
(+hasMap, currenciesAccepted GBP); WebSite node on homepage.

AI discovery: robots.txt now explicitly welcomes AI crawlers (GPTBot, OAI-SearchBot,
ChatGPT-User, ClaudeBot, Claude-User/SearchBot, PerplexityBot/User, Google-Extended,
Applebot-Extended, meta-externalagent, DuckAssistBot) and points to /llms.txt —
a build-generated machine-readable clinic summary (src/pages/llms.txt.ts: NAP,
hours, free-consult policy, full treatment menu with live prices grouped by
category, concerns list; ~18KB, regenerates from live data on every build/sync).

Full-site audit (5 parallel review passes: content/data, SEO/schema, booking flow,
accessibility, live-site parity + build check). Cartoons excluded (regeneration in
progress). Build status: `astro build` clean, 99 pages, sitemap OK, no broken
internal links, no placeholder text in output, all past contrast fixes hold.

---

## A. LAUNCH BLOCKERS

1. **Booking form is dead — placeholder Web3Forms key.**
   `src/lib/site.ts:26` = `'YOUR-WEB3FORMS-ACCESS-KEY'`. Every submission on /book,
   /find-us and all 54 treatment pages lands on a Web3Forms error page; the enquiry
   is lost. A live demo of "Request appointment" fails on stage. *Needs: user creates
   a free key at web3forms.com for info@egpaesthetics.co.uk (2 min).*

2. **Competitor-scraped imagery ships to production.**
   `src/lib/treatmentMedia.ts:1-3` admits category photos are "DEMO MEDIA ONLY —
   pulled from skinspirit.com". Referenced 59 times: homepage featured blocks,
   /treatments index, and the hero of **all 54 treatment pages**. Copyright
   infringement using a competitor's photos. *Needs: licensed/own photos, or interim
   swap to the Sol cartoons/own stock until real clinic photography exists.*

3. **Fabricated reviews published as fact + structured data.**
   `src/data/reviews.json`: all 18 entries have fake `*@email.com` addresses and
   identical-to-the-microsecond timestamps (seeded batch — probably by the previous
   developer; it mirrors the live API). They drive: visible testimonials on all ~93
   pages, JSON-LD `aggregateRating` 4.8/18 + 5 named Review objects on every page
   (Google manual-action risk; Google ignores self-serving LocalBusiness reviews
   anyway), the homepage "Rating 5.0 ★" credential (contradicting the 4.8 in schema
   on the same page), and stock avatar faces (`assets/avatars/face*.jpg`) presented
   as the named reviewers. *Needs: ask Galina which reviews are genuine; strip the
   review JSON-LD block regardless; drop avatars (initials instead); reconcile
   5.0 vs 4.8. Note: live site deleted 4 of these 18 since the June sync.*

4. **False "typical result" claims on before/after photos.**
   `src/components/BeforeAfterFigure.astro` picks a random-by-slug case pair, and
   `treatments/[slug].astro:116-118` captions it "A typical result following a
   course of {treatment} at EGP Aesthetics" — so fat-freezing pages can show a lip
   case as their "typical result". Same on condition pages ("Results you can
   expect"). ASA/CAP risk for a clinic. *Needs: honest copy ("Illustrative example
   of results from our clinic") or real per-treatment cases; also verify the "with
   written client consent · Unretouched" claim in BeforeAfter.astro:34.*

5. **"Doctor-led / both medical doctors" claim is likely wrong.**
   Rebuild says doctors everywhere (site.ts, index, about, titles). Live site says
   "medical aesthetic practitioners" and its `/api/team` lists Galina and Eli as
   **Nurse Practitioner**. If not GMC-registered doctors this is a regulatory/ASA
   problem — and Galina will spot it tomorrow. *Needs: verify credentials + NMC/GMC
   numbers with Galina; reword to "nurse-led" / "medically led" if needed.*

6. **No privacy / terms / GDPR pages, no consent language.**
   Live site has /terms, /privacy, /gdpr and footer links; rebuild has none, while
   the form collects name/phone/email + free-text health info. UK GDPR/ICO gap and
   the most visible side-by-side difference in the demo. Live policy text was pulled
   to scratchpad (`api-terms.json`, `api-privacy.json`, `api-gdpr.json`) and can be
   adapted (live's GDPR page itself has an unfilled "[Date]" placeholder — easy to
   beat). *Needs: 3 pages + footer links + a consent line/checkbox on the form.*

7. **No 301 redirects — ~150 live URLs would 404 at cutover.**
   Old scheme: `/services/[slug]` (95 URLs incl. 37 condition-as-service dupes + 4
   category pages), `/blog/*` (10), `/press`, `/gdpr|terms|privacy`,
   `/book-consultation`, `/book/new`, `/membership/signup`, double-hyphen
   `/conditions/*` variants, `/sitemap.xml`. No redirect config exists in the repo.
   Full old→new map: section F below. *Needs: host-level redirects at launch.*

## B. QUICK WINS (small code fixes, worth doing before the demo)

1. Homepage horizontal scroll at 360px — `shrink-0` on the figcaption in
   `src/components/BeforeAfter.astro:29` forces 385px scrollWidth. Remove/min-w-0.
2. Mobile menu unusable by keyboard/screen reader — `Header.astro:49-54` checkbox is
   `hidden` (out of a11y tree), label not focusable, no aria-expanded. Make the
   checkbox `sr-only` + focus styles, or a 10-line JS toggle.
3. `?treatment=` prefill silently dead — `book.astro:6` reads searchParams at build
   time on a static build; every "Book this treatment" CTA loses its context. Tiny
   client-side script reading `location.search`.
4. `/thank-you` indexable + in sitemap — add noindex prop in Base.astro + sitemap
   filter in astro.config.mjs.
5. Stale-price contradictions on condition pages (15 instances) — `conditions.json`
   is out of sync with `services.json` (e.g. Injectable Mesotherapy £170 vs £200,
   Cheek & Mid-Face Filler £390 vs £450, "Masseter £250" vs Jaw Slimming £279).
   Re-sync. Note `npm run sync:data` references `scripts/sync-data.mjs` which
   **does not exist** — restore the script or drop it; services.json/reviews.json
   haven't been re-synced since 2026-06-23.
6. Hardcoded "Reviewed by the EGP medical team · Last updated June 2026" on every
   treatment + condition page — already stale; wire to a real date or remove.
7. Homepage gallery: items 2+3 in `gallery.json` are both "Natural Lip Enhancement"
   with identical descriptions and both featured → two identical-looking cards side
   by side; items 0+4 also duplicate. Add live's consent disclaimer line ("Results
   may vary. All photos published with patient consent.").
8. Missing 404 page — add `src/pages/404.astro`.
9. Favicon is a 4619×4619 / 250 KB PNG fetched on every page — ship 32px +
   180px apple-touch-icon (currently missing).
10. Stock interiors captioned "at EGP Aesthetics" (`ClinicLocation.astro:14`,
    `TreatmentShowcase.astro:44`) — soften alt/captions until real photos exist.

## C. CONTENT ISSUES TO VERIFY WITH GALINA (bring to the meeting)

1. Transport/parking on /find-us: live site confirms The Chase/Victoria Rise parking
   and Clapham Common/buses 87-88 (rebuild matches live), but for 809 Wandsworth Rd
   the Wandsworth Road Overground station (~2 min) is missing on both. Verify walk
   times with her.
2. Duplicate treatments at different prices in the menu (from her own Fresha data):
   Microneedling £220 vs Microneedling Facial £170; Lip Fillers £350 vs Lip
   Enhancement £290; Dermal Fillers Cheeks £390 vs Cheek & Mid-Face Filler £450;
   Chemical Peel vs Medical Peels (both £200); CoolSculpting £800 vs Fat Freezing
   £200. First demo question will be "why twice at two prices?"
3. Thin clinical content: benefits empty on 53/54 treatments, prep/aftercare on
   54/54, "what to expect" on 32/54 — pages render fine but reduce to a sentence +
   FAQ. Needs her input (or drafted copy for her sign-off).
4. Condition pages recommend non-bookable treatments: "Combined Treatment from £350"
   (16 pages), "IPL Therapy £250" (rosacea/pigmentation — IPL isn't offered),
   "Skincare Routine £100".
5. Live-site content not carried over — decide keep/drop: blog (10 posts, 2 recent
   client-authored exosome articles), 10 real homepage FAQs (incl. "Snatch Jawline"
   brand name), newsletter + 10%-off incentive, announcement bar, welcome popup,
   review-submission form, membership page (orphan/broken on live — probably drop),
   "Award-Winning Clinic / 1000+ treatments / 100% Satisfaction" hero claims
   (rebuild dropped deliberately — she may ask).
6. Facebook handle `beautyqueenlondon2019` — confirm it's really the clinic page.
7. Cancellation policy (24h on live terms), deposit policy, 18+ statement,
   complaints procedure, insurance/registration numbers — neither site has most of
   these; a differentiator if added.
8. Auto-generated FAQ claims every condition is caused by "ageing, genetics,
   lifestyle and sun exposure" — nonsense for bruxism/gummy smile/water retention.
   Replace with real FAQs (live's 10 are in scratchpad `api-faq.json`).

## D. SEO / SCHEMA TIDY-UP (before launch, not user-visible)

1. Strip review/aggregateRating JSON-LD (see A3).
2. Canonical vs sitemap trailing-slash mismatch on all 99 pages — align
   `trailingSlash`/`build.format` or canonicals.
3. Add `openingHoursSpecification` (data already in site.ts); JSON-LD phone →
   `+447944242079`; exact geo coords (current ones flagged "approx", ~500m off).
4. `provider` is not a valid MedicalProcedure property (`schema.ts:39`) — rework or
   drop.
5. Near-duplicate condition pages both built (cellulite vs
   cellulite-thighs-buttocks-abdomen, double-chin variants) — consolidate/canonical.
6. FAQPage schema on ~90 pages is templated duplicate text with no rich-result
   upside since 2023 — consider dropping the schema (keep visible FAQ).
7. `metaDesc.slice(0,160)` truncates mid-word on condition pages; og:locale,
   og:image dimensions, theme-color missing (minor).
8. Consider self-hosting Google Fonts (render-blocking third party + UK privacy).

## E. CUTOVER CHECKLIST (launch day)

1. Pick host (Netlify/Vercel/Cloudflare Pages — static output, no adapter needed).
   No CI/workflows exist yet; add build-on-push.
2. Implement redirect map (section F) in host config; redirect `/sitemap.xml` →
   `/sitemap-index.xml`.
3. Set the real Web3Forms key; test a submission end-to-end (note: form redirect
   is hardcoded to production domain — fine after cutover, confusing before).
4. DNS switch; resubmit sitemap in Search Console; verify GSC property.
5. Decide analytics (none currently = no cookie banner needed; adding GA/GTM
   requires a consent banner like the live site has).
6. Re-sync services/reviews/gallery data from live API just before launch
   (restore `scripts/sync-data.mjs` first).
7. Delete dead weight before deploy: `public/assets/jowlcartoon.png` (1.1MB),
   `wrinklecartoon.png` (948K), `therapyexample.jpg`, `photos/team.webp`,
   `demo/cartoon-*.svg`, unused `demo/cat-skin.jpg`/`cat-wellness.jpg`,
   root `booking.yml` (competitor-site Playwright snapshot), unused
   `src/data/social-links.json`, dead `noHeaderOffset` prop in Base.astro.
8. Wire new cartoons when Sol delivers (slug→file map, cat-*.webp,
   medallionFocus, Sculptra regex — per assets-src/cartoon-generation-brief.md).

## F. REDIRECT MAP (old → new, 301s)

Blanket:
- `/services/:slug` → `/treatments/:slug` (54 exact-slug matches)
- `/services`, `/services/face|body|fillers|anti-wrinkle` → `/treatments`
- `/blog` → `/` (or build blog); posts → nearest treatment page
  (baby-botox×2 → /treatments/baby-botox; profhilo → /treatments/profhilo;
  exosome×2 → /treatments/exosomes-face; dermal-filler×2 →
  /treatments/dermal-fillers-cheeks; body-contouring →
  /treatments/fat-freezing-abolten; skincare-routine, preparing-first-treatment →
  /about)
- `/press` → `/about`; `/book-consultation`, `/book/new` → `/book`;
  `/membership/signup` → `/`
- `/gdpr`, `/privacy`, `/terms` → new legal pages
- `/sitemap.xml` → `/sitemap-index.xml`

Condition-as-service URLs → `/conditions/*` (20 exact-slug + renames):
- `/services/bruxism-condition` → `/conditions/bruxism`
- `/services/gummy-smile-condition` → `/conditions/gummy-smile`
- `/services/shadows-nasolabial-folds` → `/conditions/shadows-around-nasolabial-folds`
- `/services/melasma-treatment`, `/services/hyperpigmentation-treatment` →
  `/conditions/hyperpigmentation-melasma`
- `/services/sagging-skin-laxity` → `/conditions/sagging-skin-skin-laxity`
- `/services/acne-scar-treatment`, `/services/active-acne-treatment` →
  `/conditions/acne-acne-scarring`

Renamed treatments:
- `/services/forehead-lines-treatment` → `/treatments/forehead-lines`
- `/services/frown-lines-treatment` → `/treatments/glabella-lines`
- `/services/crows-feet-treatment` → `/treatments/eye-wrinkles`
- `/services/under-eye-hollow-treatment` → `/treatments/3-step-under-eye-signature-treatment`
- `/services/skin-tightening-treatment` → `/treatments/rf-ultrasound-tightening`
- `/services/stubborn-fat-treatment` → `/treatments/fat-freezing-abolten`
- `/services/cheek-volume-restoration` → `/treatments/dermal-fillers-cheeks`
- `/services/female-hair-loss-treatment`, `/services/male-pattern-baldness-treatment`
  → `/treatments/prp-hair-treatment`

Condition slug variants (double-hyphen live URLs → collapsed):
- `/conditions/arm-fat--bingo-wings`, `/conditions/love-handles--flanks`,
  `/conditions/sagging-skin--skin-laxity`, `/conditions/thigh-fat--inner-thigh-laxity`,
  `/conditions/double-chin--jawline-fat`, `/conditions/stubborn-belly-fat--abdominal-fat`,
  `/conditions/water-retention--bloating--swelling` → same slug, single hyphens
- `/conditions/stubborn-belly-fat` → `/conditions/stubborn-belly-fat-abdominal-fat`
- `/conditions/love-handles` → `/conditions/love-handles-flanks`
- `/conditions/sagging-skin` → `/conditions/sagging-skin-skin-laxity`

## G. Verified clean (no action)

Build (99 pages, zero errors); robots.txt + sitemap generation; NAP consistency
(SW8 everywhere, zero SW16 in repo — live site footer also shows SW8 now); phone
`tel:` links single-sourced and E.164-correct; WhatsApp number matches; hours
consistent across 3 renderings and match live API (incl. 2026-07-03 update); all
internal links resolve; all assets return 200; unique titles/descriptions on all 9
templates; one h1 per page; all imgs have alt; contrast AA across ~20 combos (past
fixes hold); prefers-reduced-motion + focus-visible + labelled inputs + honeypot
correct; Google Maps embeds keyless and pointing at SW8; prices identical to live;
54/54 treatments and conditions in sync; no console errors; zero runtime JS.

Note on ASA/MHRA: both old and new site advertise botulinum toxin ("Botox",
anti-wrinkle injections) with public prices — POM advertising to the public
technically breaches ASA/MHRA rules. Industry-common, but flag to Galina once.
