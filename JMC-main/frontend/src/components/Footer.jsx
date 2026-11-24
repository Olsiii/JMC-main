import { Link } from 'react-router-dom';
import { site } from '../data/site';
import { NAV } from './Header';

export const Footer = () => (
  <footer className="bg-ink text-white/70">
    <div className="wrap pb-8 pt-16 md:pt-20">
      <div className="grid gap-12 text-[14px] sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:gap-x-16">
        <div>
          <img src="/images/JMC_Legal_Logo.svg" alt="JMC Legal" width="164" height="18" loading="lazy" className="h-[18px] w-auto" />
          <p className="mt-6 leading-relaxed">
            {site.fullName}
            <br />
            Legal services, Prishtina
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2.5">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="flex flex-col gap-2.5 not-italic">
          <p>{site.street}</p>
          <p>
            {site.city}, {site.country}
          </p>
          <p>{site.hours.short}</p>
        </address>

        <div className="flex flex-col gap-2.5">
          <a href={`mailto:${site.email}`} className="block font-medium text-white transition-colors hover:text-white/70">
            {site.email}
          </a>
          {site.phones.map((p) => (
            <a key={p.href} href={p.href} className="block transition-colors hover:text-white">
              {p.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-[12px] text-white/55 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} JMC Legal</p>
        <p>Information on this website is general and is not legal advice.</p>
      </div>
    </div>
  </footer>
);
