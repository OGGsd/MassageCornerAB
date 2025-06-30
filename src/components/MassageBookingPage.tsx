import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp, Heart, Space as Spa } from 'lucide-react';
import BookingIframe from './BookingIframe';
import BottomNavigation from './BottomNavigation';
import InfoView from './InfoView';

interface MassageService {
  name: string;
  duration: string;
  price: string;
  bookingUrl: string;
}

interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  services: MassageService[];
}

const MassageBookingPage: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<MassageService | null>(null);
  const [activeTab, setActiveTab] = useState<'boka' | 'info'>(() => {
    // Check URL parameters to set initial tab
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    return tabParam === 'info' ? 'info' : 'boka';
  });

  // Update tab based on URL changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'info' && activeTab !== 'info') {
      setActiveTab('info');
    } else if (!tabParam && activeTab !== 'boka') {
      setActiveTab('boka');
    }
  }, [window.location.search, activeTab]);

  // Listen for forced tab changes from navigation
  useEffect(() => {
    const handleForceTabChange = (event: CustomEvent) => {
      if (event.detail === 'info') {
        setActiveTab('info');
      } else if (event.detail === 'boka') {
        setActiveTab('boka');
      }
    };

    window.addEventListener('forceTabChange', handleForceTabChange as EventListener);
    return () => window.removeEventListener('forceTabChange', handleForceTabChange as EventListener);
  }, []);

  // Massage service categories with real data
  const serviceCategories: ServiceCategory[] = [
    {
      title: "Medicinsk Massage",
      icon: <Heart size={20} className="text-red-500" />,
      services: [
        { 
          name: "Medicinsk massage (Ultraljudbehandling vid behov) – 50 min", 
          duration: "50 min", 
          price: "850 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/medicinsk-massage-ultraljudbehandling-ingar-vid-behov-50min-2175482"
        },
        { 
          name: "Individanpassad fysioterapi massage", 
          duration: "70 min", 
          price: "995 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/individ-anpassad-fysioterapi-massage-3281323"
        },
        { 
          name: "Medicinsk massage – 60 min", 
          duration: "60 min", 
          price: "950 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/medicinsk-massage-ultraljudbehandling-ingar-vid-behov-60-min-2126172"
        },
        { 
          name: "Medicinsk massage – 90 min", 
          duration: "90 min", 
          price: "1 395 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/medicinsk-massage-ultraljudbehandling-ingar-vid-behov-90-min-3012113"
        },
        { 
          name: "Ultraljudbehandling", 
          duration: "30 min", 
          price: "625 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/ultraljudbehandling-3104979"
        },
        { 
          name: "5 x Ultraljudbehandling (30 min) – 10 % rabatt", 
          duration: "5 x 30 min", 
          price: "2 800 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/5-ganger-x-30-min-ultraljudbehandling-och-fa-10--3104981"
        }
      ]
    },
    {
      title: "Klassisk Massage",
      icon: <Spa size={20} className="text-emerald-500" />,
      services: [
        { 
          name: "Djupgående klassisk massage – 30 min", 
          duration: "30 min", 
          price: "595 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/djupgaende-klassisk-massage-30-min-1170814"
        },
        { 
          name: "Djupgående klassisk massage – 50 min", 
          duration: "50 min", 
          price: "695 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/djupgaende-klassisk-massage-50-min-1708402"
        },
        { 
          name: "Djupgående klassisk massage – 60 min", 
          duration: "60 min", 
          price: "795 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/djupgaende-klassisk-massage-60-min-1170816"
        },
        { 
          name: "Djupgående klassisk massage – 90 min", 
          duration: "90 min", 
          price: "1 295 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/djupgaende-klassisk-massage-90-min-1320692"
        },
        { 
          name: "Ben och fotmassage – 60 min", 
          duration: "60 min", 
          price: "795 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/ben-och-fotmassage-60-min-2197773"
        },
        { 
          name: "Ben och fotmassage (utökad) – 90 min", 
          duration: "90 min", 
          price: "1 295 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/ben-och-fotmassage-utokad-90-min-2197775"
        },
        { 
          name: "5 x 30 min – Djupgående massage – 10 % rabatt", 
          duration: "5 x 30 min", 
          price: "2 670 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/5-ganger-30-min-djupgaende-klassisk-massage-och-fa-10-rabatt-3110533"
        },
        { 
          name: "5 x 60 min – Djupgående massage – 10 % rabatt", 
          duration: "5 x 60 min", 
          price: "3 570 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/5-ganger-60-min-djupgaende-klassisk-massage-och-fa-10-rabatt-3096289"
        }
      ]
    },
    {
      title: "Avslappningsmassage",
      icon: <Heart size={20} className="text-purple-500" />,
      services: [
        { 
          name: "Avslappningmassage – 30 min", 
          duration: "30 min", 
          price: "595 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/avslappningmassage-30-min-1578387"
        },
        { 
          name: "Avslappningsmassage – 50 min", 
          duration: "50 min", 
          price: "695 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/avslappningsmassage-50-min-1567777"
        },
        { 
          name: "Avslappningsmassage – 60 min", 
          duration: "60 min", 
          price: "795 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/avslappningsmassage-60-min-1356710"
        },
        { 
          name: "Avslappningsmassage – 90 min", 
          duration: "90 min", 
          price: "1 295 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/avslappningsmassage-90-min-1356711"
        }
      ]
    },
    {
      title: "Koppningsmassage",
      icon: <Spa size={20} className="text-orange-500" />,
      services: [
        { 
          name: "Dynamisk koppningsmassage – 30 min", 
          duration: "30 min", 
          price: "595 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/dynamisk-koppnings-massage-30-min-1170838"
        },
        { 
          name: "Dynamisk koppningsmassage – 60 min", 
          duration: "60 min", 
          price: "795 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/dynamisk-koppningsmasssage-60-min-1362068"
        },
        { 
          name: "Statisk koppningsmassage – 30 min", 
          duration: "30 min", 
          price: "595 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/statisk-koppningsmassage-30-min-1362074"
        },
        { 
          name: "Statisk koppningsmassage – 60 min", 
          duration: "60 min", 
          price: "795 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/statisk-koppningsmassage-60-min-1362075"
        }
      ]
    },
    {
      title: "Specialbehandlingar",
      icon: <Spa size={20} className="text-blue-500" />,
      services: [
        { 
          name: "Lymfdränagemassage – 40 min", 
          duration: "40 min", 
          price: "595 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/lymfdranagemassage-40-min-1982428"
        },
        { 
          name: "Lymfdränagemassage – 60 min", 
          duration: "60 min", 
          price: "725 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/lymfdranagemassage-60-min-1866862"
        },
        { 
          name: "Kombinera din massage – 60 min", 
          duration: "60 min", 
          price: "895 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/kombinera-din-massage-i-60-minuter-3085456"
        },
        { 
          name: "Cervical traction – 30 min", 
          duration: "30 min", 
          price: "575 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/cervical-traction-nackmassage-heatvibe-1958749"
        },
        { 
          name: "Cervical traction – 50 min", 
          duration: "50 min", 
          price: "675 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/cervical-traction-nackmassage-heatvibe-50-min-3114956"
        },
        { 
          name: "Ansiktsmassage – 50 min", 
          duration: "50 min", 
          price: "695 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/ansiktsmassage-50-min-1646505"
        },
        { 
          name: "Ansiktsmassage – 60 min", 
          duration: "60 min", 
          price: "795 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/ansiktsmassage-60-min-1988505"
        },
        { 
          name: "Honungsmassage – 60 min", 
          duration: "60 min", 
          price: "825 kr",
          bookingUrl: "https://www.bokadirekt.se/boka-tjanst/massage-corner-sverige-ab-36697/honungs-massage-60-min-1591015"
        }
      ]
    }
  ];

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategory(expandedCategory === categoryTitle ? null : categoryTitle);
  };

  const handleBookingClick = (service: MassageService) => {
    setSelectedService(service);
  };

  const closeBookingIframe = () => {
    setSelectedService(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const serviceVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  if (activeTab === 'info') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 pb-20 overflow-y-auto">
          <InfoView />
        </div>
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      </div>
    );
  }

  return (
    <>
      <motion.div 
        className="min-h-screen bg-gray-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white py-4 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-center">
            <div className="w-8 h-8 mr-3 bg-white p-1 flex items-center justify-center" style={{ borderRadius: '4px' }}>
              <img 
                src="/logo.png" 
                alt="Massage Corner Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-center">
              Massage Corner Sverige AB
            </h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 pb-20 overflow-y-auto">
          <motion.div 
            className="p-4 max-w-4xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Welcome Message */}
            <motion.div 
              className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100"
              variants={categoryVariants}
            >
              <div className="text-center">
                <h2 className="text-lg font-bold text-emerald-800 mb-2">
                  Vårda din kropp med en härlig massage
                </h2>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  Oavsett vad du behöver kommer du att bli väl omhändertagen. 
                  Välj mellan massage på utvalda delar eller helkroppsmassage.
                </p>
              </div>
            </motion.div>

            {/* Service Categories */}
            <div className="space-y-3">
              {serviceCategories.map((category, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                  variants={categoryVariants}
                  whileHover={{ 
                    scale: 1.01,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Category Header */}
                  <motion.button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        {category.icon}
                      </div>
                      <div className="text-left">
                        <h4 className="text-base font-bold text-gray-800">
                          {category.title}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {category.services.length} behandling{category.services.length > 1 ? 'ar' : ''}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCategory === category.title ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {expandedCategory === category.title ? (
                        <ChevronUp size={20} className="text-emerald-600" />
                      ) : (
                        <ChevronDown size={20} className="text-emerald-600" />
                      )}
                    </motion.div>
                  </motion.button>

                  {/* Services List */}
                  <AnimatePresence>
                    {expandedCategory === category.title && (
                      <motion.div 
                        className="border-t border-gray-100 bg-gray-50"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.05
                              }
                            }
                          }}
                        >
                          {category.services.map((service, serviceIndex) => (
                            <motion.div 
                              key={serviceIndex} 
                              className="p-4 border-b border-gray-200 last:border-b-0 bg-white mx-2 mb-2 last:mb-0 rounded-lg shadow-sm"
                              variants={serviceVariants}
                              whileHover={{ 
                                scale: 1.02,
                                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.1)"
                              }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                              <div className="flex justify-between items-start mb-3">
                                <h5 className="font-semibold text-gray-800 text-sm leading-tight flex-1 mr-3">
                                  {service.name}
                                </h5>
                                <div className="text-right flex-shrink-0">
                                  <div className="font-bold text-emerald-600 text-sm">
                                    {service.price}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-gray-600">
                                  <Clock size={12} className="mr-1" />
                                  <span className="text-xs">{service.duration}</span>
                                </div>
                                <motion.button 
                                  onClick={() => handleBookingClick(service)}
                                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors duration-200 shadow-md"
                                  whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)"
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                  BOKA
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />
      </motion.div>

      {/* Booking Iframe Modal */}
      <AnimatePresence>
        {selectedService && (
          <BookingIframe
            bookingUrl={selectedService.bookingUrl}
            serviceName={selectedService.name}
            onClose={closeBookingIframe}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MassageBookingPage;