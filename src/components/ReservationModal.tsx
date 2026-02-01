import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, Users, Calendar, Clock, MessageSquare, Mail } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    phone: '',
    whatsapp: '',
    email: '',
    guests: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.phone) newErrors.phone = 'Le numéro de téléphone est requis';
    if (!formData.whatsapp) newErrors.whatsapp = 'Le numéro WhatsApp est requis';
    if (!formData.guests || parseInt(formData.guests) < 1) newErrors.guests = 'Le nombre de personnes est requis';
    if (!formData.date) newErrors.date = 'La date est requise';
    if (!formData.time) newErrors.time = "L'heure est requise";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Format WhatsApp message
    const message = `Bonjour, je souhaite réserver une table pour ${formData.guests} personne(s) le ${formData.date} à ${formData.time}. Téléphone: ${formData.phone}${formData.email ? `, Email: ${formData.email}` : ''}`;
    const whatsappUrl = `https://wa.me/${formData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            className="glass-card w-full max-w-2xl rounded-[2rem] lg:rounded-[3rem] border-2 border-[#D4AF37]/20 shadow-2xl overflow-hidden"
          >
            
            {/* Header */}
            <div className="relative p-8 lg:p-10 bg-gradient-to-br from-[#D4AF37]/10 to-[#FF6B35]/5 border-b border-[#D4AF37]/20">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-white/80 transition-all duration-300 flex items-center justify-center group"
              >
                <X className="w-5 h-5 text-[#D4AF37] group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FF6B35] flex items-center justify-center shadow-xl">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl allura gradient-text">Réserver une Table</h2>
                  <p className="text-sm text-elegant-brown cormorant mt-1">Garantissez votre place</p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="flex items-center gap-2 mt-6">
                <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                <div className="h-px flex-1 bg-gradient-to-l from-[#D4AF37] to-transparent" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-5">
              
              {/* Phone Number - Required */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Numéro de téléphone</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+229 XX XX XX XX"
                  className={`w-full px-6 py-4 rounded-full glass-card border ${
                    errors.phone ? 'border-red-500' : 'border-[#D4AF37]/20'
                  } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.phone}</p>
                )}
              </div>

              {/* WhatsApp - Required */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
                  <span>Numéro WhatsApp</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+229 XX XX XX XX"
                  className={`w-full px-6 py-4 rounded-full glass-card border ${
                    errors.whatsapp ? 'border-red-500' : 'border-[#D4AF37]/20'
                  } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                />
                {errors.whatsapp && (
                  <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.whatsapp}</p>
                )}
              </div>

              {/* Email - Optional */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span>Email</span>
                  <span className="text-gray-400 text-xs">(optionnel)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className="w-full px-6 py-4 rounded-full glass-card border border-[#D4AF37]/20 focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant"
                />
              </div>

              {/* Number of Guests - Required */}
              <div>
                <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>Nombre de personnes</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  placeholder="2"
                  className={`w-full px-6 py-4 rounded-full glass-card border ${
                    errors.guests ? 'border-red-500' : 'border-[#D4AF37]/20'
                  } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                />
                {errors.guests && (
                  <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.guests}</p>
                )}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span>Date</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-6 py-4 rounded-full glass-card border ${
                      errors.date ? 'border-red-500' : 'border-[#D4AF37]/20'
                    } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.date}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm cormorant text-elegant-brown mb-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Heure</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 rounded-full glass-card border ${
                      errors.time ? 'border-red-500' : 'border-[#D4AF37]/20'
                    } focus:border-[#D4AF37] outline-none transition-all duration-300 cormorant`}
                  />
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1 ml-4 cormorant">{errors.time}</p>
                  )}
                </div>
              </div>

              {/* Info Note */}
              <div className="glass-card p-4 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5">
                <p className="text-sm text-elegant-brown cormorant italic text-center">
                  Votre réservation sera confirmée via WhatsApp dans les plus brefs délais
                </p>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-5 text-lg text-white bg-gradient-to-r from-[#D4AF37] to-[#FF6B35] rounded-full cormorant uppercase tracking-wider shadow-2xl relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Confirmer via WhatsApp
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
