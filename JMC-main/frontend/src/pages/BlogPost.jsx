import { useParams, Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import usePageMeta from '../hooks/usePageMeta';
import { blogPosts, formatPostDate, localizePost } from '../data/blogPosts';
import { findPracticeArea } from '../data/practiceAreas';
import { site } from '../data/site';
import { useLang } from '../context/LanguageContext';
import { fade } from '../lib/motion';
import { renderInstagramCard } from '../lib/instagramCard';
import { LabelBar } from '../components/LabelBar';
import { LangToggle } from '../components/LangToggle';
import { ConsultationBox } from '../components/ConsultationBox';
import { CtaBand } from '../components/CtaBand';
import { SectionTitle } from '../components/SectionTitle';
import { ArticleRow } from '../components/ArticleRow';

const UI = {
  en: {
    by: 'By',
    share: 'Share',
    copy: 'Copy link',
    copied: 'Link copied',
    instagram: 'Download Instagram card',
    generating: 'Generating…',
    note: 'Note:',
    disclaimer: 'This article is for information only and is not legal advice. For your specific case, contact us at',
    consult: 'Book a consultation',
    relatedAreas: 'Related areas',
    ctaTitle: 'Need legal advice on this topic?',
    allArticles: 'All articles',
    relatedTitle: 'Related articles',
    notFound: 'Article not found',
    notFoundBody: 'This article does not exist or has been removed.',
    back: 'back to insights',
  },
  sq: {
    by: 'Nga',
    share: 'Ndaj',
    copy: 'Kopjo linkun',
    copied: 'Linku u kopjua',
    instagram: 'Shkarko kartën për Instagram',
    generating: 'Duke gjeneruar…',
    note: 'Shënim:',
    disclaimer: 'Ky artikull është informues dhe nuk përbën këshillë juridike. Për rastin tuaj konkret, na kontaktoni në',
    consult: 'Planifikoni një konsultim',
    relatedAreas: 'Fusha të lidhura',
    ctaTitle: 'Keni nevojë për këshillë juridike për këtë temë?',
    allArticles: 'Të gjithë artikujt',
    relatedTitle: 'Artikuj të ngjashëm',
    notFound: 'Artikulli nuk u gjet',
    notFoundBody: 'Ky artikull nuk ekziston ose është hequr.',
    back: 'kthehu te analizat',
  },
};

const mdComponents = {
  h2: ({ children }) => (
    <h2 className="mb-5 mt-12 font-serif text-[28px] leading-tight text-ink md:text-[32px]">{children}</h2>
  ),
  p: ({ children }) => (
    <p className="mb-7 font-serif text-[19px] leading-[1.7] text-ink md:text-[22px]">{children}</p>
  ),
  strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
  ul: ({ children }) => (
    <ul className="mb-7 list-disc space-y-2 pl-6 font-serif text-[19px] leading-[1.7] text-ink md:text-[22px]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-7 list-decimal space-y-2 pl-6 font-serif text-[19px] leading-[1.7] text-ink md:text-[22px]">{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  a: ({ href, children }) => (
    <a href={href} className="link-line" {...(/^https?:/.test(href || '') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  ),
};

const quoteComponents = {
  p: ({ children }) => (
    <p className="font-serif text-[22px] italic leading-[1.45] text-ink md:text-[26px]">{children}</p>
  ),
};

// ─── ShareRow ─────────────────────────────────────────────────────────────────

// card: { title, excerpt, category, meta, image } for the Instagram card; fileName for the download.
const ShareRow = ({ card, fileName, ui }) => {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const url = window.location.href;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const handleInstagram = useCallback(async () => {
    setGenerating(true);
    try {
      const canvas = await renderInstagramCard(card);
      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setGenerating(false);
    }
  }, [card, fileName]);

  const linkClass = 'link-line text-[13px] text-ink disabled:opacity-60';

  return (
    <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-t border-b-line border-t-ink py-5">
      <span className="label-caps text-[11px] text-ink">{ui.share}</span>
      <button type="button" onClick={handleCopy} className={linkClass}>
        {copied ? ui.copied : ui.copy}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        LinkedIn
      </a>
      <button type="button" onClick={handleInstagram} disabled={generating} className={linkClass}>
        {generating ? ui.generating : ui.instagram}
      </button>
      <span role="status" className="sr-only">
        {copied ? ui.copied : ''}
      </span>
    </div>
  );
};

// ─── BlogPost ─────────────────────────────────────────────────────────────────

const BlogPost = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const ui = UI[lang] || UI.en;

  const post = blogPosts.find((p) => p.slug === slug);
  const p = post && localizePost(post, lang);

  usePageMeta(
    post
      ? {
          title: p.title + ' | JMC Legal Insights',
          description: p.excerpt,
          canonical: 'https://jmclegal.org/insights/' + post.slug,
          ogTitle: p.title,
          ogDescription: p.excerpt,
          ogUrl: 'https://jmclegal.org/insights/' + post.slug,
          ogType: 'article',
        }
      : {
          title: 'Article Not Found | JMC Legal Insights',
          description: 'This article does not exist or has been removed.',
          canonical: 'https://jmclegal.org/insights',
        }
  );

  if (!post) {
    return (
      <div>
        <LabelBar crumbs={[{ label: 'Insights', to: '/insights' }]} />
        <div className="wrap flex min-h-[50vh] flex-col items-start justify-center py-24">
          <h1 className="font-serif text-[44px] leading-tight text-ink">{ui.notFound}</h1>
          <p className="mt-4 text-[15px] text-muted">{ui.notFoundBody}</p>
          <Link to="/insights" className="link-more mt-8">
            {ui.back}
          </Link>
        </div>
      </div>
    );
  }

  // The last paragraph is set as a pull quote.
  const paragraphs = p.content.trim().split(/\n\s*\n/);
  const quote = paragraphs.length > 1 ? paragraphs.pop() : null;
  const body = paragraphs.join('\n\n');

  const relatedAreas = (post.practiceAreas || []).map(findPracticeArea).filter(Boolean);
  const related = blogPosts.filter((rp) => rp.slug !== slug && rp.category === post.category).slice(0, 2);

  return (
    <div>
      <LabelBar crumbs={[{ label: 'Insights', to: '/insights' }, { label: p.category }]}>
        <LangToggle variant="block" />
      </LabelBar>

      <article lang={lang}>
        <header className="mx-auto max-w-[760px] px-6 pt-20 md:pt-24">
          <div className="label-caps flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-ink pb-3">
            <span className="text-accent">{p.category}</span>
            <span className="text-muted">
              <time dateTime={post.date}>{formatPostDate(post.date, lang)}</time> · {p.readTime}
            </span>
          </div>
          <motion.h1 key={lang} {...fade} className="mt-10 font-serif text-[36px] leading-[1.12] text-ink md:text-[52px]">
            {p.title}
          </motion.h1>
          <p className="mt-6 text-[13px] text-muted">
            {ui.by} {p.author}
          </p>
        </header>

        <div className="wrap mt-14">
          <img
            src={post.image}
            alt={p.imageAlt || ''}
            className="img-treat aspect-[16/9] w-full object-cover md:aspect-[59/20]"
          />
        </div>

        <div className="wrap grid gap-16 pb-24 pt-14 md:pt-16 lg:grid-cols-[minmax(0,700px)_280px] lg:justify-center lg:gap-[72px]">
          <div className="min-w-0">
            <motion.div key={`${lang}-body`} {...fade}>
              <ReactMarkdown components={mdComponents}>{body}</ReactMarkdown>
              {quote && (
                <blockquote className="my-12 border-l-2 border-accent pl-6 md:pl-8">
                  <ReactMarkdown components={quoteComponents}>{quote}</ReactMarkdown>
                </blockquote>
              )}
            </motion.div>

            <ShareRow
              card={{
                title: p.title,
                excerpt: p.excerpt,
                category: p.category,
                meta: `${formatPostDate(post.date, lang)} · ${p.readTime}`,
                image: post.image,
              }}
              fileName={`jmc-legal-${post.slug}-${lang}.png`}
              ui={ui}
            />

            <p className="mt-6 text-[12px] leading-relaxed text-subtle">
              <strong className="font-medium text-text">{ui.note}</strong> {ui.disclaimer}{' '}
              <a href={`mailto:${site.email}`} className="link-line">
                {site.email}
              </a>
              .
            </p>
          </div>

          <aside className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
            <ConsultationBox label={ui.consult} />
            {relatedAreas.length > 0 && (
              <div className="bg-paper p-6 md:p-8">
                <h2 className="label-caps text-ink">{ui.relatedAreas}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {relatedAreas.map((area) => (
                    <li key={area.slug}>
                      <Link to={`/practice-areas#${area.slug}`} className="link-line text-[14px] text-ink">
                        {lang === 'sq' ? area.titleSq : area.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </article>

      <CtaBand
        title={ui.ctaTitle}
        actions={[
          { to: '/contact', label: ui.consult },
          { to: '/insights', label: ui.allArticles, outline: true },
        ]}
      />

      {related.length > 0 && (
        <section className="wrap py-24">
          <SectionTitle>{ui.relatedTitle}</SectionTitle>
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {related.map((rp, i) => (
              <ArticleRow key={rp.slug} post={rp} index={i + 1} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
