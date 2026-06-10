import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import usePageMeta from '../hooks/usePageMeta';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, ChevronRight, Link2, Download, Check } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { useLang } from '../context/LanguageContext';
import ReactMarkdown from 'react-markdown';

const mdComponents = {
  h2: ({ children }) => (
    <h2 className="font-serif text-2xl font-semibold text-[#1A1A1A] mt-10 mb-4">{children}</h2>
  ),
  p: ({ children }) => (
    <p className="text-[#4A4A4A] leading-relaxed text-lg mb-4">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#1A1A1A]">{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 ml-4 my-3">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="text-[#4A4A4A] leading-relaxed">{children}</li>
  ),
};

const LanguageToggle = () => {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center rounded-sm border border-[#D4AF37] overflow-hidden text-xs font-semibold uppercase tracking-widest"
      aria-label="Switch language"
    >
      <span
        className={`px-3 py-1.5 transition-colors duration-200 ${
          lang === 'sq' ? 'bg-[#D4AF37] text-white' : 'bg-transparent text-[#D4AF37]'
        }`}
      >
        AL
      </span>
      <span
        className={`px-3 py-1.5 transition-colors duration-200 ${
          lang === 'en' ? 'bg-[#D4AF37] text-white' : 'bg-transparent text-[#D4AF37]'
        }`}
      >
        EN
      </span>
    </button>
  );
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY;
}

function generateInstagramCard(title, excerpt, category, url) {
  const SIZE = 1080;
  const GOLD = '#D4AF37';
  const DARK = '#1A1A1A';
  const MID  = '#2B2B2B';
  const LIGHT = '#F8F5F0';
  const PAD = 80;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = DARK;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Bottom light panel
  ctx.fillStyle = LIGHT;
  ctx.fillRect(0, SIZE * 0.62, SIZE, SIZE * 0.38);

  // Gold top bar
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, SIZE, 12);

  // Gold left accent bar (tall)
  ctx.fillStyle = GOLD;
  ctx.fillRect(PAD, 80, 6, 340);

  // Category label
  ctx.fillStyle = GOLD;
  ctx.font = 'bold 32px Georgia, serif';
  ctx.letterSpacing = '4px';
  ctx.fillText(category.toUpperCase(), PAD + 30, 130);

  // Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 64px Georgia, serif';
  const titleBottom = wrapText(ctx, title, PAD + 30, 210, SIZE - PAD * 2 - 30, 80) + 80;

  // Divider
  ctx.fillStyle = GOLD;
  ctx.fillRect(PAD, Math.min(titleBottom, SIZE * 0.58), 60, 4);

  // Excerpt (on light background)
  const excerptY = SIZE * 0.64 + 20;
  ctx.fillStyle = '#4A4A4A';
  ctx.font = '34px Georgia, serif';
  wrapText(ctx, excerpt, PAD, excerptY, SIZE - PAD * 2, 50);

  // URL / branding footer
  ctx.fillStyle = MID;
  ctx.fillRect(0, SIZE - 100, SIZE, 100);

  ctx.fillStyle = GOLD;
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.fillText('JMC LEGAL', PAD, SIZE - 52);

  ctx.fillStyle = '#9A9A9A';
  ctx.font = '24px Arial, sans-serif';
  ctx.fillText(url, PAD + 220, SIZE - 52);

  return canvas;
}

// ─── ShareButtons ─────────────────────────────────────────────────────────────

const ShareButtons = ({ title, excerpt, category, lang }) => {
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

  const handleInstagram = useCallback(() => {
    setGenerating(true);
    setTimeout(() => {
      try {
        const canvas = generateInstagramCard(title, excerpt, category, 'jmclegal.org');
        const link = document.createElement('a');
        link.download = 'jmc-legal-post.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } finally {
        setGenerating(false);
      }
    }, 50);
  }, [title, excerpt, category]);

  const copyLabel   = lang === 'en' ? (copied ? 'Copied!'      : 'Copy Link')          : (copied ? 'U kopjua!'   : 'Kopjo Linkun');
  const igLabel     = lang === 'en' ? (generating ? 'Generating…' : 'Download') : (generating ? 'Duke gjeneruar…' : 'Shkarko');

  return (
    <div className="flex flex-wrap items-center gap-3 mt-6">
      <span className="text-xs uppercase tracking-widest text-gray-400 mr-1">
        {lang === 'en' ? 'Share:' : 'Ndaj:'}
      </span>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm border text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
          copied
            ? 'bg-[#D4AF37] border-[#D4AF37] text-white'
            : 'bg-transparent border-gray-500 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37]'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
        {copyLabel}
      </button>

      {/* Instagram image download */}
      <button
        onClick={handleInstagram}
        disabled={generating}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-gray-500 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-semibold uppercase tracking-widest transition-all duration-200 disabled:opacity-60"
      >
        <Download className="w-3.5 h-3.5" />
        {igLabel}
      </button>
    </div>
  );
};

