// Client testimonials, managed in the CMS (Site settings → Testimonials).
// Clients are identified by role and sector only, never by name. While the list is
// empty the testimonial carousel is hidden.
import data from '../content/settings/testimonials.json';

export const testimonials = data.items || [];
