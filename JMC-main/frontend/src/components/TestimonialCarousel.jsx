import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { testimonials as allTestimonials } from '../data/testimonials';
import { fade } from '../lib/motion';

export const TestimonialCarousel = ({ items = allTestimonials }) => {
  const [active, setActive] = useState(0);
  const dotRefs = useRef([]);

  if (!items.length) return null;

  const current = items[active];

  const handleKeyDown = (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (!step) return;
    e.preventDefault();
    const next = (active + step + items.length) % items.length;
    setActive(next);
    dotRefs.current[next]?.focus();
  };

  return (
    <section aria-roledescription="carousel" aria-label="Client testimonials" className="text-center">
      <div aria-live="polite" className="flex min-h-[190px] items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure key={active} {...fade}>
            <blockquote className="font-serif text-[22px] italic leading-[1.4] text-ink">
              <p>“{current.quote}”</p>
            </blockquote>
            <figcaption className="mt-4 text-[12px] tracking-[0.04em] text-muted">
              {[current.role, current.sector].filter(Boolean).join(', ')}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {items.length > 1 && (
        <div role="group" aria-label="Choose testimonial" className="mt-6 flex justify-center gap-4" onKeyDown={handleKeyDown}>
          {items.map((_, i) => (
            <button
              key={i}
              ref={(el) => (dotRefs.current[i] = el)}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1} of ${items.length}`}
              aria-current={i === active ? 'true' : undefined}
              tabIndex={i === active ? 0 : -1}
              className="flex h-8 w-8 items-center justify-center"
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 rounded-full border border-ink transition-colors duration-200 ${
                  i === active ? 'bg-ink' : 'bg-transparent'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
};
