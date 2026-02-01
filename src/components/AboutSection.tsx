import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Award, Heart, Users } from 'lucide-react';

const CHEF_IMAGE = 'https://images.unsplash.com/photo-1681270543584-8e541a1bb056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwY29va2luZ3xlbnwxfHx8fDE3NjUzMTMxMTR8MA&ixlib=rb-4.1.0&q=80&w=1080';

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Chaque plat est préparé avec amour et dévouement',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Des ingrédients sélectionnés pour leur qualité',
    },
    {
      icon: Users,
      title: 'Tradition',
      description: 'Un héritage culinaire transmis avec fierté',
    },
  ];

  return (
    <section id="apropos" className="relative py-20 lg:py-32 bg-white overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FAF8F3] to-white" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF8F3] to-white" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Side - Image */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Image */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="aspect-square rounded-[3rem] blob-shape overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img 
                    src={CHEF_IMAGE}
                    alt="Notre Chef"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20" />
                </motion.div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5, type: 'spring', bounce: 0.5 }}
                  className="absolute -bottom-6 -right-6 glass-card p-6 rounded-3xl shadow-2xl"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">⭐</div>
                    <div className="text-2xl gradient-text">15+</div>
                    <div className="text-sm text-elegant-brown cormorant">Années d&apos;excellence</div>
                  </div>
                </motion.div>

                {/* Decorative Blob */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37]/10 blob-shape blur-2xl -z-10" />
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
            >
              <div className="glass-card p-8 lg:p-12 rounded-[3rem]">
                
                {/* Title */}
                <h2 className="text-5xl sm:text-6xl lg:text-7xl mb-6">
                  <span className="gradient-text allura drop-shadow-lg">Notre Histoire</span>
                </h2>

                {/* Quote */}
                <div className="relative mb-6">
                  <div className="absolute -left-4 -top-2 text-6xl text-[#D4AF37]/20 allura">&ldquo;</div>
                  <p className="text-xl lg:text-2xl text-elegant-brown cormorant italic leading-relaxed pl-6">
                    Depuis sa création, La Marmite Douce incarne l&apos;excellence culinaire africaine...
                  </p>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-700 leading-relaxed mb-8 cormorant">
                  Notre chef passionné sélectionne personnellement les meilleurs ingrédients 
                  pour vous offrir une expérience inoubliable, où chaque bouchée raconte une histoire. 
                  Nous célébrons la richesse de la gastronomie africaine avec des techniques modernes 
                  et un respect profond pour la tradition.
                </p>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  <span className="text-[#D4AF37] text-sm uppercase tracking-widest cormorant">
                    Excellence & Tradition
                  </span>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 mb-3">
                        <value.icon className="w-7 h-7 text-[#D4AF37]" />
                      </div>
                      <h3 className="text-lg mb-2 text-gray-800">{value.title}</h3>
                      <p className="text-sm text-gray-600 cormorant">{value.description}</p>
                    </motion.div>
                  ))}
                </div>

              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
