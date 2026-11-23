import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, Search, X } from 'lucide-react';
import { practiceAreas, practiceGroups } from '../data/practiceAreas';
import { EASE, Reveal } from '../lib/motion';
import { LabelBar } from '../components/LabelBar';
import { ServiceList } from '../components/ServiceList';
import { CtaBand } from '../components/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import page from '../content/pages/practice-areas.json';

const AUDIENCES = [
  { id: 'all', label: 'All' },
  { id: 'business', label: 'Businesses' },
  { id: 'individual', label: 'Individuals' },
];

// Case- and accent-insensitive, so "pune" finds "punës" and "due" finds "Due diligence".
const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const groupTitle = (id) => practiceGroups.find((g) => g.id === id)?.title ?? '';

const AreaRow = ({ area, first, isMatch }) => (
  <Reveal
    as="article"
    id={area.slug}
    className={`grid scroll-mt-6 gap-8 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-12 ${
      first ? '' : 'border-t border-line'
    }`}
  >
    <div>
      <h3 className="font-serif text-[26px] leading-tight text-ink md:text-[28px]">{area.title}</h3>
      <p className="mt-3 max-w-[400px] text-[14px] leading-relaxed text-muted">{area.intro}</p>
      <Link to={`/contact?area=${area.slug}`} className="link-more mt-5">
        discuss a matter<span className="sr-only"> about {area.title}</span>
      </Link>
    </div>
    <ServiceList items={area.services} isMatch={isMatch} />
  </Reveal>
);

const PracticeAreasPage = () => {
  const [query, setQuery] = useState('');
  const [audience, setAudience] = useState('all');
  const [collapsed, setCollapsed] = useState({});

  usePageMeta({
    title: 'Practice areas | JMC Legal — Kosovo Law Firm',
    description: 'JMC Legal offers expert legal services across corporate law, competition law, tax, labor, energy, family law, litigation, and public procurement in Kosovo.',
    canonical: 'https://jmclegal.org/practice-areas',
    ogTitle: 'Practice areas | JMC Legal',
    ogDescription: 'Comprehensive legal services across 9 practice areas — corporate, tax, labor, energy, family law, litigation, and more in Kosovo.',
  });

  const q = normalize(query.trim());

  // Searching opens every group so that no match is hidden.
  useEffect(() => {
    if (q) setCollapsed({});
  }, [q]);

  const includesQuery = (text) => normalize(text).includes(q);
  const isMatch = q ? includesQuery : undefined;

  const visible = practiceAreas.filter(
    (a) =>
      (audience === 'all' || a.audience.includes(audience)) &&
      (!q || [a.title, a.intro, groupTitle(a.group), ...a.services].some(includesQuery))
  );

  const resetFilters = () => {
    setQuery('');
    setAudience('all');
  };

  return (
    <div>
      <LabelBar label="Practice areas" />

      <div className="mx-auto max-w-[1080px] px-6 pb-28 pt-20 md:px-10 md:pt-24">
        <Reveal>
          <h1 className="font-serif text-[44px] leading-[1.05] text-ink md:text-[64px]">{page.title}</h1>
          <p className="mt-6 max-w-[640px] font-serif text-[20px] leading-[1.5] text-ink md:text-[22px]">
            {page.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <label htmlFor="practice-search" className="sr-only">
            Search practice areas and services
          </label>
          <div className="focus-box flex items-center border border-ink bg-white px-5 md:px-6">
            <input
              id="practice-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search practice areas and services"
              autoComplete="off"
              className="h-16 w-full min-w-0 bg-transparent font-serif text-[19px] text-ink placeholder:text-subtle md:h-[72px] md:text-[22px] [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="-mr-2 flex h-10 w-10 flex-none items-center justify-center text-ink transition-colors hover:text-accent"
              >
                <X size={20} strokeWidth={1.25} aria-hidden="true" />
              </button>
            ) : (
              <Search size={20} strokeWidth={1.25} aria-hidden="true" className="flex-none text-ink" />
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p aria-live="polite" className="label-caps text-[11px] text-subtle">
              {visible.length} of {practiceAreas.length} areas
            </p>
            <div role="group" aria-label="Show areas for" className="flex items-center gap-5">
              <span aria-hidden="true" className="label-caps text-[11px] text-subtle">
                Show:
              </span>
              {AUDIENCES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={audience === a.id}
                  onClick={() => setAudience(a.id)}
                  className={`label-caps border-b pb-0.5 text-[11px] transition-colors duration-200 ${
                    audience === a.id ? 'border-ink text-ink' : 'border-transparent text-subtle hover:text-ink'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {practiceGroups.map((group) => {
          const areas = visible.filter((a) => a.group === group.id);
          if (!areas.length) return null;
          const open = !collapsed[group.id];
          const panelId = `group-panel-${group.id}`;

          return (
            <section key={group.id} className="mt-14 border-t border-ink">
              <h2>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setCollapsed((c) => ({ ...c, [group.id]: !c[group.id] }))}
                  className="group flex w-full items-center justify-between gap-6 border-b border-line py-7 text-left"
                >
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-serif text-[30px] leading-tight text-ink transition-colors duration-200 group-hover:text-accent md:text-[34px]">
                      {group.title}
                    </span>
                    <span className="label-caps text-[11px] text-subtle">
                      {areas.length} {areas.length === 1 ? 'area' : 'areas'}
                    </span>
                  </span>
                  <ChevronUp
                    size={22}
                    strokeWidth={1.25}
                    aria-hidden="true"
                    className={`flex-none text-ink transition-transform duration-300 ${open ? '' : 'rotate-180'}`}
                  />
                </button>
              </h2>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    {areas.map((area, i) => (
                      <AreaRow key={area.slug} area={area} first={i === 0} isMatch={isMatch} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}

        {visible.length === 0 && (
          <div className="mt-14 border-t border-ink py-16">
            <p className="font-serif text-[26px] leading-snug text-ink">No areas match “{query.trim()}”.</p>
            <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-muted">
              Try another word, or describe your matter and we will tell you which area it falls under.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-8">
              <button type="button" onClick={resetFilters} className="link-more">
                clear the search
              </button>
              <Link to={`/contact?message=${encodeURIComponent(query.trim())}`} className="link-more">
                describe your matter
              </Link>
            </div>
          </div>
        )}
      </div>

      <CtaBand
        title={page.ctaTitle}
        actions={[{ to: '/contact', label: 'Book a consultation' }]}
      />
    </div>
  );
};

export default PracticeAreasPage;
