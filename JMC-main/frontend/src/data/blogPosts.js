// Articles are managed in the CMS (/admin) and stored one JSON file per article in
// src/content/insights. The file name is the article's URL slug: /insights/<slug>.
const files = require.context('../content/insights', false, /\.json$/);

export const blogPosts = files.keys().map((key) => ({
  ...files(key),
  slug: key.replace(/^\.\//, '').replace(/\.json$/, ''),
}));

// ─── helpers ──────────────────────────────────────────────────────────────────

// The post with its English fields merged in when the active language is English.
// English fields left empty in the CMS fall back to the Albanian text.
export const localizePost = (post, lang) => {
  if (lang !== 'en' || !post.en?.title) return post;
  const filled = Object.fromEntries(Object.entries(post.en).filter(([, value]) => value));
  return { ...post, ...filled };
};

// Newest first.
export const sortedPosts = () => [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

// Month names are spelled out because some browsers ship without Albanian locale data
// and would fall back to English for 'sq-AL'.
const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  sq: ['janar', 'shkurt', 'mars', 'prill', 'maj', 'qershor', 'korrik', 'gusht', 'shtator', 'tetor', 'nëntor', 'dhjetor'],
};

// '2026-06-02' -> '2 June 2026' / '2 qershor 2026'
export const formatPostDate = (date, lang) => {
  const [year, month, day] = date.split('-').map(Number);
  return `${day} ${(MONTHS[lang] || MONTHS.en)[month - 1]} ${year}`;
};
