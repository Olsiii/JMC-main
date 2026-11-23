import { Link } from 'react-router-dom';
import { Reveal } from '../lib/motion';

export const CtaBand = ({ title, actions, tone = 'paper' }) => (
  <section className={tone === 'paper' ? 'bg-paper' : 'bg-white'}>
    <Reveal className="wrap flex flex-col gap-8 py-20 md:py-24 lg:flex-row lg:items-center lg:justify-between">
      <h2 className="max-w-[640px] font-serif text-[28px] leading-[1.2] text-ink md:text-[36px]">{title}</h2>
      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Link key={action.to} to={action.to} className={action.outline ? 'btn-outline' : 'btn-solid'}>
            {action.label}
          </Link>
        ))}
      </div>
    </Reveal>
  </section>
);
