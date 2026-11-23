import { useLang } from '../context/LanguageContext';

const LANGS = {
  en: { code: 'EN', name: 'English' },
  sq: { code: 'SQ', name: 'Shqip' },
};

// compact: "EN | SQ" text toggle for the dark utility bar.
// block:   "SQ  EN" solid-block toggle for label bars.
export const LangToggle = ({ variant = 'compact' }) => {
  const { lang, setLang } = useLang();

  if (variant === 'block') {
    return (
      <div role="group" aria-label="Language" className="flex items-center gap-1">
        {['sq', 'en'].map((code) => (
          <button
            key={code}
            type="button"
            lang={code}
            aria-label={LANGS[code].name}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={`label-caps min-w-[40px] px-3 py-2 transition-colors duration-200 ${
              lang === code ? 'bg-ink text-white' : 'text-ink hover:text-accent'
            }`}
          >
            {LANGS[code].code}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div role="group" aria-label="Language" className="flex items-center text-[12px] font-medium tracking-[0.06em]">
      {['en', 'sq'].map((code, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className="px-1.5 text-white/30">|</span>}
          <button
            type="button"
            lang={code}
            aria-label={LANGS[code].name}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={`px-1 py-2 transition-colors duration-200 ${
              lang === code ? 'text-white' : 'text-white/55 hover:text-white'
            }`}
          >
            {LANGS[code].code}
          </button>
        </span>
      ))}
    </div>
  );
};
