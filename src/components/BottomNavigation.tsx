import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Info, Heart } from 'lucide-react';

interface BottomNavigationProps {
  activeTab?: 'boka' | 'info';
  onTabChange?: (tab: 'boka' | 'info') => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current page
  const isAboutPage = location.pathname === '/about';
  const isHomePage = location.pathname === '/';

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('About clicked'); // Debug log
    navigate('/about');
    setTimeout(scrollToTop, 100);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Book clicked, isHomePage:', isHomePage, 'activeTab:', activeTab); // Debug log
    if (isHomePage) {
      if (onTabChange) {
        onTabChange('boka');
      }
      scrollToTop();
    } else {
      navigate('/', { replace: true });
      setTimeout(() => {
        scrollToTop();
        // Force tab change after navigation
        if (onTabChange) {
          onTabChange('boka');
        }
        window.dispatchEvent(new CustomEvent('forceTabChange', { detail: 'boka' }));
      }, 50);
    }
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Info clicked, isHomePage:', isHomePage, 'activeTab:', activeTab); // Debug log
    if (isHomePage) {
      if (onTabChange) {
        onTabChange('info');
      }
      scrollToTop();
    } else {
      navigate('/?tab=info', { replace: true });
      setTimeout(() => {
        scrollToTop();
        // Force tab change after navigation
        if (onTabChange) {
          onTabChange('info');
        }
        window.dispatchEvent(new CustomEvent('forceTabChange', { detail: 'info' }));
      }, 50);
    }
  };

  // Animation variants
  const navItemVariants = {
    inactive: { 
      scale: 1,
      y: 0,
      color: "#6b7280"
    },
    active: { 
      scale: 1.1,
      y: -2,
      color: "#059669",
      transition: {
        duration: 0.15,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 bottom-navigation"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      <div className="flex max-w-4xl mx-auto">
        {/* About */}
        <motion.button
          onClick={handleAboutClick}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-150 cursor-pointer select-none ${
            isAboutPage 
              ? 'text-emerald-600 bg-emerald-50 border-t-2 border-emerald-600' 
              : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
          }`}
          style={{ 
            minHeight: '64px', 
            minWidth: '48px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
          variants={navItemVariants}
          animate={isAboutPage ? "active" : "inactive"}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
          >
            <Users size={22} className="mb-1 pointer-events-none" />
          </motion.div>
          <span className="text-xs font-medium pointer-events-none">Om oss</span>
          
          <AnimatePresence>
            {isAboutPage && (
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 32, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Book */}
        <motion.button
          onClick={handleBookClick}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-150 cursor-pointer select-none ${
            (isHomePage && activeTab === 'boka')
              ? 'text-emerald-600 bg-emerald-50 border-t-2 border-emerald-600' 
              : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
          }`}
          style={{ 
            minHeight: '64px', 
            minWidth: '48px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
          variants={navItemVariants}
          animate={isHomePage && activeTab === 'boka' ? "active" : "inactive"}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
          >
            <Heart size={22} className="mb-1 pointer-events-none" />
          </motion.div>
          <span className="text-xs font-medium pointer-events-none">Boka</span>
          
          <AnimatePresence>
            {isHomePage && activeTab === 'boka' && (
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 32, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Info */}
        <motion.button
          onClick={handleInfoClick}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-150 cursor-pointer select-none ${
            (isHomePage && activeTab === 'info')
              ? 'text-emerald-600 bg-emerald-50 border-t-2 border-emerald-600' 
              : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
          }`}
          style={{ 
            minHeight: '64px', 
            minWidth: '48px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation'
          }}
          variants={navItemVariants}
          animate={isHomePage && activeTab === 'info' ? "active" : "inactive"}
          whileTap={{ scale: 0.95 }}
          type="button"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
          >
            <Info size={22} className="mb-1 pointer-events-none" />
          </motion.div>
          <span className="text-xs font-medium pointer-events-none">Info</span>
          
          <AnimatePresence>
            {isHomePage && activeTab === 'info' && (
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-emerald-600 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 32, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default BottomNavigation;