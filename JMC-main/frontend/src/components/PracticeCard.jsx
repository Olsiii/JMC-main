import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const PracticeCard = ({ 
  icon: Icon, 
  title, 
  description, 
  details,
  expandable = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format details: split on " - " bullet pattern for cleaner list display
  const detailParts = details && typeof details === 'string'
    ? details.split(/\s+-\s+/).map(s => s.trim()).filter(Boolean)
    : [];

  const hasBullets = detailParts.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 border border-transparent hover:border-[#D4AF37]/30 shadow-sm hover:shadow-xl transition-all duration-300 rounded-sm group h-full"
      data-testid={`practice-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-[#F8F5F0] rounded-sm flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/10 transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#D4AF37]" />
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl font-semibold text-[#1A1A1A] mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[#4A4A4A] text-base leading-relaxed">
        {description}
      </p>

      {/* Expandable Section */}
      {expandable && details && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 flex items-center gap-2 text-[#D4AF37] text-sm font-semibold uppercase tracking-wide hover:text-[#B59025] transition-colors"
            data-testid={`expand-btn-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="max-h-[280px] overflow-y-auto pr-2">
                    {hasBullets ? (
                      <ul className="text-[#4A4A4A] text-[15px] leading-[1.7] space-y-2 list-disc list-inside marker:text-[#D4AF37]/80">
                        {detailParts.map((part, i) => (
                          <li key={i} className="pl-1">{part}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[#4A4A4A] text-[15px] leading-[1.7]">
                        {details}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
};
