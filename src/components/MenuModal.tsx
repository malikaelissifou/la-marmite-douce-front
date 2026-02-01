import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Filter, ShoppingCart, Plus, Minus, Flame, Star, Sparkles } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badges?: ('nouveau' | 'populaire' | 'chef' | 'epice')[];
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderClick: (item: MenuItem) => void;
}

const MENU_ITEMS: MenuItem[] = [
  // Plats Signature
  {
    id: '1',
    name: 'Poulet Yassa',
    description: 'Poulet mariné aux oignons caramélisés, citron et épices douces, servi avec du riz parfumé',
    price: 12500,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
    badges: ['chef', 'populaire']
  },
  {
    id: '2',
    name: 'Tiep Bou Dien',
    description: 'Riz au poisson fumé, légumes variés et sauce tomate épicée - Le plat national du Sénégal',
    price: 15000,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1761095596755-99ba58997720?w=500',
    badges: ['chef', 'epice']
  },
  {
    id: '3',
    name: 'Mafé d\'Agneau',
    description: 'Agneau tendre dans une sauce onctueuse aux arachides, accompagné de riz blanc',
    price: 14000,
    category: 'signature',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
    badges: ['populaire']
  },
  
  // Plats Principaux
  {
    id: '4',
    name: 'Sauce Graine',
    description: 'Sauce aux graines de palme avec viande de bœuf, servie avec pâte ou riz',
    price: 10000,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
    badges: ['populaire', 'epice']
  },
  {
    id: '5',
    name: 'Attiéké Poisson',
    description: 'Semoule de manioc avec poisson braisé et sauce pimentée aux oignons',
    price: 9500,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1761095596755-99ba58997720?w=500',
    badges: ['populaire']
  },
  {
    id: '6',
    name: 'Kedjenou de Poulet',
    description: 'Poulet mijoté aux légumes et épices dans une cocotte traditionnelle',
    price: 11000,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
    badges: ['nouveau']
  },
  {
    id: '7',
    name: 'Garba',
    description: 'Attiéké avec thon frit, oignons et piment - Spécialité de rue revisitée',
    price: 8000,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1761095596755-99ba58997720?w=500',
    badges: ['nouveau', 'epice']
  },
  
  // Accompagnements
  {
    id: '8',
    name: 'Alloco',
    description: 'Bananes plantains frites dorées, servies avec sauce pimentée',
    price: 3500,
    category: 'accompagnements',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
    badges: ['populaire']
  },
  {
    id: '9',
    name: 'Ablo',
    description: 'Pain de maïs vapeur moelleux, accompagnement parfait pour les sauces',
    price: 2500,
    category: 'accompagnements',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
  },
  {
    id: '10',
    name: 'Foufou',
    description: 'Pâte d\'igname pilée, texture onctueuse et goût subtil',
    price: 3000,
    category: 'accompagnements',
    image: 'https://images.unsplash.com/photo-1761095596755-99ba58997720?w=500',
  },
  
  // Desserts
  {
    id: '11',
    name: 'Dégué',
    description: 'Dessert onctueux au yaourt, couscous de mil et vanille',
    price: 4000,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
    badges: ['populaire']
  },
  {
    id: '12',
    name: 'Thiakry',
    description: 'Couscous de mil sucré au lait caillé, raisins secs et noix de coco',
    price: 3500,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1761095596755-99ba58997720?w=500',
  },
  
  // Boissons
  {
    id: '13',
    name: 'Bissap',
    description: 'Boisson d\'hibiscus rafraîchissante, légèrement sucrée',
    price: 2000,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
    badges: ['populaire']
  },
  {
    id: '14',
    name: 'Gnamakoudji',
    description: 'Jus de gingembre épicé, boisson traditionnelle énergisante',
    price: 2000,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1761095596755-99ba58997720?w=500',
    badges: ['epice']
  },
  {
    id: '15',
    name: 'Jus de Bouye',
    description: 'Jus de fruit du baobab, riche et crémeux',
    price: 2500,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1665332561290-cc6757172890?w=500',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'Tout', icon: Filter },
  { id: 'signature', label: 'Signature', icon: Star },
  { id: 'plats', label: 'Plats Principaux', icon: Sparkles },
  { id: 'accompagnements', label: 'Accompagnements', icon: Plus },
  { id: 'desserts', label: 'Desserts', icon: Star },
  { id: 'boissons', label: 'Boissons', icon: Sparkles },
];

export function MenuModal({ isOpen, onClose, onOrderClick }: MenuModalProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, qty]) => {
      const item = MENU_ITEMS.find(i => i.id === itemId);
      return sum + (item?.price || 0) * qty;
    }, 0);
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'chef': return <Star className="w-3 h-3" />;
      case 'epice': return <Flame className="w-3 h-3" />;
      case 'populaire': return <Sparkles className="w-3 h-3" />;
      case 'nouveau': return <Plus className="w-3 h-3" />;
      default: return null;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'chef': return 'from-[#D4AF37] to-[#FF6B35]';
      case 'epice': return 'from-red-500 to-orange-500';
      case 'populaire': return 'from-purple-500 to-pink-500';
      case 'nouveau': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-7xl max-h-[90vh] rounded-[2rem] lg:rounded-[3rem] border-2 border-[#D4AF37]/20 shadow-2xl flex flex-col"
          >
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 lg:p-8 border-b border-[#D4AF37]/20">
              <div>
                <h2 className="text-3xl lg:text-4xl allura gradient-text">Notre Menu</h2>
                <p className="text-sm text-elegant-brown cormorant mt-1">Découvrez nos spécialités</p>
              </div>
              
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full glass-card border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-white/80 transition-all duration-300 flex items-center justify-center group"
              >
                <X className="w-6 h-6 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Search & Categories */}
            <div className="p-4 lg:p-6 border-b border-[#D4AF37]/10 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]" />
                <input
                  type="text"
                  placeholder="Rechercher un plat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full glass-card border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full cormorant text-sm flex items-center gap-2 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] text-white shadow-lg'
                        : 'glass-card text-elegant-brown hover:border-[#D4AF37] border border-transparent'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      {item.badges && item.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          {item.badges.map((badge) => (
                            <div
                              key={badge}
                              className={`px-3 py-1 rounded-full bg-gradient-to-r ${getBadgeColor(badge)} text-white text-xs flex items-center gap-1 shadow-lg`}
                            >
                              {getBadgeIcon(badge)}
                              <span className="capitalize">{badge === 'chef' ? "Chef's Choice" : badge}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Cart Badge */}
                      {cart[item.id] && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center shadow-lg">
                          <span>{cart[item.id]}</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg text-gray-800">{item.name}</h3>
                        <span className="text-lg gradient-text whitespace-nowrap ml-2">
                          {item.price.toLocaleString()} F
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 cormorant leading-relaxed mb-4 flex-1">
                        {item.description}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {cart[item.id] ? (
                          <div className="flex items-center gap-2 flex-1">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center hover:from-[#D4AF37] hover:to-[#FF6B35] group transition-all duration-300"
                            >
                              <Minus className="w-4 h-4 text-[#D4AF37] group-hover:text-white" />
                            </button>
                            <span className="flex-1 text-center cormorant">{cart[item.id]}</span>
                            <button
                              onClick={() => addToCart(item.id)}
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 flex items-center justify-center hover:from-[#D4AF37] hover:to-[#FF6B35] group transition-all duration-300"
                            >
                              <Plus className="w-4 h-4 text-[#D4AF37] group-hover:text-white" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(item.id)}
                            className="flex-1 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#FF6B35]/20 text-[#D4AF37] hover:from-[#D4AF37] hover:to-[#FF6B35] hover:text-white transition-all duration-300 cormorant text-sm"
                          >
                            Ajouter
                          </button>
                        )}
                        <button
                          onClick={() => {
                            addToCart(item.id);
                            onOrderClick(item);
                          }}
                          className="px-4 py-2 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 cormorant text-sm whitespace-nowrap"
                        >
                          Commander
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-elegant-brown cormorant text-xl">Aucun plat trouvé</p>
                </div>
              )}
            </div>

            {/* Footer / Cart Summary */}
            {getTotalItems() > 0 && (
              <div className="p-4 lg:p-6 border-t border-[#D4AF37]/20 bg-gradient-to-r from-[#FAF8F3] to-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] flex items-center justify-center text-white shadow-lg">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 cormorant">Panier ({getTotalItems()} articles)</p>
                      <p className="text-2xl gradient-text">{getTotalPrice().toLocaleString()} F</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      // Open order modal with cart items
                      const firstItem = MENU_ITEMS.find(item => cart[item.id]);
                      if (firstItem) onOrderClick(firstItem);
                    }}
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] text-white cormorant uppercase tracking-wider hover:shadow-2xl transition-all duration-300"
                  >
                    Valider la Commande
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
