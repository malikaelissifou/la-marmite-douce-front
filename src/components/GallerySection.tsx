import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

const IMAGES = [
  'https://images.unsplash.com/photo-1665332561290-cc6757172890?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZm9vZCUyMGN1aXNpbmV8ZW58MXx8fHwxNzY1MzI4MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1756397481872-ed981ef72a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc2NTMwODI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1681270543584-8e541a1bb056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZ3xlbnwxfHx8fDE3NjUzMTMxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1761095596755-99ba58997720?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwcGxhdGluZyUyMGZvb2R8ZW58MXx8fHwxNzY1MzI4MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function GallerySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="galerie" className="relative py-20 lg:py-32 gradient-bg overflow-hidden">
      
      {/* Decorative Blob */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#2D5F3F]/10 blob-shape blur-3xl" />

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
              <span className="gradient-text allura drop-shadow-2xl">Notre</span>
              <br />
              <span className="text-[#2D5F3F] allura italic">Galerie</span>
            </h2>
            <p className="text-xl text-elegant-brown cormorant">Découvrez notre univers en images</p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className="relative aspect-square group cursor-pointer"
              >
                <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white/50">
                  <img 
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="glass-card px-6 py-3 rounded-full">
                      <span className="text-white cormorant">Voir plus</span>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Instagram Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-12 lg:mt-16"
          >
            <p className="text-elegant-brown cormorant mb-4">Suivez-nous sur Instagram</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass-card rounded-full text-[#D4AF37] cormorant uppercase tracking-wider border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300"
            >
              @lamarmitedouce
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
