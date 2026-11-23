import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { blogPosts, formatPostDate, localizePost, sortedPosts } from '../data/blogPosts';
import { site } from '../data/site';
import { useLang } from '../context/LanguageContext';
import { Reveal } from '../lib/motion';
import { LabelBar } from '../components/LabelBar';
import { LangToggle } from '../components/LangToggle';
import { ArticleRow } from '../components/ArticleRow';
import { ConsultationBox } from '../components/ConsultationBox';
import usePageMeta from '../hooks/usePageMeta';

const UI = {
  en: {
    metaTitle: 'Insights | JMC Legal — Legal Analysis from Kosovo',
    metaDescription: 'Legal analysis and commentary from the JMC Legal team in Kosovo on legal changes affecting businesses and individuals.',
    title: 'Analysis and commentary',
    intro: 'Short pieces from the JMC Legal team on legal change and practice in Kosovo.',
    latest: 'Latest',
    read: 'read the article',
    search: 'Search articles',
    clearSearch: 'Clear search',
    all: 'All',
    categories: 'Filter by category',
    articles: 'Articles',
    none: 'No articles match your search.',
    reset: 'show all articles',
    consult: 'Book a consultation',
    follow: 'Follow us',
    followBody: 'New articles are also published on our LinkedIn page.',
    disclaimer: 'Articles are for information only and are not legal advice for a specific case.',
  },
  sq: {
    metaTitle: 'Insights | JMC Legal — Artikuj Juridikë',
    metaDescription: 'Artikuj dhe analiza juridike nga ekipi i JMC Legal në Kosovë. Mbetuni të informuar mbi ndryshimet ligjore që ndikojnë biznesin dhe individët.',
    title: 'Analiza dhe komente',
    intro: 'Shkrime të shkurtra nga ekipi i JMC Legal mbi ndryshimet ligjore dhe praktikën në Kosovë.',
    latest: 'E fundit',
    read: 'lexo artikullin',
    search: 'Kërko në artikuj',
    clearSearch: 'Pastro kërkimin',
    all: 'Të gjitha',
    categories: 'Filtro sipas kategorisë',
    articles: 'Artikujt',
    none: 'Asnjë artikull nuk përputhet me kërkimin.',
    reset: 'shfaq të gjithë artikujt',
    consult: 'Planifikoni një konsultim',
    follow: 'Na ndiqni',
    followBody: 'Artikujt e rinj publikohen edhe në faqen tonë në LinkedIn.',
    disclaimer: 'Artikujt janë informues dhe nuk përbëjnë këshillë juridike për një rast konkret.',
  },
};

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

// Categories keyed by the Albanian name (stable across languages), labelled in the active language.
const categoryOptions = (lang) => {
  const seen = new Map();
  blogPosts.forEach((post) => {
    if (!seen.has(post.category)) seen.set(post.category, localizePost(post, lang).category);
  });
  return [...seen].map(([key, label]) => ({ key, label }));
};

