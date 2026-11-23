import { Link } from 'react-router-dom';

export const ConsultationBox = ({ label = 'Book a consultation' }) => (
  <Link
    to="/contact"
    className="label-caps flex min-h-[96px] items-center justify-center border border-ink px-6 text-center text-ink transition-colors duration-200 hover:bg-ink hover:text-white"
  >
    {label}
  </Link>
);
