import { motion } from 'framer-motion';
import { Hero } from '../components/Hero';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Target, Eye, Heart, Award } from 'lucide-react';

const tabContent = {
  mission: {
    icon: Target,
    title: 'Our Mission',
    content: `At JMC, our mission is to provide exceptional legal services that empower our clients to achieve their goals. We are committed to delivering personalized, strategic legal counsel that addresses the unique needs of each client. Through integrity, expertise, and dedication, we strive to be the trusted legal partner for individuals and businesses throughout Kosovo.`
  },
  vision: {
    icon: Eye,
    title: 'Our Vision',
    content: `We envision becoming a leading legal firm in Kosovo, recognized for a strong commitment to excellence, innovation, and client satisfaction. Our goal is to set a high standard for legal services in the region by fostering a culture of continuous improvement and professional development while contributing to the advancement of the legal sector.`
  },
  values: {
    icon: Heart,
    title: 'Our Values',
    content: `Integrity forms the foundation of everything we do. We believe in transparent communication, ethical practice, and honest relationships with our clients. Excellence drives us to continuously improve our skills and deliver outstanding results. Compassion guides our approach, ensuring every client feels heard and respected throughout their legal journey.`
  },
  whyUs: {
    icon: Award,
    title: 'Why Choose Us',
    content: `With years of experience serving clients across Kosovo, JMC brings unparalleled expertise and local knowledge to every case. Our team combines legal excellence with a deep understanding of the Kosovo legal landscape. We offer personalized attention, strategic thinking, and a commitment to achieving the best possible outcomes for our clients.`
  }
};

const AboutPage = () => {
  return (
    <div data-testid="about-page">
      {/* Hero Section */}
      <Hero
        backgroundImage="/images/Kala.jpg"
        title="About JMC"
        subtitle="Your trusted legal partner since establishment"
        fullHeight={false}
      />

      {/* About Content Section */}
      <section 
        className="py-20 md:py-32 bg-[#F8F5F0]"
        data-testid="about-content-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-4">Who We Are</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A] mb-6">
              Justice & Management Consulting
            </h2>
            <p className="text-[#4A4A4A] text-lg leading-relaxed">
            JMC Legal is a professional legal firm founded by three experienced legal practitioners with over seven years of work in legal offices and institutional practice.
            We provide strategic and results-oriented legal services to businesses and individuals, focusing on risk prevention, legal protection, and effective representation. Our work is guided by integrity, precision, and confidentiality.
            At JMC Legal, we are committed to delivering clear legal solutions and building long-term trust with our clients.
            </p>
          </motion.div>

          {/* Interactive Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Tabs defaultValue="mission" className="w-full">
              <TabsList className="w-full flex flex-wrap justify-center gap-2 bg-transparent mb-8 sm:mb-10 min-h-[4.5rem] sm:min-h-0">
                {Object.entries(tabContent).map(([key, value]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="px-4 sm:px-6 py-3 text-xs sm:text-sm uppercase tracking-wide font-semibold rounded-sm border border-[#E5E5E5] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white data-[state=active]:border-[#D4AF37] transition-all duration-300 flex-1 min-w-[calc(50%-4px)] sm:min-w-0 sm:flex-initial"
                    data-testid={`tab-${key}`}
                  >
                    {value.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(tabContent).map(([key, value]) => {
                const IconComponent = value.icon;
                return (
                  <TabsContent 
                    key={key} 
                    value={key}
                    data-testid={`tab-content-${key}`}
                    className="mt-6 sm:mt-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="bg-white p-8 md:p-12 rounded-sm shadow-lg"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center">
                          <IconComponent className="w-7 h-7 text-[#D4AF37]" />
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A]">
                          {value.title}
                        </h3>
                      </div>
                      <p className="text-[#4A4A4A] text-lg leading-relaxed">
                        {value.content}
                      </p>
                    </motion.div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section with Image */}
      <section 
        className="py-20 bg-white"
        data-testid="who-we-are-section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-widest text-[#D4AF37]">Our Team</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
                Experienced Legal Professionals
              </h2>
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
              Our team consists of experienced legal professionals with diverse backgrounds and areas of specialization. Each member brings unique expertise and perspective, allowing us to provide comprehensive legal solutions across multiple practice areas.
              </p>
              <p className="text-[#4A4A4A] text-lg leading-relaxed">
              We believe in a collaborative approach, combining our individual strengths to deliver the best possible outcomes for our clients. Our commitment to continuous learning ensures we remain up to date with the latest legal developments.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="text-center p-4 bg-[#F8F5F0] rounded-sm">
                  <p className="font-serif text-3xl font-bold text-[#D4AF37]">5+</p>
                  <p className="text-sm text-[#4A4A4A] mt-1">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-[#F8F5F0] rounded-sm">
                  <p className="font-serif text-3xl font-bold text-[#D4AF37]">50+</p>
                  <p className="text-sm text-[#4A4A4A] mt-1">Cases Handled</p>
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1758520144427-ddb02ac74e9d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBoYW5kc2hha2UlMjBwcm9mZXNzaW9uYWx8ZW58MHx8fHwxNzcyNTMyMDY1fDA&ixlib=rb-4.1.0&q=85"
                  alt="JMC Legal Team Meeting"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#D4AF37]/20 rounded-sm -z-10" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