// ─── BlogPost ─────────────────────────────────────────────────────────────────

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useLang();

  const post = blogPosts.find((p) => p.slug === slug);
  const t = post && lang === 'en' && post.en ? post.en : post;

  usePageMeta(
    post
      ? {
          title: (t?.title || post.title) + ' | JMC Legal Blog',
          description: t?.excerpt || post.excerpt,
          canonical: 'https://jmclegal.org/blog/' + post.slug,
          ogTitle: t?.title || post.title,
          ogDescription: t?.excerpt || post.excerpt,
          ogUrl: 'https://jmclegal.org/blog/' + post.slug,
          ogType: 'article',
        }
      : {
          title: 'Article Not Found | JMC Legal Blog',
          description: 'This article does not exist or has been removed.',
          canonical: 'https://jmclegal.org/blog',
        }
  );

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-2">Article Not Found</h1>
        <p className="text-[#4A4A4A] mb-6">This article doesn't exist or has been removed.</p>
        <Link to="/blog" className="text-[#D4AF37] font-semibold hover:text-[#B59025] transition-colors">
          Back to Blog
        </Link>
      </div>
    );
  }

  const related = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  const ui = {
    allArticles: lang === 'en' ? 'All Articles' : 'Të Gjitha Artikujt',
    by: lang === 'en' ? 'By' : 'Nga',
    ctaTitle: lang === 'en' ? 'Need Legal Advice on This Topic?' : 'Keni Nevojë për Këshillë Juridike?',
    ctaBody: lang === 'en'
      ? 'Our attorneys are available to advise you on your specific situation.'
      : 'Avokatët tanë janë në dispozicion për t\'ju këshilluar për situatën tuaj specifike.',
    ctaButton: lang === 'en' ? 'Schedule a Consultation' : 'Planifikoni një Konsultim',
    relatedTitle: lang === 'en' ? 'Related Articles' : 'Artikuj të Ngjashëm',
    backToAll: lang === 'en' ? 'Back to All Articles' : 'Kthehu tek Të Gjithë Artikujt',
    disclaimer: lang === 'en'
      ? 'This article is for informational purposes only and does not constitute legal advice. For advice specific to your situation, please contact the firm at info@jmclegal.org'
      : 'Ky artikull është vetëm për qëllime informuese dhe nuk përbën këshillë juridike. Për këshilla specifike, kontaktoni zyrën në info@jmclegal.org',
  };

  return (
    <div>
      {/* Top gradient banner */}
      <div className="bg-gradient-to-br from-[#1A1A1A] via-[#2B2B2B] to-[#3A3A3A] pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link + Language toggle */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] text-sm uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {ui.allArticles}
            </button>
            <LanguageToggle />
          </div>

          {/* Category + date */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Tag className="w-3 h-3" />
              {t?.category || post.category}
            </span>
            <span className="text-gray-400 text-xs">
              {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-GB' : 'sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5 text-gray-400 text-xs">
              <Clock className="w-3 h-3" />
              {t?.readTime || post.readTime}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            key={lang}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
          >
            {t?.title || post.title}
          </motion.h1>

          {/* Author */}
          <p className="mt-6 text-gray-400 text-sm">{ui.by} {post.author}</p>

          {/* Share */}
          <ShareButtons
            title={t?.title || post.title}
            excerpt={t?.excerpt || post.excerpt}
            category={t?.category || post.category}
            lang={lang}
          />
        </div>
      </div>

      {/* Article body */}
      <section className="bg-[#F8F5F0] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            key={lang + '-body'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-sm shadow-sm border border-[#E5E5E5] p-8 md:p-12"
          >
            {/* Excerpt / lead */}
            <p className="text-[#4A4A4A] text-xl leading-relaxed font-medium border-l-4 border-[#D4AF37] pl-5 mb-8 italic">
              {t?.excerpt || post.excerpt}
            </p>

            {/* Content */}
            <div className="prose-jmc">
              <ReactMarkdown components={mdComponents}>
                {t?.content || post.content}
              </ReactMarkdown>
            </div>

            {/* Disclaimer */}
            <div className="mt-12 p-5 bg-[#F8F5F0] rounded-sm border border-[#E5E5E5] text-xs text-[#9A9A9A] leading-relaxed">
              <strong className="text-[#4A4A4A]">{lang === 'en' ? 'Disclaimer:' : 'Shënim:'}</strong>{' '}
              {ui.disclaimer}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 bg-[#2B2B2B] rounded-sm p-8 text-center"
          >
            <h3 className="font-serif text-2xl font-semibold text-white mb-3">
              {ui.ctaTitle}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {ui.ctaBody}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#D4AF37] text-white hover:bg-[#B59025] rounded-sm px-8 py-3 text-sm uppercase tracking-widest font-bold transition-all duration-300"
            >
              {ui.ctaButton}
            </Link>
          </motion.div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16">
              <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] mb-8">{ui.relatedTitle}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rp) => {
                  const rt = lang === 'en' && rp.en ? rp.en : rp;
                  return (
                    <Link
                      key={rp.slug}
                      to={`/blog/${rp.slug}`}
                      className="group bg-white rounded-sm border border-[#E5E5E5] p-6 hover:border-[#D4AF37]/40 hover:shadow-md transition-all duration-300"
                    >
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                        {rt.category || rp.category}
                      </span>
                      <h4 className="font-serif text-lg font-semibold text-[#1A1A1A] mt-2 mb-3 leading-snug group-hover:text-[#D4AF37] transition-colors">
                        {rt.title || rp.title}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                        {lang === 'en' ? 'Read' : 'Lexo'} <ChevronRight className="w-3 h-3" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#D4AF37] text-sm uppercase tracking-widest font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {ui.backToAll}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
