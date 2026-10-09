// Single source of truth for per-page SEO. Used at build time by
// scripts/prerender.mjs (static HTML for crawlers that don't run JS) and at
// runtime by Layout (keeps title/description right while navigating).

export const SITE_URL = 'https://leanaforoaklandschools.com';
export const SITE_NAME = 'LeAna Powell for Oakland School Board, District 6';
export const SHARE_IMAGE = `${SITE_URL}/images/share-image.jpg`;

export const DEFAULT_SEO = {
  title: 'LeAna Powell — Mama Bear for Oakland Schools',
  description:
    'LeAna Powell is running for Oakland School Board, District 6. Oakland native, mama bear, and parent advocate. Rooted in Oakland. Fighting for kids. #MamaBearForOUSD',
};

// path -> { title, description, summary }. `summary` is plain text placed in the
// prerendered HTML so non-JS readers (search and AI crawlers) get real content.
export const PAGES = {
  '/': {
    ...DEFAULT_SEO,
    summary:
      'LeAna Powell is a proud Oakland native, mother of three, and Burckhalter Elementary PTO leader running for Oakland School Board, District 6. Her family has been in Oakland public schools for five generations. Her priorities: balancing the budget and ending financial instability, reading and math achievement, and family and community engagement.',
  },
  '/issues': {
    title: 'Priorities — LeAna Powell for Oakland School Board',
    description:
      'LeAna Powell’s priorities for Oakland Unified: a balanced, transparent budget, stronger reading and math, and real family and community engagement.',
    summary:
      'Three priorities: (1) balance the budget and end the cycle of financial instability, with transparency and local control; (2) raise reading and math outcomes; (3) engage families and the community in decisions.',
  },
  '/endorsements': {
    title: 'Endorsements — LeAna Powell for Oakland School Board',
    description:
      'Educators, parents, current and former school board members, and community leaders endorsing LeAna Powell for Oakland School Board, District 6.',
    summary:
      'Endorsers include Alameda County Supervisor Nate Miley, school board directors Patrice Berry and Mike Hutchinson, former District 6 Councilmember Loren Taylor, and many Oakland educators, parents and community leaders.',
  },
  '/volunteer': {
    title: 'Volunteer — LeAna Powell for Oakland School Board',
    description: 'Volunteer, endorse, donate, or come to an event: join the LeAna Powell campaign for Oakland School Board, District 6.',
    summary: 'Sign up to volunteer or endorse, chip in to the campaign, or come to an upcoming event.',
  },
  '/events': {
    title: 'Events — LeAna Powell for Oakland School Board',
    description: 'Upcoming and past campaign events, walks and community meetings for LeAna Powell, Oakland School Board District 6.',
    summary: 'Calendar of upcoming and past LeAna Powell campaign events, including neighborhood walks and community gatherings.',
  },
  '/achievements': {
    title: 'Articles & Achievements — LeAna Powell',
    description: 'News coverage, letters of support, and resources about LeAna Powell’s record and her run for Oakland School Board.',
    summary: 'Articles, letters of support, and education resources related to LeAna Powell and Oakland schools.',
  },
  '/text-updates': {
    title: 'Get Updates — LeAna Powell for Oakland School Board',
    description: 'Sign up for LeAna Powell campaign updates: election reminders, events, and ways to help, by email or text.',
    summary: 'Sign up by email or text for election reminders, events, and ways to help the LeAna Powell campaign.',
  },
  '/terms': {
    title: 'Terms — LeAna Powell for Oakland School Board',
    description: 'Terms for the LeAna Powell campaign website and text-message updates.',
    summary: 'Terms for the campaign website and text-message program.',
  },
  '/privacy': {
    title: 'Privacy — LeAna Powell for Oakland School Board',
    description: 'How the LeAna Powell campaign collects and uses your information.',
    summary: 'How the campaign collects and uses email and phone information.',
  },
};

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ['en', 'es'],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#leana`,
      name: 'LeAna Powell',
      url: SITE_URL,
      image: `${SITE_URL}/images/headshot.JPG`,
      description:
        'Oakland native, mother of three, and parent advocate running for Oakland School Board, District 6.',
      jobTitle: 'Candidate for Oakland School Board, District 6',
      homeLocation: { '@type': 'Place', name: 'Oakland, California' },
      sameAs: [
        'https://www.facebook.com/p/LeAna-Powell-for-Oakland-School-Board-D6-61590230594781/',
        'https://www.instagram.com/leana4oaklandschools',
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#campaign`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      email: 'leana@leanaforoaklandschools.com',
    },
  ],
};

export function seoFor(pathname) {
  const key = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return PAGES[key] || DEFAULT_SEO;
}
