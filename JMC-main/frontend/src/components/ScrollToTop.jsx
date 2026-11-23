import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top on navigation, or to the #hash target when there is one.
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const timer = setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' });
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};
