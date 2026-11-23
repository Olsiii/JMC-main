import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(
    () => localStorage.getItem('jmc-lang') || 'sq'
  );

  const setLang = (next) => {
    localStorage.setItem('jmc-lang', next);
    setLangState(next);
  };

  const toggle = () => setLang(lang === 'sq' ? 'en' : 'sq');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
