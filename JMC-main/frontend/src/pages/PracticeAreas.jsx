import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { PracticeCard } from '../components/PracticeCard';
import { 
  Building2, 
  Shield, 
  Users, 
  Scale,
  Briefcase,
  Landmark,
  Zap,
  Calculator,
  FileCheck,
  FileText
} from 'lucide-react';

const practiceAreas = [
  {
    icon: Building2,
    title: 'Corporate Law',
    description: 'We advise companies on governance, restructuring, mergers and acquisitions, due diligence, and risk management to ensure strong and compliant business operations.',
    details: 'Our Law office in relation to corporate Law provides legal services in the following areas: - Implementation of corporate governance principles; Restructuring of companies; Mergers & Acquisitions, transaction documentation included; Legal advisor for Mergers & Acquisitions transactions; Due diligence according to the scope of business; Legal support for risk management.'
  },
  {
    icon: Scale,
    title: 'Competition Law ',
    description: 'Vigorous defense representation ensuring your rights are protected throughout the legal process.',
    details: 'Competition Law has an impact on each business entity. In order to provide complex consultancy this branch is an integral part of our services: -	Legal advisory in unfair trade; -	Appraisal of possible impacts of competition Law on activities of our clients; -	Legal advisory in the area of infrastructure; -	Representation before the Competition Commission; -	Appraisal of the negative aspects of the abuse of the dominant position; -	Legal advisory in state aid Law.'
  },
  {
    icon: FileText,
    title: 'Business Law and Property Law',
    description: 'We support businesses by structuring contracts, protecting assets, managing property matters, and safeguarding their legal and financial interests.',
    details: 'We render our services to Kosovan and foreign clients, whereby we support them and secure their due performance of business activities as well as the protection of their rights and rightful interests. In the area of Business Law and Property Law, we mainly perform the following: -	Preparation and analysis of contracts and contractual relationships; -	Preparation of sample agreements and general business terms, effective setting of contractual relations for the future; -	Protection of assets; -	Legal appraisal of property structure and identification of risky areas; -	Due diligence of contractual relations; -	Legal advisory for creditors during execution of their rights.'
  },
  {
    icon: Calculator,
    title: 'Tax Law',
    description: 'Expert assistance with property transactions, disputes, and real estate development.',
      details: 'We provide top quality advice on tax Law in different types of transactions, such as mergers and acquisition, asset transfer transactions, real estate projects, cross-border and international trade transactions. In addition to this, we also provide general advisory services on compliance with Laws on direct taxes, such as corporate income tax, as well as indirect taxes, such as VAT. We also deal with tax disputes involving the Tax Administration and Customs. '
  },
  {
    icon: Briefcase,
    title: 'Labor Law',
    description: 'Navigating complex immigration processes with expertise and dedication.',
    details: 'In the area of Labor Law, we provide the following: -	Provide legal advice on case-to-case basis - provide an analysis of the applicable Laws to the specific case, the options available to the client, i.e. litigation, mediation, negotiation or other actions, explain advantages and disadvantages of each option and provide advice on the best way to proceed with the case; -	Keep client informed on changes of the existing legal framework – provide information on repealed and newly adopted labor Laws, by-Laws, courts’ interpretation of Laws and advise client on the cost of Law compliance and non-compliance; -	Reviewing Documents - Preparation of new internal acts and/or rules for the company or providing comments and legal opinions on the existing company’s internal acts; preparation of and/or providing comments and legal advice on all types of contracts as per Laws in force; -	Provide Advice on Employment Decisions - preparation of and/or providing comments and legal advice on all management decisions for imposing disciplinary measures against employees, prescribed by Labor Law; -	Representation in legal or administrative proceedings related to labor Law disputes before governmental institutions (Labor Inspectorate) and courts.'
  },
  {
    icon: FileCheck,
    title: 'Public Procurement',
    description: 'We assist clients in meeting participation requirements, preparing proposals, and representing them in procurement objection procedures.',
    details: 'Our services in Public procurement can be used as follows: -	Legal appraisal of conditions for participation in public procurement and criteria for appraisal; -	Legal advisory during the preparation of a proposal; -	Representation of a participant in an objection procedure.'
  },
  {
    icon: Zap,
    title: 'Energy Law',
    description: 'Strategic representation in civil disputes to achieve favorable outcomes.',
    details: 'We have experience in the legislative framework and institutional set-up governing the enforcement of the competition policy and Law applying to the Kosovo electricity sector; Particularly we have experience on advising clients and working on different projects related to: -	The rules governing the possibility of establishing, developing and/or acquiring generation capacity; -	the rules applicable to the generation of electricity from renewable sources (windmills, photovoltaic, biomasses etc.); -	the rules governing possible interconnection of separate transmission grids (interconnectors); -	the rules governing the separation of ownership and accounting between generation, transmission, distribution and supply (liberalization); -	the rules applicable to the calculation of the access charges applicable for transmission of electricity, -	the rules related to the distribution of electricity and those related to the regulated price, the market price and packaged offers as well as to the possibility for end-users of switching suppliers; -	the rules related to wholesale supply (bilateral contracts, spot market, wholesale aggregators) and retail supply (retail competition and open access), the possible conglomerate aspects related to the ownership of gas and electricity generation, transmission, distribution and supply; and -	the rules related to the establishment and functioning of a wholesale electricity spot market (WESM). '
  },
  {
    icon: Users,
    title: 'Family Law',
    description: 'Protecting the rights of employers and employees in workplace matters.',
      details: 'Family Law directly affects individuals and families at some of the most important moments of their lives. To provide comprehensive and sensitive legal support, this practice area forms an integral part of our services. We deliver strategic, practical, and client-focused solutions tailored to protect personal interests and promote long-term stability. Our services include: -	Legal advisory in divorce and legal separation proceedings; -	Assistance in child custody and visitation matters, including parenting plans and parental rights protection; -	Advisory and representation in child and spousal support cases; -	Drafting and review of prenuptial and postnuptial agreements; -	Legal support in adoption and guardianship procedures; -	Representation in domestic violence and protection order proceedings; -	Legal advisory on property division and related financial matters. '
  },
  {
    icon: Landmark,
    title: 'Litigation',
    description: 'We provide strategic, practical, and client-focused solutions tailored to protect personal interests and promote long-term stability.',
      details: 'We take a constructive approach and are always aware of the costs of pursuing or defending an action through the courts. Our approach is always commercial. We seek to avoid court proceedings if possible. We will advise on all forms of alternative dispute resolution and always look to secure a successful resolution at the earliest possible opportunity. If litigation is unavoidable, we employ sophisticated strategic planning, technical expertise and cost efficient case management. We listen to your commercial goals, give you clear advice on the strength of your case and develop the best strategy to ensure that your rights are protected and enforced as cost-effectively as possible. We will review progress with you throughout the proceedings and will always concentrate on finding the solution which is in your best interests. '
  }
];

const PracticeAreasPage = () => {
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
