// Firm contact details, managed in the CMS (Site settings → Contact details).
import data from '../content/settings/site.json';

export const site = {
  name: 'JMC Legal',
  fullName: 'Justice & Management Consulting',
  ...data,
  phones: data.phones.map((label) => ({ label, href: `tel:${label.replace(/[^\d+]/g, '')}` })),
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${data.street}, ${data.city}, ${data.country}`
  )}`,
};
