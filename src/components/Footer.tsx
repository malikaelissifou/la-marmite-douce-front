import { UtensilsCrossed, Instagram, Facebook, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white to-[#FAF8F3] border-t border-[#D4AF37]/20 py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Logo & Description */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                </div>
                <h3 className="allura gradient-text text-2xl">La Marmite Douce</h3>
              </div>
              <p className="text-gray-600 cormorant leading-relaxed">
                L&apos;excellence de la gastronomie africaine, 
                où tradition et raffinement se rencontrent.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="text-lg text-gray-800 mb-4">Navigation</h4>
              <div className="space-y-2">
                {['Accueil', 'Menu', 'À propos', 'Galerie', 'Contact'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace('à ', 'a')}`}
                    className="block text-gray-600 hover:text-[#D4AF37] transition-colors duration-300 cormorant"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h4 className="text-lg text-gray-800 mb-4">Contact</h4>
              <div className="space-y-2 text-gray-600 cormorant">
                <p>Cotonou, Bénin</p>
                <p>+229 XX XX XX XX</p>
                <p>contact@lamarmitedouce.bj</p>
                <div className="flex gap-3 justify-center md:justify-end mt-4">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center text-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FF6B35] hover:text-white transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center text-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FF6B35] hover:text-white transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center text-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FF6B35] hover:text-white transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-600 cormorant">
              © {currentYear} La Marmite Douce · Restaurant Gastronomique
            </p>
            <p className="text-sm text-gray-500 mt-2 cormorant">
              Tous droits réservés
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
