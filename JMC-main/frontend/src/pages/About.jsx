import { motion } from 'framer-motion';
import { EASE, Reveal } from '../lib/motion';
import { LabelBar } from '../components/LabelBar';
import { CtaBand } from '../components/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import page from '../content/pages/the-firm.json';

const AboutPage = () => {
  usePageMeta({
    title: 'The firm | JMC Legal — Justice & Management Consulting',
    description: 'Learn about JMC Legal — a professional legal firm in Prishtina, Kosovo, founded by three experienced legal practitioners with over seven years of institutional practice.',
    canonical: 'https://jmclegal.org/the-firm',
    ogTitle: 'The firm | JMC Legal',
    ogDescription: 'Three experienced legal practitioners united by one purpose — delivering clear legal solutions and building long-term trust with clients across Kosovo.',
  });

  return (
    <div>
      <LabelBar label="The firm" />

      <div className="mx-auto max-w-[760px] px-6 pb-24 pt-20 md:pb-32 md:pt-28">
        <Reveal>
          <h1 className="max-w-[560px] font-serif text-[44px] leading-[1.08] text-ink md:text-[64px]">
            {page.title}
          </h1>
        </Reveal>

        {page.sections.map((section, i) => (
          <Reveal as="section" key={section.title} className="mt-20 md:mt-24">
            <p className="text-[13px] tracking-[0.1em] text-accent">{String(i + 1).padStart(2, '0')}</p>
            <h2 className="label-caps mt-6 text-ink">{section.title}</h2>
            <p className="mt-5 font-serif text-[20px] leading-[1.65] text-ink md:text-[22px]">{section.body}</p>
          </Reveal>
        ))}
      </div>

      <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-ink md:h-[440px]">
        <motion.img
          src={page.banner.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="img-treat absolute inset-0 h-full w-full object-cover opacity-60"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        <Reveal as="p" className="small-caps relative px-6 text-center font-serif text-[30px] leading-tight tracking-[0.03em] text-white md:text-[44px]">
          {page.banner.text}
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3">
        {page.panels.map((panel, i) => (
          <Reveal
            as="section"
            key={panel.title}
            delay={i * 0.08}
            className={`px-6 py-14 md:px-10 md:py-16 lg:px-12 ${i === 1 ? 'bg-white' : 'bg-paper'}`}
          >
            <h2 className="font-serif text-[30px] leading-tight text-ink">{panel.title}</h2>
            <p className="mt-5 max-w-[380px] text-[15px] leading-relaxed text-muted">{panel.body}</p>
          </Reveal>
        ))}
      </div>

      <CtaBand
        tone="white"
        title={page.ctaTitle}
        actions={[
          { to: '/contact', label: 'Book a consultation' },
          { to: '/practice-areas', label: 'Practice areas', outline: true },
        ]}
      />
    </div>
  );
};

export default AboutPage;