const Featured = ({ post, lang, ui }) => {
  const p = localizePost(post, lang);
  return (
    <Reveal as="article" className="mt-14 grid border-t border-ink md:grid-cols-2 md:gap-12 lg:gap-16">
      <img
        src={post.image}
        alt={p.imageAlt || ''}
        className="img-treat aspect-[10/7] w-full object-cover"
      />
      <div className="flex flex-col pt-8">
        <div className="label-caps flex justify-between gap-4">
          <span className="text-accent">
            {ui.latest} · {p.category}
          </span>
          <time dateTime={post.date} className="flex-none text-muted">
            {formatPostDate(post.date, lang)}
          </time>
        </div>
        <h2 className="mt-6 font-serif text-[30px] leading-[1.15] text-ink md:text-[40px]">
          <Link to={`/insights/${post.slug}`} className="transition-colors duration-200 hover:text-accent">
            {p.title}
          </Link>
        </h2>
        <p className="mt-5 text-[15px] leading-relaxed text-muted">{p.excerpt}</p>
        <div className="mt-8 flex items-center justify-between gap-6 text-[13px]">
          <span className="text-muted">{p.readTime}</span>
          <Link to={`/insights/${post.slug}`} className="link-more">
            {ui.read}
            <span className="sr-only">: {p.title}</span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
};

const BlogPage = () => {
  const { lang } = useLang();
  const ui = UI[lang] || UI.en;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  usePageMeta({
    title: ui.metaTitle,
    description: ui.metaDescription,
    canonical: 'https://jmclegal.org/insights',
    ogTitle: ui.metaTitle,
    ogDescription: ui.metaDescription,
  });

  const posts = sortedPosts();
  const categories = categoryOptions(lang);
  const q = normalize(query.trim());

  const filtered = posts.filter((post) => {
    if (category !== 'all' && post.category !== category) return false;
    if (!q) return true;
    const p = localizePost(post, lang);
    return [p.title, p.excerpt, p.category, p.content].some((text) => normalize(text).includes(q));
  });


  return (
    <div>
      <LabelBar label="Insights">
        <LangToggle variant="block" />
      </LabelBar>

      <div className="wrap pt-20 md:pt-24">
        <Reveal>
          <h1 lang={lang} className="font-serif text-[44px] leading-[1.05] text-ink md:text-[64px]">
            {ui.title}
          </h1>
          <p className="mt-6 max-w-[600px] font-serif text-[20px] leading-[1.5] text-ink md:text-[22px]">{ui.intro}</p>
        </Reveal>
        {posts[0] && <Featured post={posts[0]} lang={lang} ui={ui} />}
      </div>

      <div className="wrap grid gap-16 pb-28 pt-16 md:pt-20 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px] xl:gap-[72px]">
        <section aria-label={ui.articles}>
          <Reveal>
            <label htmlFor="article-search" className="sr-only">
              {ui.search}
            </label>
            <div className="focus-box flex items-center border-b border-ink">
              <input
                id="article-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={ui.search}
                autoComplete="off"
                className="h-14 w-full min-w-0 bg-transparent font-serif text-[20px] text-ink placeholder:text-subtle md:text-[22px] [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label={ui.clearSearch}
                  className="-mr-2 flex h-10 w-10 flex-none items-center justify-center text-ink transition-colors hover:text-accent"
                >
                  <X size={20} strokeWidth={1.25} aria-hidden="true" />
                </button>
              ) : (
                <Search size={20} strokeWidth={1.25} aria-hidden="true" className="flex-none text-ink" />
              )}
            </div>

            <div role="group" aria-label={ui.categories} className="mt-6 flex flex-wrap gap-1.5">
              {[{ key: 'all', label: ui.all }, ...categories].map((c) => (
                <button
                  key={c.key}
                  type="button"
                  aria-pressed={category === c.key}
                  onClick={() => setCategory(c.key)}
                  className={`border px-3 py-2 text-[13px] transition-colors duration-200 ${
                    category === c.key
                      ? 'border-ink bg-ink text-white'
                      : 'border-line-strong text-ink hover:border-ink'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div aria-live="polite" className="mt-12 flex flex-col gap-12">
            {filtered.map((post, i) => (
              <ArticleRow key={post.slug} post={post} index={i + 1} lang={lang} />
            ))}
            {filtered.length === 0 && (
              <div className="border-t border-ink pt-8">
                <p className="font-serif text-[24px] text-ink">{ui.none}</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setCategory('all');
                  }}
                  className="link-more mt-6"
                >
                  {ui.reset}
                </button>
              </div>
            )}
          </div>
        </section>

        <aside className="flex flex-col gap-8">
          <Reveal>
            <ConsultationBox label={ui.consult} />
          </Reveal>
          <Reveal delay={0.08} className="bg-paper p-6 md:p-8">
            <h2 className="label-caps text-ink">{ui.follow}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">{ui.followBody}</p>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-5 inline-block text-[14px] text-ink"
            >
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </Reveal>
          <p className="text-[12px] leading-relaxed text-subtle">{ui.disclaimer}</p>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
