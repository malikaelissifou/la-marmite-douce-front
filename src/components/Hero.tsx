import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Phone, Clock, ChevronDown, Sparkles, Award } from 'lucide-react';
import { useRef } from 'react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1665332561290-cc6757172890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZm9vZCUyMGN1aXNpbmV8ZW58MXx8fHwxNzY1MzI4MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080';
const RESTAURANT_IMAGE = 'https://images.unsplash.com/photo-1756397481872-ed981ef72a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2NTMwODI5Mnww&ixlib=rb-4.1.0&q=80&w=1080';
const CHEF_IMAGE = 'https://images.unsplash.com/photo-1681270543584-8e541a1bb056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZ3xlbnwxfHx8fDE3NjUzMTMxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080';
const FOOD_IMAGE = 'https://images.unsplash.com/photo-1761095596755-99ba58997720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwcGxhdGluZyUyMGZvb2R8ZW58MXx8fHwxNzY1MzI4MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080';

interface HeroProps {
  onMenuClick: () => void;
  onReservationClick: () => void;
}

export function Hero({ onMenuClick, onReservationClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section 
      ref={containerRef}
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      
      {/* Massive Background with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 gradient-bg"
      >
        {/* Giant Animated Blobs */}
        <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-[#D4AF37]/30 via-[#FF6B35]/20 to-transparent blob-shape blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-gradient-to-br from-[#2D5F3F]/25 via-[#D4AF37]/20 to-transparent blob-shape blur-3xl" style={{ animationDelay: '3s', animationDuration: '12s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#FF6B35]/15 to-transparent blob-shape blur-3xl" style={{ animationDelay: '1.5s', animationDuration: '10s' }} />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,248,243,0.3)_100%)]" />
      </motion.div>
      
      {/* Floating Golden Particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: `radial-gradient(circle, ${i % 2 === 0 ? '#D4AF37' : '#FF6B35'}, transparent)`,
            boxShadow: `0 0 ${Math.random() * 20 + 10}px ${i % 2 === 0 ? '#D4AF37' : '#FF6B35'}`,
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
        />
      ))}

      {/* Spotlight Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#FF6B35]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-20 pb-12">
        <motion.div 
          style={{ opacity }}
          className="max-w-7xl mx-auto"
        >
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-16">
            
            {/* Left Decorative Images Column */}
            <div className="hidden lg:block lg:col-span-3 space-y-8">
              {/* Image 1 */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -30, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img 
                      src={RESTAURANT_IMAGE}
                      alt="Restaurant"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-[#D4AF37]/20" />
                  </div>
                  {/* Floating Icon Badge */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Sparkles className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Image 2 */}
              <motion.div
                initial={{ opacity: 0, x: -100, rotate: 10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, -3, 0]
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F3F] to-[#D4AF37] rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative w-4/5 ml-auto aspect-square rounded-[2rem] overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img 
                      src={FOOD_IMAGE}
                      alt="Plat"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F3F]/20 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Center Content */}
            <div className="lg:col-span-6 text-center space-y-8">
              
              {/* Premium Logo Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: 'spring', 
                  bounce: 0.4, 
                  duration: 1.5,
                  delay: 0.2 
                }}
                className="inline-block relative"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] rounded-full blur-2xl opacity-60 animate-pulse" />
                
                <div className="relative">
                  {/* Outer Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 w-44 h-44 sm:w-52 sm:h-52 rounded-full"
                    style={{
                      background: 'conic-gradient(from 0deg, #D4AF37, #FF6B35, #D4AF37, #FF6B35, #D4AF37)',
                    }}
                  />
                  
                  {/* Main Image Container */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 p-2">
                    <div className="w-full h-full rounded-full bg-white p-1.5 shadow-2xl">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#D4AF37]/30">
                        <img 
                          src={HERO_IMAGE}
                          alt="La Marmite Douce"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Orbiting Icons */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 w-44 h-44 sm:w-52 sm:h-52"
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-[#D4AF37]">
                      <Award className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Decorative Line Top */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex items-center justify-center"
              >
                <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                <div className="mx-6 px-8 py-3 glass-card rounded-full border border-[#D4AF37]/20">
                  <p className="text-elegant-brown uppercase tracking-[0.35em] text-xs sm:text-sm cormorant flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    Restaurant Gastronomique
                  </p>
                </div>
                <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              </motion.div>

              {/* Main Title - Spectacular */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <h1 className="relative">
                  {/* Main Text */}
                  <span className="block text-7xl sm:text-8xl lg:text-9xl xl:text-[12rem] leading-none mb-4">
                    <span className="block gradient-text drop-shadow-2xl" style={{
                      textShadow: '0 10px 40px rgba(212, 175, 55, 0.4), 0 0 80px rgba(212, 175, 55, 0.2)'
                    }}>
                      L&apos;Art Culinaire
                    </span>
                  </span>
                  
                  {/* Subtitle with dramatic styling */}
                  <span className="block text-7xl sm:text-8xl lg:text-9xl xl:text-[10rem] text-[#2D5F3F] allura italic leading-none relative">
                    <span className="relative inline-block">
                      Africain
                      {/* Underline decoration */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent origin-center"
                      />
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Ornamental Divider */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="h-px w-32 sm:w-40 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#FF6B35]" />
                
                {/* Diamond decorations */}
                <motion.div
                  animate={{ rotate: 180 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  className="w-3 h-3 bg-[#D4AF37] rotate-45"
                  style={{ boxShadow: '0 0 20px #D4AF37' }}
                />
                <div className="w-4 h-4 bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] rounded-full"
                  style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)' }}
                />
                <motion.div
                  animate={{ rotate: -180 }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                  className="w-3 h-3 bg-[#FF6B35] rotate-45"
                  style={{ boxShadow: '0 0 20px #FF6B35' }}
                />
                
                <div className="h-px w-32 sm:w-40 bg-gradient-to-l from-transparent via-[#FF6B35] to-[#D4AF37]" />
              </motion.div>

              {/* Subtitle Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
                className="text-xl sm:text-2xl lg:text-3xl text-elegant-brown max-w-4xl mx-auto leading-relaxed cormorant italic px-4"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
              >
                Une expérience gastronomique où tradition et raffinement
                <br className="hidden sm:block" />
                se rencontrent dans une symphonie de saveurs
              </motion.p>

              {/* CTA Buttons - Enhanced */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="flex flex-col sm:flex-row gap-6 justify-center px-4 pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-12 py-6 text-lg text-white bg-gradient-to-r from-[#D4AF37] via-[#FF6B35] to-[#D4AF37] bg-size-200 rounded-full cormorant uppercase tracking-wider overflow-hidden group shadow-2xl"
                  style={{
                    backgroundSize: '200% 100%',
                    boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)'
                  }}
                  onClick={onReservationClick}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Réserver une Table
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 text-lg glass-card rounded-full text-elegant-brown cormorant uppercase tracking-wider border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] hover:bg-white/90 transition-all duration-300 shadow-xl"
                  onClick={onMenuClick}
                >
                  Découvrir le Menu
                </motion.button>
              </motion.div>

              {/* Info Bar - Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4, duration: 1 }}
                className="glass-card inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-8 py-5 rounded-full border border-[#D4AF37]/20 shadow-xl"
              >
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center group-hover:from-[#D4AF37] group-hover:to-[#FF6B35] transition-all duration-300">
                    <MapPin className="w-5 h-5 text-[#D4AF37] group-hover:text-white transition-colors" />
                  </div>
                  <span className="cormorant text-elegant-brown">Cotonou, Bénin</span>
                </div>
                
                <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
                
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center group-hover:from-[#D4AF37] group-hover:to-[#FF6B35] transition-all duration-300">
                    <Phone className="w-5 h-5 text-[#D4AF37] group-hover:text-white transition-colors" />
                  </div>
                  <span className="cormorant text-elegant-brown">+229 XX XX XX XX</span>
                </div>
                
                <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-[#D4AF37]/40 to-transparent" />
                
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center group-hover:from-[#D4AF37] group-hover:to-[#FF6B35] transition-all duration-300">
                    <Clock className="w-5 h-5 text-[#D4AF37] group-hover:text-white transition-colors" />
                  </div>
                  <span className="cormorant text-elegant-brown">Mar-Dim · 11h-23h</span>
                </div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 1 }}
                className="flex flex-col items-center gap-3 pt-8"
              >
                <span className="cormorant text-sm text-elegant-brown/70 uppercase tracking-widest">Découvrez notre univers</span>
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center"
                >
                  <ChevronDown className="w-6 h-6 text-[#D4AF37]" />
                </motion.div>
              </motion.div>
            </div>

            {/* Right Decorative Images Column */}
            <div className="hidden lg:block lg:col-span-3 space-y-8">
              {/* Image 3 */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotate: 10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.7 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -25, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#D4AF37] rounded-[2rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative w-4/5 aspect-square rounded-[2rem] overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img 
                      src={CHEF_IMAGE}
                      alt="Chef"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-[#FF6B35]/20 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Image 4 */}
              <motion.div
                initial={{ opacity: 0, x: 100, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
              >
                <motion.div
                  animate={{ 
                    y: [0, -35, 0],
                    rotate: [0, 3, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2D5F3F] to-[#FF6B35] rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="relative w-full ml-auto aspect-square rounded-[2.5rem] overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img 
                      src={HERO_IMAGE}
                      alt="Cuisine"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-[#FF6B35]/20" />
                  </div>
                  {/* Floating Icon Badge */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#2D5F3F] to-[#D4AF37] rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

          </div>

        </motion.div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
}