import { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ChevronRight, Tag } from 'lucide-react';
import { Hero } from '../components/Hero';
import { blogPosts } from '../data/blogPosts';
import { useLang } from '../context/LanguageContext';

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

const BlogCard = ({ post, index }) => {
  const { lang } = useLang();
  const t = lang === 'en' && post.en ? post.en : post;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-white rounded-sm border border-[#E5E5E5] shadow-sm hover:shadow-md hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-[#D4AF37] rounded-t-sm" />

      <div className="p-6 flex flex-col flex-1">
        {/* Category + date */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Tag className="w-3 h-3" />
            {t.category || post.category}
          </span>
          <span className="text-xs text-[#9A9A9A]">
            {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-GB' : 'sq-AL', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#D4AF37] transition-colors duration-200">
          {t.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[#4A4A4A] text-sm leading-relaxed flex-1 mb-5">
          {t.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0]">
          <span className="flex items-center gap-1.5 text-xs text-[#9A9A9A]">
            <Clock className="w-3.5 h-3.5" />
            {t.readTime || post.readTime}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] hover:text-[#B59025] transition-colors"
          >
            {lang === 'en' ? 'Read Article' : 'Lexo Artikullin'}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

const ALL_SQ = 'Të gjitha';
const ALL_EN = 'All';

const BlogPage = () => {
  const { lang } = useLang();
  const ALL = lang === 'en' ? ALL_EN : ALL_SQ;

  const categories = [ALL, ...Array.from(new Set(
    blogPosts.map((p) => lang === 'en' && p.en ? (p.en.category || p.category) : p.category)
  ))];

  const [activeCategory, setActiveCategory] = useState(ALL_SQ);

  // Reset to ALL when language switches
  const effectiveActive = categories.includes(activeCategory) ? activeCategory : ALL;

  usePageMeta({
    title: 'Blog | JMC Legal — Artikuj Juridikë',
    description: 'Artikuj dhe analiza juridike nga ekipi i JMC Legal në Kosovë. Mbetuni të informuar mbi ndryshimet ligjore që ndikojnë biznesin dhe individët.',
    canonical: 'https://jmclegal.org/blog',
    ogTitle: 'Blog | JMC Legal',
    ogDescription: 'Artikuj dhe analiza juridike nga ekipi i JMC Legal në Kosovë.',
  });

  const filtered =
    effectiveActive === ALL
      ? blogPosts
      : blogPosts.filter((p) => {
          const cat = lang === 'en' && p.en ? (p.en.category || p.category) : p.category;
          return cat === effectiveActive;
        });

  const ui = {
    fromTeam: lang === 'en' ? 'From Our Team' : 'Nga Ekipi Ynë',
    allArticles: lang === 'en' ? 'All Articles' : 'Të Gjitha Artikujt',
    noArticles: lang === 'en' ? 'No articles in this category yet.' : 'Nuk ka ende artikuj në këtë kategori.',
    heroTitle: lang === 'en' ? 'Legal Insights' : 'Artikuj Juridikë',
    heroSubtitle: lang === 'en'
      ? 'Expert commentary on law, business, and regulatory developments in Kosovo'
      : 'Komentim ekspert mbi ligjin, biznesin dhe zhvillimet rregullatore në Kosovë',
    ctaTitle: lang === 'en' ? 'Have a Legal Question?' : 'Keni Pyetje Juridike?',
    ctaBody: lang === 'en'
      ? 'Our articles are for informational purposes. For advice specific to your situation, speak with one of our attorneys.'
      : 'Artikujt tanë janë për qëllime informuese. Për këshilla specifike, konsultohuni me një nga avokatët tanë.',
    ctaButton: lang === 'en' ? 'Schedule a Consultation' : 'Planifikoni një Konsultim',
  };

  return (
    <div>
      {/* Hero */}
      <Hero
        backgroundImage="/images/Bibloteka.webp"
        title={ui.heroTitle}
        subtitle={ui.heroSubtitle}
        fullHeight={false}
      />

      {/* Blog Grid */}
      <section className="py-20 md:py-32 bg-[#F8F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header + Language Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative"
          >
            {/* Language toggle — top right on desktop, below heading on mobile */}
            <div className="absolute right-0 top-0 hidden sm:block">
              <LanguageToggle />
            </div>

            <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">{ui.fromTeam}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
              {ui.allArticles}
            </h2>

            {/* Mobile language toggle */}
            <div className="mt-4 flex justify-center sm:hidden">
              <LanguageToggle />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-sm border transition-all duration-200 ${
                  effectiveActive === cat
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-white'
                    : 'bg-white border-[#E5E5E5] text-[#4A4A4A] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-[#9A9A9A] mt-12">{ui.noArticles}</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#2B2B2B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-6">
              {ui.ctaTitle}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {ui.ctaBody}
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#D4AF37] text-white hover:bg-[#B59025] rounded-sm px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300 font-bold shadow-md hover:shadow-lg"
            >
              {ui.ctaButton}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
