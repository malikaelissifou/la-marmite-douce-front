import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, UtensilsCrossed } from 'lucide-react';

interface ContactSectionProps {
  onReservationClick: () => void;
}

export function ContactSection({ onReservationClick }: ContactSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Cotonou, Bénin',
      subContent: 'Quartier des Cocotiers',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+229 XX XX XX XX',
      subContent: 'Lun-Dim 9h-22h',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@lamarmitedouce.bj',
      subContent: 'Réponse sous 24h',
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Mar-Dim 11h-23h',
      subContent: 'Fermé le lundi',
    },
  ];

  return (
    <section id="contact" className="relative py-20 lg:py-32 bg-white overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAF8F3] to-white" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Title */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
              <span className="gradient-text allura drop-shadow-2xl">Contactez-nous</span>
            </h2>
            <p className="text-xl text-elegant-brown cormorant">Nous sommes à votre écoute</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="glass-card p-6 rounded-2xl flex items-start gap-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-800 mb-1">{info.title}</h3>
                    <p className="text-elegant-brown cormorant">{info.content}</p>
                    <p className="text-sm text-gray-600 cormorant">{info.subContent}</p>
                  </div>
                </motion.div>
              ))}

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="glass-card p-6 rounded-2xl"
              >
                <h3 className="text-lg text-gray-800 mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] flex items-center justify-center text-white shadow-lg"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] flex items-center justify-center text-white shadow-lg"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Reservation CTA */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className="glass-card p-8 lg:p-12 rounded-[3rem] h-full flex flex-col justify-center">
                
                <div className="text-center mb-8">
                  <div className="inline-block p-4 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 mb-6">
                    <UtensilsCrossed className="w-16 h-16 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl gradient-text allura mb-4">
                    Réservez Votre Table
                  </h3>
                  <p className="text-xl text-elegant-brown cormorant mb-8">
                    Vivez une expérience gastronomique inoubliable
                  </p>
                </div>

                {/* Reservation Form */}
                <div className="space-y-4 mb-8">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full px-6 py-4 rounded-full glass-card border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant"
                  />
                  <input
                    type="tel"
                    placeholder="Votre téléphone"
                    className="w-full px-6 py-4 rounded-full glass-card border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant"
                  />
                  <input
                    type="date"
                    className="w-full px-6 py-4 rounded-full glass-card border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant"
                  />
                  <input
                    type="time"
                    className="w-full px-6 py-4 rounded-full glass-card border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant"
                  />
                  <input
                    type="number"
                    placeholder="Nombre de personnes"
                    min="1"
                    className="w-full px-6 py-4 rounded-full glass-card border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-5 text-white bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] rounded-full cormorant uppercase tracking-wider shadow-2xl relative overflow-hidden group"
                  onClick={onReservationClick}
                >
                  <span className="relative z-10">Confirmer la Réservation</span>
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ scale: 0, borderRadius: '50%' }}
                    whileHover={{ scale: 2 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>

                <p className="text-center text-sm text-gray-600 mt-4 cormorant italic">
                  * La réservation sera confirmée par téléphone
                </p>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}