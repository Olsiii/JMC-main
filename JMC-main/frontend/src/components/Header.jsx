import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { site } from '../data/site';
import { fade } from '../lib/motion';
import { UtilityBar } from './UtilityBar';
import { HelpForm } from './HelpForm';

export const NAV = [
  { label: 'Practice areas', to: '/practice-areas' },
  { label: 'The firm', to: '/the-firm' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

const MobileMenu = ({ onClose }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    // Lock the page behind the menu. overflow:hidden alone doesn't stop iOS Safari from scrolling it.
    const { body, documentElement: html } = document;
    const scrollY = window.scrollY;
    const startPath = window.location.pathname;
    html.style.overflow = 'hidden';
    Object.assign(body.style, { position: 'fixed', top: `-${scrollY}px`, left: '0', right: '0', width: '100%', overflow: 'hidden' });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      // Keep focus inside the menu while it is open.
      const focusable = panelRef.current.querySelectorAll('a[href], button, input');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      html.style.overflow = '';
      Object.assign(body.style, { position: '', top: '', left: '', right: '', width: '', overflow: '' });
      // Back to where the reader was, unless a menu link took them to a new page.
      if (window.location.pathname === startPath) window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex h-[100dvh] w-screen flex-col overflow-hidden overscroll-none bg-ink text-white lg:hidden"
      {...fade}
    >
      <div className="wrap flex h-[76px] flex-none items-center justify-between border-b border-white/10">
        <Link to="/" onClick={onClose}>
          <img src="/images/JMC_Legal_Logo.svg" alt="JMC Legal" width="164" height="18" className="h-[18px] w-auto" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-white"
        >
          <X size={24} strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Main" className="wrap flex-1 overflow-y-auto overscroll-contain py-10">
        <ul>
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center py-2 font-serif text-[36px] leading-tight transition-colors ${
                    isActive ? 'text-white' : 'text-white/70 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span aria-hidden="true" className="mark" />}
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
        <HelpForm tone="dark" className="mt-12 max-w-md" onSubmitted={onClose} />
      </nav>

      <div className="wrap flex-none flex flex-col gap-1 border-t border-white/10 py-6 text-[14px] text-white/70">
        {site.phones.map((p) => (
          <a key={p.href} href={p.href} className="block hover:text-white">
            {p.label}
          </a>
        ))}
        <a href={`mailto:${site.email}`} className="block hover:text-white">
          {site.email}
        </a>
      </div>
    </motion.div>
  );
};

export const Header = () => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const close = useRef(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }).current;

  return (
    <>
      <UtilityBar />
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="wrap flex h-[76px] items-center justify-between gap-8 lg:h-24">
          <Link to="/" className="flex-none">
            <img
              src="/images/JMC_Legal_Logo_dark.svg"
              alt="JMC Legal"
              width="164"
              height="18"
              className="h-[18px] w-auto"
            />
          </Link>

          <div className="hidden items-center gap-10 lg:flex">
            <nav aria-label="Main">
              <ul className="flex items-center gap-8">
                {NAV.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `text-[15px] transition-colors duration-200 hover:text-accent ${
                          isActive ? 'text-accent' : 'text-ink'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <HelpForm className="w-[230px]" />
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          >
            <Menu size={24} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={close} />}</AnimatePresence>
    </>
  );
};
