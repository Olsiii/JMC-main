import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PracticeCard } from '../components/PracticeCard';
import { 
  Building2, 
  Shield, 
  Users, 
  Home as HomeIcon, 
  Globe, 
  AlertTriangle,
  Scale
} from 'lucide-react';

const practiceAreas = [
  {
    icon: Building2,
    title: 'Corporate Law',
    description: 'We advise companies on governance, restructuring, mergers and acquisitions, due diligence, and risk management to ensure strong and compliant business operations.'
  },
  {
    icon: Shield,
    title: 'Competition Law ',
    description: 'We help businesses comply with competition rules, prevent unfair trade practices, and represent clients before regulatory authorities in competition and state aid matters.'
  },
  {
    icon: Users,
    title: 'Business Law and Property Law',
    description: 'We support businesses by structuring contracts, protecting assets, managing property matters, and safeguarding their legal and financial interests.'
  },
  {
    icon: HomeIcon,
    title: 'Tax Law',
    description: 'We provide strategic tax advice for transactions and ensure compliance with direct and indirect tax regulations, including representation in tax disputes.'
  },
  {
    icon: Globe,
    title: 'Labor Law',
    description: 'We guide employers through employment matters, regulatory compliance, internal policies, disciplinary decisions, and representation in labor disputes.'
  },
  {
    icon: AlertTriangle,
    title: 'Public Procurement',
    description: 'We assist clients in meeting participation requirements, preparing proposals, and representing them in procurement objection procedures.'
  },
  {
    icon: Scale,
    title: 'Energy Law',
    description: 'We advise on regulatory and market frameworks governing electricity generation, distribution, renewable energy, and energy market operations.'
  },
  {
    icon: Building2,
    title: 'Family Law',
    description: 'We provide strategic and compassionate legal support in divorce, custody, support, property division, and other family-related matters.'
  },
  {
    icon: Shield,
    title: 'Litigation',
    description: 'We represent clients in disputes by developing strategic, cost-effective solutions and pursuing the best possible outcome through negotiation or court proceedings.'
  },
];

const HomePage = () => {
  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <Hero
        backgroundImage="/images/Gjami.jpg"
        title="Three minds.
One purpose."
        subtitle="JMC | Legal Firm"
        showLogo={true}
        fullHeight={true}
        contentOnLeft={false}
      />

      {/* Practice Areas Preview Section */}
      <section 
        className="py-20 md:py-32 bg-[#F8F5F0]"
        data-testid="practice-preview-section"
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
            <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">What We Do</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-4">
              Our Expertise
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">
              We provide comprehensive legal services across multiple practice areas, 
              delivering excellence and personalized attention to every client.
            </p>
          </motion.div>

          {/* Practice Areas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <PracticeCard
                  icon={area.icon}
                  title={area.title}
                  description={area.description}
                />
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/practice-areas"
              className="inline-block bg-[#D4AF37] text-white hover:bg-[#B59025] rounded-sm px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300 font-bold shadow-md hover:shadow-lg"
              data-testid="view-all-practice-areas"
            >
              View All Practice Areas
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-[#2B2B2B]"
        data-testid="cta-section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-6">
              Ready to Discuss Your Case?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our experienced legal team. 
              We're here to help you navigate your legal challenges.
            </p>
            <Link
              to="/contact"
              className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-sm px-8 py-3 text-sm uppercase tracking-widest transition-all duration-300 font-bold"
              data-testid="schedule-consultation-btn"
            >
              Schedule a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
