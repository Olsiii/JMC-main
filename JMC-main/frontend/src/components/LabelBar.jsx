import { Link } from 'react-router-dom';

// Full-width stone strip: "| LABEL" (or a breadcrumb) on the left, and either
// in-container content (children) or a solid ink block link flush right.
export const LabelBar = ({ label, crumbs, link, children }) => (
  <div className="relative bg-stone">
    <div className="wrap flex min-h-[60px] items-center justify-between gap-6">
      <div className="label-caps flex min-w-0 items-center text-ink">
        <span aria-hidden="true" className="mark-sm" />
        {crumbs ? (
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-x-3">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-subtle">/</span>}
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors hover:text-accent">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-muted">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <p>{label}</p>
        )}
      </div>
      {children}
    </div>
    {link && (
      <Link
        to={link.to}
        className="label-caps absolute inset-y-0 right-0 flex items-center bg-ink px-5 text-white transition-colors duration-200 hover:bg-accent sm:px-8 lg:px-14"
      >
        {link.label}
      </Link>
    )}
  </div>
);
