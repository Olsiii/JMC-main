import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PracticeCard } from '../components/PracticeCard';
import { practiceAreas } from '../data/practiceAreas';
import usePageMeta from '../hooks/usePageMeta';

const PracticeAreasPage = () => {
  usePageMeta({
    title: 'Practice Areas | JMC Legal — Kosovo Law Firm',
    description: 'JMC Legal offers expert legal services across corporate law, competition law, tax, labor, energy, family law, litigation, and public procurement in Kosovo.',
    canonical: 'https://jmclegal.org/practice-areas',
    ogTitle: 'Practice Areas | JMC Legal',
    ogDescription: 'Comprehensive legal services across 9 practice areas — corporate, tax, labor, energy, family law, litigation, and more in Kosovo.',
  });

  return (
    <div data-testid="practice-areas-page">
      {/* Hero Section */}
      <Hero
        backgroundImage="/images/Dukagjini2.jpg"
        title="Practice Areas"
        subtitle="Comprehensive legal services tailored to your needs"
        fullHeight={false}
      />

      {/* Practice Areas Grid Section */}
      <section
        className="py-20 md:py-32 bg-[#F8F5F0]"
        data-testid="practice-areas-grid"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">Our Services</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              How We Can Help
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              Our team of experienced attorneys provides expert legal representation
              across a wide range of practice areas. Click on any area to learn more.
            </p>
          </motion.div>

          {/* Practice Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PracticeCard
                  icon={area.icon}
                  title={area.title}
                  description={area.description}
                  details={area.details}
                  expandable={true}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-[#2B2B2B]"
        data-testid="practice-cta-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-6">
              Need Legal Assistance?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't navigate legal challenges alone. Contact us today to discuss
              your case with one of our experienced attorneys.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#D4AF37] text-white hover:bg-[#B59025] rounded-sm px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300 font-bold shadow-md hover:shadow-lg"
              data-testid="practice-contact-btn"
            >
              Contact Us Today
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PracticeAreasPage;
