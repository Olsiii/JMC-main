import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';
import usePageMeta from '../hooks/usePageMeta';
import { practiceAreas, findPracticeArea } from '../data/practiceAreas';
import { site } from '../data/site';
import { Reveal } from '../lib/motion';
import { LabelBar } from '../components/LabelBar';
import { SectionTitle } from '../components/SectionTitle';

// ✏️  Paste your Formspree form ID here (e.g. 'xpwzgkbd')
// Get it from https://formspree.io → New Form → copy the ID from the endpoint URL
const FORMSPREE_ID = 'xqejrgyj';

const OTHER_AREA = 'other';

const EMPTY_FORM = {
  name: '',
  company: '',
  email: '',
  phone: '',
  area: '',
  message: '',
};

const Field = ({ id, label, className = '', children }) => (
  <div className={className}>
    <label htmlFor={id} className="block text-[13px] text-muted">
      {label}
    </label>
    {children}
  </div>
);

const ContactPage = () => {
  usePageMeta({
    title: 'Contact | JMC Legal — Prishtina, Kosovo',
    description: 'Contact JMC Legal in Prishtina, Kosovo. Call +383 49 337 427, email info@jmclegal.org, or visit our office at Rr. Qamil Hoxha nr.8. Schedule a consultation today.',
    canonical: 'https://jmclegal.org/contact',
    ogTitle: 'Contact | JMC Legal',
    ogDescription: 'Get in touch with JMC Legal in Prishtina. Call, email, or visit us to schedule a consultation with our experienced legal team.',
  });

  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  // Prefill from ?message= (header "How can we help you?") and ?area= (practice area links).
  useEffect(() => {
    const message = searchParams.get('message');
    const area = searchParams.get('area');
    setFormData((current) => ({
      ...current,
      ...(message ? { message } : {}),
      ...(findPracticeArea(area) ? { area } : {}),
    }));
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (FORMSPREE_ID === 'YOUR_FORM_ID') {
      setStatus('no_id');
      return;
    }
    const areaTitle =
      findPracticeArea(formData.area)?.title || (formData.area === OTHER_AREA ? 'Other / not sure' : '');
    setStatus('sending');
    try {
      await axios.post(
        `https://formspree.io/f/${FORMSPREE_ID}`,
        {
          ...formData,
          area: areaTitle,
          subject: areaTitle ? `Website enquiry – ${areaTitle}` : 'Website enquiry',
        },
        { headers: { Accept: 'application/json' } }
      );
      setStatus('success');
      setFormData(EMPTY_FORM);
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <LabelBar label="Contact" />

      <div className="wrap grid gap-16 pb-24 pt-20 md:pb-28 md:pt-24 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_370px] xl:gap-[72px]">
        <div className="min-w-0">
          <Reveal>
            <h1 className="font-serif text-[44px] leading-[1.05] text-ink md:text-[64px]">How can we help you?</h1>
            <p className="mt-6 max-w-[460px] text-[16px] leading-relaxed text-muted">
              Tell us briefly what the matter concerns. Please don’t send confidential documents at this stage.
            </p>
          </Reveal>

          {status === 'success' ? (
            <div role="status" className="mt-12 bg-paper p-8 md:p-12">
              <p className="label-caps text-accent">Message sent</p>
              <p className="mt-4 font-serif text-[24px] leading-snug text-ink">
                Thank you for reaching out. We will get back to you within 24 hours.
              </p>
              <button type="button" onClick={() => setStatus('idle')} className="link-more mt-8">
                send another message
              </button>
            </div>
          ) : (
            <Reveal as="form" delay={0.1} onSubmit={handleSubmit} className="mt-12">
              <div className="grid gap-x-7 gap-y-8 md:grid-cols-3">
                <Field id="name" label="Name">
                  <input id="name" type="text" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} className="field mt-2" />
                </Field>
                <Field id="company" label="Company (optional)">
                  <input id="company" type="text" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} className="field mt-2" />
                </Field>
                <Field id="email" label="Email">
                  <input id="email" type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className="field mt-2" />
                </Field>
                <Field id="phone" label="Phone">
                  <input id="phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className="field mt-2" />
                </Field>
                <Field id="area" label="Area of law" className="md:col-span-3">
                  <div className="relative mt-2">
                    <select id="area" name="area" value={formData.area} onChange={handleChange} className="field appearance-none pr-8">
                      <option value="">Select</option>
                      {practiceAreas.map((a) => (
                        <option key={a.slug} value={a.slug}>
                          {a.title}
                        </option>
                      ))}
                      <option value={OTHER_AREA}>Other / not sure</option>
                    </select>
                    <ChevronDown size={16} strokeWidth={1.25} aria-hidden="true" className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink" />
                  </div>
                </Field>
                <Field id="message" label="Your message" className="md:col-span-3">
                  <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} className="field mt-2 resize-y" />
                </Field>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-8 border-l-2 border-accent pl-4 text-[14px] leading-relaxed text-ink">
                  Something went wrong. Please try again or email us at{' '}
                  <a href={`mailto:${site.email}`} className="link-line">
                    {site.email}
                  </a>
                  .
                </p>
              )}
              {status === 'no_id' && (
                <p role="alert" className="mt-8 border-l-2 border-accent pl-4 text-[14px] leading-relaxed text-ink">
                  Form not configured yet. Open <code className="font-mono">Contact.jsx</code> and replace{' '}
                  <code className="font-mono">YOUR_FORM_ID</code> with your Formspree ID.
                </p>
              )}

              <div className="mt-10 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-[280px] text-[13px] leading-relaxed text-muted">
                  Sending this form does not create a lawyer–client relationship.
                </p>
                <button type="submit" disabled={status === 'sending'} className="btn-solid min-w-[150px] disabled:cursor-not-allowed disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : 'Send'}
                </button>
              </div>
              <span role="status" className="sr-only">
                {status === 'sending' ? 'Sending message' : ''}
              </span>
            </Reveal>
          )}
        </div>

        <Reveal as="aside" delay={0.15} className="flex flex-col gap-10">
          <div className="border border-ink p-7 md:p-8">
            <h2 className="label-caps text-ink">Telephone</h2>
            <ul className="mt-4 flex flex-col gap-1.5">
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="text-[18px] text-ink transition-colors hover:text-accent">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label-caps text-ink">Email</h2>
            <a href={`mailto:${site.email}`} className="link-line mt-3 inline-block text-[16px] text-ink">
              {site.email}
            </a>
          </div>
          <div>
            <h2 className="label-caps text-ink">Office hours</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {site.hours.weekdays}
              <br />
              {site.hours.saturday}
            </p>
          </div>
        </Reveal>
      </div>

      <section className="bg-paper">
        <div className="wrap grid items-center gap-12 py-24 md:py-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <SectionTitle>The office</SectionTitle>
            <address className="mt-6 text-[16px] not-italic leading-relaxed text-ink">
              {site.street}
              <br />
              {site.city}, {site.country}
            </address>
            <a href={site.directionsUrl} target="_blank" rel="noopener noreferrer" className="link-more mt-8">
              get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-[360px] w-full border border-line md:h-[420px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1467.0072435621705!2d21.162889795624082!3d42.66104839471878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee0b9d1e245%3A0x7363335099ef3e09!2s46%20Qamil%20Hoxha%2C%20Prishtina%2010000!5e0!3m2!1sen!2s!4v1772722173551!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JMC Office Location"
                className="h-full w-full grayscale"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
