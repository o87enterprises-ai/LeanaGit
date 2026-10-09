// Post-build step: writes one static HTML file per route into dist/ with the
// right <title>, description, canonical, Open Graph tags, JSON-LD, and a plain
// text summary inside #root, so crawlers that don't run JavaScript still read
// real content. React replaces #root's contents on load. Also writes
// sitemap.xml.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { PAGES, SITE_URL, SHARE_IMAGE, personJsonLd } from '../src/seo.js';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const template = readFileSync('dist/index.html', 'utf8');

for (const [path, page] of Object.entries(PAGES)) {
  const url = SITE_URL + path;
  const head = `
    <meta name="description" content="${esc(page.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${SHARE_IMAGE}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />`;

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${esc(page.title)}" />`)
    .replace(/\s*<meta\s+property="og:description"[\s\S]*?\/>/, `\n    <meta property="og:description" content="${esc(page.description)}" />`)
    .replace(/<meta property="og:image"[^>]*\/>/, '')
    .replace('</head>', `${head}\n    <script type="application/ld+json">${JSON.stringify(personJsonLd)}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"><main><h1>${esc(page.title)}</h1><p>${esc(page.summary)}</p></main></div>`);

  if (path === '/') {
    writeFileSync('dist/index.html', html);
  } else {
    mkdirSync(`dist${path}`, { recursive: true });
    writeFileSync(`dist${path}/index.html`, html);
  }
}

const urls = Object.keys(PAGES).filter((p) => p !== '/terms' && p !== '/privacy');
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    [...urls, '/terms', '/privacy']
      .map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`)
      .join('\n') +
    `\n</urlset>\n`,
);
console.log(`prerendered ${Object.keys(PAGES).length} pages + sitemap.xml`);
