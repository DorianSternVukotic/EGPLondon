/** Single source of truth for clinic NAP, hours, social + booking config. */

export const site = {
  name: 'EGP Aesthetics',
  legalName: 'EGP Aesthetics London',
  tagline: 'Regenerative aesthetics, rooted in health',
  description:
    'Premier aesthetic clinic in London offering advanced facial treatments, anti-wrinkle injections, dermal fillers and body contouring. Expert practitioners, natural results.',
  url: 'https://www.egpaesthetics.co.uk',
  email: 'info@egpaesthetics.co.uk',
  phone: '07944 24 2079',
  phoneHref: 'tel:+447944242079',
  whatsappHref: 'https://wa.me/447944242079',
  address: {
    street: '809 Wandsworth Road',
    locality: 'London',
    region: 'London',
    postcode: 'SW8 3JH',
    country: 'GB',
  },
  geo: { lat: 51.4709, lng: -0.1396 }, // approx Wandsworth Rd / Clapham
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=809+Wandsworth+Road+SW8+3JH+London',
  // Booking enquiries are emailed to the clinic; staff then enter them in Fresha.
  // Replace with your real Web3Forms access key (https://web3forms.com — free, no backend).
  formEndpoint: 'https://api.web3forms.com/submit',
  formAccessKey: 'YOUR-WEB3FORMS-ACCESS-KEY',
  social: {
    instagram: 'https://www.instagram.com/egpaesthetics_london',
    facebook: 'https://www.facebook.com/beautyqueenlondon2019',
    youtube: 'https://youtube.com/@egpaesthetics',
    tiktok: 'https://www.tiktok.com/@egpaesthetics_london',
  },
} as const;

export const hours: { day: string; value: string }[] = [
  { day: 'Monday', value: '10:00 – 18:00' },
  { day: 'Tuesday', value: '10:00 – 18:00' },
  { day: 'Wednesday', value: '10:00 – 18:00' },
  { day: 'Thursday', value: '10:00 – 19:00' },
  { day: 'Friday', value: '10:00 – 16:00' },
  { day: 'Saturday', value: '09:00 – 14:00' },
  { day: 'Sunday', value: 'Closed' },
];

/** Clinical-record facts — the mono strip beneath the serif. Specific, not generic.
    Each is a (label, value) pair so it typesets as a medical-record row. */
export const credentials: { label: string; value: string }[] = [
  { label: 'Practice', value: 'Doctor-led' },
  { label: 'Method', value: 'Regenerative' },
  { label: 'Location', value: 'London SW8' },
  { label: 'Rating', value: '5.0 ★' },
];

/** Short inline trust line still used in a few places. */
export const trustBadges = ['Doctor-led', 'Fully insured', 'Regenerative medicine', '5★ rated'];
