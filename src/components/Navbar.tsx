import { useState, useEffect } from 'react';
import { Menu, X, UtensilsCrossed, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onMenuClick: () => void;
  onReservationClick: () => void;
}

export function Navbar({ onMenuClick, onReservationClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['accueil', 'menu', 'apropos', 'galerie', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'menu', label: 'Menu' },
    { id: 'apropos', label: 'À propos' },
    { id: 'galerie', label: 'Galerie' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#FF6B35] to-[#D4AF37] z-[60] origin-left"
        style={{
          scaleX: 0,
        }}
        animate={{
          scaleX: typeof window !== 'undefined' ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) : 0
        }}
      />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-card border-b border-[#D4AF37]/15 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('accueil')}
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] p-0.5 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center">
                    <UtensilsCrossed className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </motion.div>
              </div>
              <div>
                <h1 className="allura gradient-text text-2xl sm:text-3xl">
                  La Marmite Douce
                </h1>
                <p className="cormorant text-[0.65rem] text-elegant-brown opacity-80 uppercase tracking-[0.25em] hidden sm:block">
                  Restaurant · Gastronomie
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-5 py-2 cormorant transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'text-[#D4AF37]'
                      : 'text-gray-700 hover:text-[#D4AF37]'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Liquid Background */}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/10 to-[#FF6B35]/10 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  {/* Bottom Border */}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent w-4/5"
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block relative px-6 py-3 cormorant text-white bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] rounded-full overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReservationClick}
            >
              <span className="relative z-10">Réserver une table</span>
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ scale: 0, borderRadius: '50%' }}
                whileHover={{ scale: 2, borderRadius: '50%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#D4AF37]"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', bounce: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card m-6 mt-24 p-8 rounded-[2rem] max-w-md mx-auto border border-[#D4AF37]/20"
            >
              <h2 className="allura gradient-text text-3xl text-center mb-6">
                Menu
              </h2>
              
              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full text-left px-6 py-3 rounded-xl cormorant transition-all duration-300 ${
                      activeSection === link.id
                        ? 'bg-gradient-to-r from-[#D4AF37]/20 to-[#FF6B35]/20 text-[#D4AF37]'
                        : 'hover:bg-white/50'
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full mt-6 px-6 py-4 cormorant text-white bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] rounded-full"
                whileTap={{ scale: 0.95 }}
                onClick={onReservationClick}
              >
                Réserver maintenant
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}