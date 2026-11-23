// Dotted, underlined list of services, in two columns from the small breakpoint up.
export const ServiceList = ({ items, isMatch, className = '' }) => (
  <ul className={`grid content-start items-start gap-x-8 gap-y-3 sm:grid-cols-2 ${className}`}>
    {items.map((item) => (
      <li key={item} className="flex gap-2.5 text-[14px] leading-snug">
        <span aria-hidden="true" className="text-subtle">·</span>
        <span className={`border-b border-line-strong pb-1 ${isMatch?.(item) ? 'text-accent' : 'text-ink'}`}>
          {item}
        </span>
      </li>
    ))}
  </ul>
);
