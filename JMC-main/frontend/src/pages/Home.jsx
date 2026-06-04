import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Tag, ChevronRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { PracticeCard } from '../components/PracticeCard';
import { practiceAreas } from '../data/practiceAreas';
import { blogPosts } from '../data/blogPosts';
import usePageMeta from '../hooks/usePageMeta';

const HomePage = () => {
  usePageMeta({
    title: 'JMC | Justice & Management Consulting — Legal Firm in Kosovo',
    description: 'JMC Legal is a professional law firm in Prishtina, Kosovo, founded by three experienced legal practitioners. Expert services in corporate law, litigation, tax, labor, energy, and more.',
    canonical: 'https://jmclegal.org/',
    ogTitle: 'JMC | Justice & Management Consulting',
    ogDescription: 'Your trusted legal partner in Kosovo. Expert legal services in corporate law, litigation, tax, and more.',
  });

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <Hero
        backgroundImage="/images/Gjami.webp"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Blog Teaser Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <p className="text-sm uppercase tracking-widest text-[#D4AF37] mb-3">Legal Insights</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
                From Our Blog
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[#D4AF37] hover:text-[#B59025] transition-colors flex-shrink-0"
            >
              View All Articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-[#F8F5F0] rounded-sm border border-[#E5E5E5] hover:shadow-md hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="h-1 bg-[#D4AF37]" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#9A9A9A]">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#D4AF37] transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed line-clamp-3 mb-5">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] hover:text-[#B59025] transition-colors mt-auto"
                  >
                    Read Article
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
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
