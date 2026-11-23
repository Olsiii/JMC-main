import { site } from '../data/site';
import { LangToggle } from './LangToggle';

export const UtilityBar = () => (
  <div className="bg-ink text-white/75">
    <div className="wrap flex h-[38px] items-center justify-between gap-6 text-[12px]">
      <p className="hidden md:block">{site.street}, Prishtina</p>
      <a href={site.phones[0].href} className="transition-colors hover:text-white md:hidden">
        {site.phones[0].label}
      </a>
      <div className="flex items-center gap-6">
        <a href={site.phones[0].href} className="hidden transition-colors hover:text-white md:inline">
          {site.phones[0].label}
        </a>
        <a href={`mailto:${site.email}`} className="hidden transition-colors hover:text-white md:inline">
          {site.email}
        </a>
        <LangToggle variant="compact" />
      </div>
    </div>
  </div>
);
