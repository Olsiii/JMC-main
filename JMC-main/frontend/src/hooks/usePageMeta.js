import { useEffect } from 'react';

/**
 * Sets page <title> and common meta/OG tags via useEffect.
 * Drop-in replacement for react-helmet that works with React 19.
 */
const usePageMeta = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = 'website',
} = {}) => {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (attrKey, attrValue, content) => {
      let el = document.querySelector(`meta[${attrKey}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrKey, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    if (description) setMeta('name', 'description', description);
    if (canonical)   setLink('canonical', canonical);

    // Open Graph
    if (ogTitle || title)       setMeta('property', 'og:title',       ogTitle || title);
    if (ogDescription || description) setMeta('property', 'og:description', ogDescription || description);
    if (ogUrl || canonical)     setMeta('property', 'og:url',         ogUrl || canonical);
    if (ogType)                 setMeta('property', 'og:type',        ogType);

    // Twitter card
    setMeta('name', 'twitter:card',        'summary_large_image');
    if (ogTitle || title)       setMeta('name', 'twitter:title',      ogTitle || title);
    if (ogDescription || description) setMeta('name', 'twitter:description', ogDescription || description);
  }, [title, description, canonical, ogTitle, ogDescription, ogUrl, ogType]);
};

export default usePageMeta;
