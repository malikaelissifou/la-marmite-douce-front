import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const FOOD_IMAGE = 'https://images.unsplash.com/photo-1761095596755-99ba58997720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwcGxhdGluZyUyMGZvb2R8ZW58MXx8fHwxNzY1MzI4MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080';

interface MenuSectionProps {
  onMenuClick: () => void;
}

export function MenuSection({ onMenuClick }: MenuSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const menuItems = [
    {
      title: 'Poulet Yassa',
      description: 'Poulet mariné aux oignons caramélisés, citron et épices douces. Un classique revisité avec élégance.',
      price: '12 500 F',
      badge: 'Choix du Chef',
      image: FOOD_IMAGE,
    },
    {
      title: 'Sauce Graine',
      description: 'Sauce onctueuse aux graines de palme, accompagnée de riz parfumé',
      price: '15 000 F',
      image: FOOD_IMAGE,
    },
    {
      title: 'Attiéké Poisson',
      description: 'Semoule de manioc accompagnée de poisson braisé et sauce pimentée',
      price: '10 000 F',
      image: FOOD_IMAGE,
    },
    {
      title: 'Menu Découverte',
      description: 'Laissez-vous guider par notre chef à travers un voyage culinaire unique',
      price: '25 000 F',
      image: FOOD_IMAGE,
    },
  ];

  return (
    <section id="menu" className="relative py-20 lg:py-32 gradient-bg overflow-hidden">
      
      {/* Decorative Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF37]/10 blob-shape blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FF6B35]/10 blob-shape blur-3xl" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Title */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 lg:mb-20 relative"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
              <span className="gradient-text allura drop-shadow-2xl">Nos Plats</span>
              <br />
              <span className="text-[#2D5F3F] allura italic">Signature</span>
            </h2>
            <p className="text-xl text-elegant-brown cormorant mb-6">Sélection du Chef</p>
            
            {/* Golden Line */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/50" />
              <div className="w-3 h-3 bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/50" />
              <div className="w-2 h-2 bg-[#D4AF37] rounded-full shadow-lg shadow-[#D4AF37]/50" />
              <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </div>
          </motion.div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Large Card - Poulet Yassa */}
            <div className="lg:col-span-8">
              <MenuItem {...menuItems[0]} delay={0.2} large />
            </div>

            {/* Small Card - Sauce Graine */}
            <div className="lg:col-span-4">
              <MenuItem {...menuItems[1]} delay={0.3} />
            </div>

            {/* Small Card - Attiéké */}
            <div className="lg:col-span-4">
              <MenuItem {...menuItems[2]} delay={0.4} />
            </div>

            {/* Medium Card - Menu Découverte */}
            <div className="lg:col-span-8">
              <MenuItem {...menuItems[3]} delay={0.5} large />
            </div>
          </div>

          {/* View Full Menu Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12 lg:mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 glass-card rounded-full text-elegant-brown cormorant uppercase tracking-wider border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-white/80 transition-all duration-300 shadow-lg"
              onClick={onMenuClick}
            >
              Voir le Menu Complet
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

interface MenuItemProps {
  title: string;
  description: string;
  price: string;
  badge?: string;
  image: string;
  delay?: number;
  large?: boolean;
  onOrderClick?: () => void;
}

function MenuItem({ title, description, price, badge, image, delay = 0, large = false, onOrderClick }: MenuItemProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group"
    >
      <div className={`glass-card ${large ? 'p-8' : 'p-6'} rounded-[2rem] xl:rounded-[3rem] overflow-hidden hover:shadow-2xl transition-all duration-500`}>
        
        {/* Image Container with Blob */}
        <div className={`relative ${large ? 'h-80 xl:h-96' : 'h-64'} mb-6 rounded-[1.5rem] xl:rounded-[2rem] blob-shape overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#FF6B35]" />
          <img 
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-90 transition-all duration-700"
          />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4 glass-card px-4 py-2 rounded-full">
              <span className="text-[#D4AF37] text-sm uppercase tracking-wider">{badge}</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex justify-between items-start mb-3">
          <h3 className={`${large ? 'text-3xl xl:text-4xl' : 'text-2xl'} text-gray-800`}>
            {title}
          </h3>
          <span className={`${large ? 'text-3xl xl:text-4xl' : 'text-2xl'} gradient-text`}>
            {price}
          </span>
        </div>

        <p className={`text-gray-700 ${large ? 'text-lg mb-6' : 'text-base mb-4'} cormorant leading-relaxed`}>
          {description}
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${large ? 'w-full' : ''} px-6 py-3 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full cormorant uppercase tracking-wider hover:bg-[#D4AF37] hover:text-white transition-all duration-300`}
          onClick={onOrderClick}
        >
          {large ? 'Commander' : 'Voir'}
        </motion.button>
      </div>
    </motion.div>
  );
}