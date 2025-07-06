import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches;
      const webkitStandalone = (window.navigator as any).standalone === true;
      setIsStandalone(standalone || webkitStandalone);
      setIsInstalled(standalone || webkitStandalone);
    };

    // Check if iOS
    const checkIOS = () => {
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
      setIsIOS(isIOSDevice);
    };

    checkInstalled();
    checkIOS();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay if not already installed
      if (!isInstalled) {
        setTimeout(() => {
          setShowPrompt(true);
        }, 10000); // Show after 10 seconds
      }
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
      console.log('PWA was installed');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error during installation:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already installed, dismissed, or no prompt available
  if (isInstalled || 
      sessionStorage.getItem('pwa-prompt-dismissed') || 
      (!deferredPrompt && !isIOS) || 
      !showPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white rounded-lg p-1 mr-3">
                  <img 
                    src="/logo.png" 
                    alt="Massage Corner" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Installera appen</h3>
                  <p className="text-xs opacity-90">Massage Corner</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-black hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start mb-4">
              {isIOS ? (
                <Smartphone size={20} className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
              ) : (
                <Download size={20} className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-gray-800 text-sm font-medium mb-2">
                  {isIOS 
                    ? 'Lägg till på hemskärmen' 
                    : 'Installera för bättre upplevelse'
                  }
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {isIOS 
                    ? 'Tryck på delningsknappen och välj "Lägg till på hemskärmen" för snabb åtkomst.'
                    : 'Få snabbare åtkomst, offline-stöd och en app-liknande upplevelse.'
                  }
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs text-gray-600">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></div>
                <span>Snabbare laddning</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></div>
                <span>Fungerar offline</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></div>
                <span>Push-notifikationer</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isIOS && deferredPrompt && (
                <motion.button
                  onClick={handleInstallClick}
                  className="flex-1 bg-emerald-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-emerald-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Installera nu
                </motion.button>
              )}
              <motion.button
                onClick={handleDismiss}
                className="px-4 py-2.5 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Senare
              </motion.button>
            </div>

            {/* iOS Instructions */}
            {isIOS && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Monitor size={16} className="text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium text-xs">iOS Installation</span>
                </div>
                <ol className="text-xs text-blue-700 space-y-1">
                  <li>1. Tryck på delningsknappen (□↗)</li>
                  <li>2. Scrolla ner och välj "Lägg till på hemskärmen"</li>
                  <li>3. Tryck "Lägg till" för att bekräfta</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;