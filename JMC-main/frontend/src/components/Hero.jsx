import { motion } from 'framer-motion';

export const Hero = ({ 
  backgroundImage, 
  title, 
  subtitle, 
  showLogo = false,
  fullHeight = true,
  gradient = false,
  contentOnLeft = false,
  children
}) => {
  const contentOrder = contentOnLeft ? (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-serif text-5xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight whitespace-pre-line mb-10"
        data-testid="hero-title"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl"
          data-testid="hero-subtitle"
        >
          {subtitle}
        </motion.p>
      )}
      {showLogo && (
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          src="/JMC_Logo_Dark-removebg-preview.png"
          alt="JMC Logo"
          className="h-32 w-32 md:h-44 md:w-44 object-contain"
          data-testid="hero-logo"
        />
      )}
    </>
  ) : (
    <>
      {showLogo && (
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          src="/JMC_Logo_Dark-removebg-preview.png"
          alt="JMC Logo"
          className="h-32 w-32 md:h-44 md:w-44 mx-auto object-contain"
          data-testid="hero-logo"
        />
      )}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-serif text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight"
        data-testid="hero-title"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
          data-testid="hero-subtitle"
        >
          {subtitle}
        </motion.p>
      )}
    </>
  );

  return (
    <section 
      className={`relative w-full ${fullHeight ? 'h-screen' : 'h-screen min-h-[400px]'} flex items-center overflow-hidden ${contentOnLeft ? 'justify-start' : 'justify-center'}`}
      data-testid="hero-section"
    >
      {/* Background */}
      {gradient ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C2D] via-[#1a2f44] to-[#2B2B2B]" />
      ) : (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale brightness-50 bg-[#1a1a1a]"
            style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </>
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-7xl w-full px-4 sm:px-6 lg:px-8 ${contentOnLeft ? 'pl-[30px] sm:pl-12 text-left' : 'text-center'}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={contentOnLeft ? 'space-y-12 pl-[30px] sm:pl-12 flex flex-col items-start' : 'space-y-6'}
        >
          {contentOrder}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>



    </section>
  );
};
