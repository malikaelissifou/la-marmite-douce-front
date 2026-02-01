import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MapPin, Navigation, Package, User } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem?: MenuItem;
}

export function OrderModal({ isOpen, onClose, selectedItem }: OrderModalProps) {
  const [formData, setFormData] = useState({
    customerPhone: '',
    recipientPhone: '',
    address: '',
    selectedMeal: selectedItem?.name || '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  // Simulated menu items for dropdown
  const menuItems = [
    'Poulet Yassa',
    'Tiep Bou Dien',
    "Mafé d'Agneau",
    'Sauce Graine',
    'Attiéké Poisson',
    'Kedjenou de Poulet',
    'Garba',
    'Alloco',
    'Ablo',
    'Foufou',
    'Dégué',
    'Thiakry',
    'Bissap',
    'Gnamakoudji',
    'Jus de Bouye',
  ];

  const handleGetLocation = () => {
    setIsGettingLocation(true);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Format location as address
          const locationString = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
          setFormData(prev => ({ ...prev, address: locationString }));
          setIsGettingLocation(false);
          
          // Clear address error if exists
          if (errors.address) {
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.address;
              return newErrors;
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Impossible d\'obtenir votre position. Veuillez entrer votre adresse manuellement.');
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur');
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.customerPhone) newErrors.customerPhone = 'Votre numéro est requis';
    if (!formData.recipientPhone) newErrors.recipientPhone = 'Le numéro du destinataire est requis';
    if (!formData.address) newErrors.address = 'L\'adresse de livraison est requise';
    if (!formData.selectedMeal) newErrors.selectedMeal = 'Veuillez sélectionner un repas';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format WhatsApp message
    const message = `Nouvelle commande:
Repas: ${formData.selectedMeal}
Client: ${formData.customerPhone}
Destinataire: ${formData.recipientPhone}
Adresse de livraison: ${formData.address}`;
    
    const restaurantWhatsApp = '22900000000'; // Replace with actual restaurant WhatsApp
    const whatsappUrl = `https://wa.me/${restaurantWhatsApp}?text=${encodeURIComponent(message)}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] lg:rounded-[3rem] border-2 border-[#D4AF37]/20 shadow-2xl"
          >
            
            {/* Header */}
            <div className="sticky top-0 z-10 p-8 lg:p-10 bg-gradient-to-br from-[#FF6B35]/10 to-[#D4AF37]/5 border-b border-[#D4AF37]/20 backdrop-blur-xl">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-white/80 transition-all duration-300 flex items-center justify-center group"
              >
                <X className="w-5 h-5 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#D4AF37] flex items-center justify-center shadow-xl">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl allura gradient-text">Passer une Commande</h2>
                  <p className="text-sm text-elegant-brown cormorant mt-1">Livraison à domicile</p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="flex items-center gap-2 mt-6">
                <div className="h-px flex-1 bg-gradient-to-r from-[#FF6B35] to-transparent" />
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full" />
                <div className="h-px flex-1 bg-gradient-to-l from-[#FF6B35] to-transparent" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-5">
              
              {/* Selected Meal */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <Package className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sélectionner un repas</span>
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="selectedMeal"
                  value={formData.selectedMeal}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-full glass-card border ${
                    errors.selectedMeal ? 'border-red-500' : 'border-[#D4AF37]/20'
                  } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant appearance-none cursor-pointer`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D4AF37'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1.5rem center',
                    backgroundSize: '1.5em 1.5em',
                  }}
                >
                  <option value="">Choisir un plat...</option>
                  {menuItems.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.selectedMeal && (
                  <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.selectedMeal}</p>
                )}
              </div>

              {/* Customer Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <User className="w-4 h-4 text-[#D4AF37]" />
                  <span>Votre numéro de téléphone</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="+229 XX XX XX XX"
                  className={`w-full px-6 py-4 rounded-full glass-card border ${
                    errors.customerPhone ? 'border-red-500' : 'border-[#D4AF37]/20'
                  } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                />
                {errors.customerPhone && (
                  <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.customerPhone}</p>
                )}
              </div>

              {/* Recipient Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Numéro du destinataire</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  placeholder="+229 XX XX XX XX"
                  className={`w-full px-6 py-4 rounded-full glass-card border ${
                    errors.recipientPhone ? 'border-red-500' : 'border-[#D4AF37]/20'
                  } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                />
                {errors.recipientPhone && (
                  <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.recipientPhone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Adresse de livraison</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Quartier, rue, indication..."
                    className={`w-full px-6 py-4 pr-14 rounded-full glass-card border ${
                      errors.address ? 'border-red-500' : 'border-[#D4AF37]/20'
                    } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#FF6B35]/20 hover:from-[#D4AF37] hover:to-[#FF6B35] flex items-center justify-center group transition-all duration-300 disabled:opacity-50"
                    title="Obtenir ma position"
                  >
                    <Navigation className={`w-5 h-5 text-[#D4AF37] group-hover:text-white transition-colors ${isGettingLocation ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.address}</p>
                )}
                <p className="text-xs text-gray-500 mt-2 ml-4 cormorant italic">
                  Cliquez sur l&apos;icône de navigation pour utiliser votre position actuelle
                </p>
              </div>

              {/* Info Note */}
              <div className="glass-card p-4 rounded-2xl border border-[#FF6B35]/20 bg-[#FF6B35]/5">
                <p className="text-sm text-elegant-brown cormorant italic text-center">
                  Votre commande sera confirmée via WhatsApp. Des frais de livraison peuvent s&apos;appliquer selon votre zone.
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-5 text-lg text-white bg-gradient-to-r from-[#FF6B35] to-[#D4AF37] rounded-full cormorant uppercase tracking-wider shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Package className="w-5 h-5" />
                  Confirmer la Commande
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  initial={{ scale: 0, borderRadius: '50%' }}
                  whileHover={{ scale: 2 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
