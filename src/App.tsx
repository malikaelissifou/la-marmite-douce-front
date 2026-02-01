import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MenuModal } from './components/MenuModal';
import { ReservationModal } from './components/ReservationModal';
import { OrderModal } from './components/OrderModal';

export default function App() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);

  const handleMenuClick = () => {
    setIsMenuModalOpen(true);
  };

  const handleReservationClick = () => {
    setIsReservationModalOpen(true);
  };

  const handleOrderClick = (item?: any) => {
    setSelectedMenuItem(item);
    setIsOrderModalOpen(true);
    setIsMenuModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar onMenuClick={handleMenuClick} onReservationClick={handleReservationClick} />
      <Hero onMenuClick={handleMenuClick} onReservationClick={handleReservationClick} />
      <MenuSection onMenuClick={handleMenuClick} />
      <AboutSection />
      <GallerySection />
      <ContactSection onReservationClick={handleReservationClick} />
      <Footer />
      
      {/* Modals */}
      <MenuModal 
        isOpen={isMenuModalOpen} 
        onClose={() => setIsMenuModalOpen(false)}
        onOrderClick={handleOrderClick}
      />
      <ReservationModal 
        isOpen={isReservationModalOpen} 
        onClose={() => setIsReservationModalOpen(false)}
      />
      <OrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)}
        selectedItem={selectedMenuItem}
      />
    </div>
  );
}