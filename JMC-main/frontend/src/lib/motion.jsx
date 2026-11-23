import { motion } from 'framer-motion';

// The single easing curve used across the site.
export const EASE = [0.25, 1, 0.35, 1];

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: EASE },
};

// Fades in and rises 14px, once, when scrolled into view.
export const Reveal = ({ as = 'div', delay = 0, children, ...rest }) => {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
};
