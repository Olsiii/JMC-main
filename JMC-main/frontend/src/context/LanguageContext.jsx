import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('jmc-lang') || 'sq'
  );

  const toggle = () => {
    const next = lang === 'sq' ? 'en' : 'sq';
    localStorage.setItem('jmc-lang', next);
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
