// Writes public/sitemap.xml from the site's pages and the articles in src/content/insights.
// Runs automatically before `npm run build` (the "prebuild" script), so articles added in the
// CMS are listed without editing the sitemap by hand.
const fs = require('fs');
const path = require('path');

const SITE = 'https://jmclegal.org';
const INSIGHTS_DIR = path.join(__dirname, '../src/content/insights');
const OUT = path.join(__dirname, '../public/sitemap.xml');

const articles = fs
  .readdirSync(INSIGHTS_DIR)
  .filter((file) => file.endsWith('.json'))
  .map((file) => ({
    slug: file.replace(/\.json$/, ''),
    date: JSON.parse(fs.readFileSync(path.join(INSIGHTS_DIR, file), 'utf8')).date,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

const urls = [
  { loc: '/', changefreq: 'monthly', priority: '1.0' },
  { loc: '/the-firm', changefreq: 'monthly', priority: '0.8' },
  { loc: '/practice-areas', changefreq: 'monthly', priority: '0.9' },
  { loc: '/contact', changefreq: 'yearly', priority: '0.7' },
  { loc: '/insights', lastmod: articles[0]?.date, changefreq: 'weekly', priority: '0.8' },
  ...articles.map((a) => ({ loc: `/insights/${a.slug}`, lastmod: a.date, changefreq: 'yearly', priority: '0.6' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(OUT, xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
