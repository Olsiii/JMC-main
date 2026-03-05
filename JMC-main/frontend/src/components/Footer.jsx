import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer 
      className="bg-[#0B1C2D] text-[#F8F5F0]"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="/images/JMC_Legal_Logo.svg"
                alt="JMC Logo" 
                className="h-5 object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Justice & Management Consulting - Your trusted legal partner in Kosovo. 
              Excellence in every case.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-[#D4AF37]">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                data-testid="footer-link-home"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                data-testid="footer-link-about"
              >
                About Us
              </Link>
              <Link 
                to="/practice-areas" 
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                data-testid="footer-link-practice"
              >
                Practice Areas
              </Link>
              <Link 
                to="/contact" 
                className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                data-testid="footer-link-contact"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-[#D4AF37]">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Rr. Qamil Hoxha nr.8<br />
                  Prishtina 10000, Kosovo
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a 
                    href="tel:+38349337427" 
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                    data-testid="footer-phone-1"
                  >
                    +383 49 337 427
                  </a>
                  <a 
                    href="tel:+38349273787" 
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                    data-testid="footer-phone-2"
                  >
                    +383 49 273 787
                  </a>
                  <a 
                    href="tel:+38344354111" 
                    className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                    data-testid="footer-phone-3"
                  >
                    +383 44 354 111
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <a 
                  href="mailto:info@jmclegal.org" 
                  className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors"
                  data-testid="footer-email"
                >
                  info@jmclegal.org
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400">
                  Mon - Fri: 9:00 - 18:00<br />
                  Sat: 10:00 - 17:00
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-[#D4AF37]">Find Us</h4>
            <div 
              className="w-full h-48 rounded-sm overflow-hidden border border-gray-700"
              data-testid="footer-map"
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} JMC Law Firm. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Justice & Management Consulting
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
