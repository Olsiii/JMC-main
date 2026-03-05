import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Practice Areas', path: '/practice-areas' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav 
      className="w-full bg-[#2B2B2B] text-white py-4 px-4 sm:px-6 lg:px-8"
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/"
          className="flex items-center gap-3"
          data-testid="navbar-logo"
          onClick={closeMenu}
        >
          {/* <img 
            src="/JMC_Logo_Dark-removebg-preview.png"
            alt="JMC Logo" 
            className="h-10 w-10 object-contain"
          />
          */}
          <img 
            src="/images/JMC_Legal_Logo.svg"
            alt="JMC" 
            className="h-5 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 hover:text-[#D4AF37] ${
                location.pathname === link.path ? 'text-[#D4AF37]' : 'text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white hover:text-[#D4AF37] transition-colors"
          onClick={toggleMenu}
          data-testid="mobile-menu-toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 h-full w-64 z-50 md:hidden"
            data-testid="mobile-menu-panel"
          >
            {/* Panel Content */}
            <div className="h-full bg-[#2B2B2B]/95 backdrop-blur-sm flex flex-col pt-20 px-6">
              {/* Close Button */}
              <button
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2 text-white hover:text-[#D4AF37] transition-colors"
                data-testid="mobile-menu-close"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={closeMenu}
                      data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                      className={`text-lg uppercase tracking-widest transition-colors duration-300 hover:text-[#D4AF37] ${
                        location.pathname === link.path ? 'text-[#D4AF37]' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
