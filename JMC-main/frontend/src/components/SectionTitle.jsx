export const SectionTitle = ({ as: Tag = 'h2', id, className = '', children }) => (
  <Tag id={id} className={`flex items-center font-serif text-[32px] leading-tight text-ink md:text-[40px] ${className}`}>
    <span aria-hidden="true" className="mark" />
    {children}
  </Tag>
);
