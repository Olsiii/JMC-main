import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { MapPin, Phone, Mail, Clock, Building, ExternalLink } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Office Address',
    content: 'Rr. Qamil Hoxha nr.8',
    subcontent: 'Prishtina 10000, Kosovo'
  },
  {
    icon: Phone,
    title: 'Phone',
    phones: [
      { content: '+383 49 337 427', link: 'tel:+38349337427' },
      { content: '+383 49 273 787', link: 'tel:+38349273787' },
      { content: '+383 44 354 111', link: 'tel:+38344354111' }
    ]
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@jmclegal.org',
    link: 'mailto:info@jmclegal.org'
  },
  {
    icon: Clock,
    title: 'Office Hours',
    content: 'Mon - Fri: 9:00 - 18:00',
    subcontent: 'Sat: 10:00 - 17:00'
  }
];

const ContactPage = () => {
  return (
    <div data-testid="contact-page">
      {/* Hero Section */}
      <Hero
        title="Contact Us"
        subtitle="We're here to help with your legal needs"
        gradient={true}
        fullHeight={false}
        showLogo={true}
      />

      {/* Contact Section */}
      <section 
        className="py-20 md:py-32 bg-[#F8F5F0]"
        data-testid="contact-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">Get In Touch</p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
                  Visit Our Office
                </h2>
                <p className="text-[#4A4A4A] text-lg leading-relaxed">
                  We welcome you to visit our office in Prishtina. Our team is ready 
                  to discuss your legal needs and provide expert guidance.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white p-6 rounded-sm shadow-sm border border-[#E5E5E5] hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-300"
                      data-testid={`contact-card-${info.title.toLowerCase().replace(' ', '-')}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1A1A1A] mb-1">
                            {info.title}
                          </h3>
                          {info.phones ? (
                            <div className="flex flex-col gap-1">
                              {info.phones.map((phone) => (
                                <a
                                  key={phone.link}
                                  href={phone.link}
                                  className="text-[#4A4A4A] hover:text-[#D4AF37] transition-colors"
                                >
                                  {phone.content}
                                </a>
                              ))}
                            </div>
                          ) : info.link ? (
                            <a 
                              href={info.link}
                              className="text-[#4A4A4A] hover:text-[#D4AF37] transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <>
                              <p className="text-[#4A4A4A]">{info.content}</p>
                              {info.subcontent && (
                                <p className="text-[#4A4A4A]">{info.subcontent}</p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#2B2B2B] p-8 rounded-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white mb-2">
                      Schedule a Consultation
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      For consultations, please call us during office hours or send an email 
                      to schedule an appointment. We typically respond within 24 hours.
                    </p>
                    <a 
                      href="mailto:info@jmclegal.org"
                      className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-semibold uppercase tracking-wide hover:text-[#B59025] transition-colors"
                      data-testid="schedule-consultation-link"
                    >
                      Email Us
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">Find Us</p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
                  Our Location
                </h2>
              </div>
              
              <div 
                className="w-full h-[400px] lg:h-[500px] rounded-sm overflow-hidden border border-[#E5E5E5] shadow-lg"
                data-testid="contact-map"
              >
                <iframe
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1467.0072435621705!2d21.162889795624082!3d42.66104839471878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549ee0b9d1e245%3A0x7363335099ef3e09!2s46%20Qamil%20Hoxha%2C%20Prishtina%2010000!5e0!3m2!1sen!2s!4v1772722173551!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="JMC Office Location"
                />
              </div>

              {/* Map Info */}
              <div className="bg-white p-4 rounded-sm border border-[#E5E5E5] flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p className="text-[#4A4A4A] text-sm">
                  Located in the heart of Prishtina, easily accessible by public transport
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="py-20 bg-white"
        data-testid="faq-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">FAQ</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How do I schedule a consultation?',
                answer: 'You can schedule a consultation by calling our office during business hours or sending an email to info@jmclegal.org. We typically respond within 24 hours to arrange a convenient time.'
              },
              {
                question: 'What should I bring to my first meeting?',
                answer: 'Please bring any relevant documents related to your case, such as contracts, correspondence, or official documents. A summary of your situation and any questions you have will also be helpful.'
              },
              {
                question: 'What are your fees?',
                answer: 'Our fees vary depending on the type of case and complexity. We offer transparent pricing and will discuss all costs during your initial consultation. Some matters may be handled on a fixed fee basis.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#F8F5F0] p-6 rounded-sm"
                data-testid={`faq-item-${index}`}
              >
                <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#4A4A4A] leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
