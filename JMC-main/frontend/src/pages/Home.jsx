import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { practiceAreas } from '../data/practiceAreas';
import { localizePost, sortedPosts } from '../data/blogPosts';
import { site } from '../data/site';
import home from '../content/pages/home.json';
import { useLang } from '../context/LanguageContext';
import { EASE, fade, Reveal } from '../lib/motion';
import { LabelBar } from '../components/LabelBar';
import { SectionTitle } from '../components/SectionTitle';
import { ServiceList } from '../components/ServiceList';
import { ArticleRow } from '../components/ArticleRow';
import { ConsultationBox } from '../components/ConsultationBox';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import usePageMeta from '../hooks/usePageMeta';

const ANNOUNCEMENT = {
  en: { label: 'New insight', read: 'Read' },
  sq: { label: 'Analizë e re', read: 'Lexo' },
};

const HOME_ARTICLE_ROWS = 2;

// Areas marked "featured" in the CMS become the large tabs; without any, the first four are used.
const marked = practiceAreas.filter((a) => a.featured);
const featured = marked.length ? marked : practiceAreas.slice(0, 4);
const others = practiceAreas.filter((a) => !featured.includes(a));

const NUMBER_WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const countWord = (n) => NUMBER_WORDS[n] || String(n);

const Announcement = ({ post, lang }) => {
  const p = localizePost(post, lang);
  const t = ANNOUNCEMENT[lang] || ANNOUNCEMENT.en;
  return (
    <Link
      to={`/insights/${post.slug}`}
      className="block border-b border-line bg-paper transition-colors duration-200 hover:bg-stone"
    >
      <span className="wrap flex h-[46px] items-center justify-between gap-6 text-[13px]">
        <span className="min-w-0 truncate">
          <span className="font-medium text-accent">{t.label}</span>
          <span className="text-subtle"> · </span>
          <span className="text-ink">{p.title}</span>
        </span>
        <span className="label-caps flex-none text-ink">
          {t.read} <span aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
};

const Hero = () => {
  const scrollToIntro = () => document.getElementById('intro')?.scrollIntoView({ block: 'start' });

  return (
    <section className="relative flex h-[520px] items-center justify-center overflow-hidden bg-ink md:h-[640px]">
      <motion.img
        src={home.hero.image}
        alt=""
        aria-hidden="true"
        fetchpriority="high"
        className="img-treat absolute inset-0 h-full w-full object-cover opacity-[0.55]"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      />
      <div className="relative px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="small-caps font-serif text-[38px] leading-[1.1] tracking-[0.03em] text-white md:text-[56px]"
        >
          {home.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="label-caps mt-5 tracking-[0.3em] text-white/80"
        >
          {home.hero.subtitle}
        </motion.p>
      </div>
      <div className="absolute inset-x-0 bottom-6 flex justify-center">
        <motion.button
          type="button"
          onClick={scrollToIntro}
          aria-label="Scroll to content"
          className="flex h-12 w-12 items-center justify-center text-white/80 transition-colors hover:text-white"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, ease: EASE, repeat: Infinity }}
        >
          <ChevronDown size={30} strokeWidth={1} aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
};

const PracticeShowcase = () => {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const area = featured[active];

  const handleKeyDown = (e) => {
    const keys = {
      ArrowDown: active + 1,
      ArrowRight: active + 1,
      ArrowUp: active - 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: featured.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = (keys[e.key] + featured.length) % featured.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="practice-heading">
      <h2 id="practice-heading" className="sr-only">
        Practice areas
      </h2>
      <LabelBar label="Practice areas" link={{ to: '/practice-areas', label: `All ${countWord(practiceAreas.length)} areas ›` }} />
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-12 py-20 md:py-24 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div role="tablist" aria-orientation="vertical" aria-label="Featured practice areas" onKeyDown={handleKeyDown}>
            {featured.map((a, i) => {
              const selected = i === active;
              return (
                <button
                  key={a.slug}
                  ref={(el) => (tabRefs.current[i] = el)}
                  id={`tab-${a.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="practice-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center justify-between gap-4 border-b py-5 text-left font-serif text-[30px] leading-tight transition-colors duration-200 md:text-[36px] ${
                    selected ? 'border-ink text-ink' : 'border-line text-subtle hover:text-ink'
                  }`}
                >
                  <span className="flex items-center">
                    <span aria-hidden="true" className={`mark transition-opacity duration-200 ${selected ? 'opacity-100' : 'opacity-0'}`} />
                    {a.title}
                  </span>
                  {selected && <ArrowRight size={22} strokeWidth={1.25} aria-hidden="true" className="flex-none" />}
                </button>
              );
            })}
          </div>
          <p className="mt-6 text-[13px] leading-[2.1] text-muted">
            <span className="mr-2">Also:</span>
            {others.map((a) => (
              <Link key={a.slug} to={`/practice-areas#${a.slug}`} className="link-line mr-3 text-ink sm:whitespace-nowrap">
                {a.title}
              </Link>
            ))}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="bg-paper p-8 md:p-12">
          <div role="tabpanel" id="practice-panel" aria-labelledby={`tab-${area.slug}`} className="min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={area.slug} {...fade}>
                <p className="label-caps text-accent">{area.title}</p>
                <p className="mt-5 font-serif text-[21px] leading-[1.5] text-ink md:text-[23px]">{area.description}</p>
                <ServiceList items={area.keyServices} className="mt-8" />
                <Link to={`/practice-areas#${area.slug}`} className="btn-outline mt-10">
                  More on {area.title}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const HomePage = () => {
  const { lang } = useLang();
  const posts = sortedPosts();

  usePageMeta({
    title: 'JMC | Justice & Management Consulting — Legal Firm in Kosovo',
    description: 'JMC Legal is a professional law firm in Prishtina, Kosovo, founded by three experienced legal practitioners. Expert services in corporate law, litigation, tax, labor, energy, and more.',
    canonical: 'https://jmclegal.org/',
    ogTitle: 'JMC | Justice & Management Consulting',
    ogDescription: 'Your trusted legal partner in Kosovo. Expert legal services in corporate law, litigation, tax, and more.',
  });

  return (
    <div>
      {home.showLatestInsight && posts[0] && <Announcement post={posts[0]} lang={lang} />}
      <Hero />

      <section id="intro" className="py-24 md:py-32">
        <Reveal className="mx-auto max-w-[760px] px-6">
          <p className="text-[13px] tracking-[0.1em] text-accent">01</p>
          <p className="mt-8 font-serif text-[22px] leading-[1.6] text-ink md:text-[26px]">{home.intro}</p>
          <Link to="/the-firm" className="link-more mt-10">
            more about the firm
          </Link>
        </Reveal>
      </section>

      <PracticeShowcase />

      <div className="wrap grid gap-16 py-24 md:py-32 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-[72px]">
        <section aria-labelledby="insights-heading">
          <Reveal className="flex items-end justify-between gap-6">
            <SectionTitle id="insights-heading">Insights</SectionTitle>
            <Link to="/insights" className="link-more mb-2">
              all insights
            </Link>
          </Reveal>
          <div className="mt-12 flex flex-col gap-14">
            {posts.slice(0, HOME_ARTICLE_ROWS).map((post, i) => (
              <ArticleRow key={post.slug} post={post} index={i + 1} lang={lang} large />
            ))}
          </div>
        </section>

        <aside aria-label="Consultation and client testimonials" className="flex flex-col gap-14">
          <Reveal>
            <ConsultationBox />
          </Reveal>
          <Reveal delay={0.1}>
            <TestimonialCarousel />
          </Reveal>
        </aside>
      </div>

      <section className="bg-paper">
        <div className="wrap grid items-center gap-12 py-24 md:py-28 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionTitle>{home.office.title}</SectionTitle>
            <p className="mt-6 max-w-[420px] text-[15px] leading-relaxed text-muted">{home.office.text}</p>
            <address className="mt-8 text-[14px] not-italic leading-relaxed text-ink">
              {site.street}
              <br />
              {site.city}
              <br />
              <a href={site.phones[0].href} className="transition-colors hover:text-accent">
                {site.phones[0].label}
              </a>
            </address>
            <Link to="/contact" className="btn-outline mt-10">
              Contact the office
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={home.office.image}
              alt={home.office.imageAlt || ''}
              loading="lazy"
              className="img-treat aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
