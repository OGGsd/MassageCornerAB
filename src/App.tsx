import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Enhanced3DSplashScreen from './components/Enhanced3DSplashScreen';
import MassageBookingPage from './components/MassageBookingPage';
import About from './components/OmOss';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import InstallPrompt from './components/InstallPrompt';

// Initialize security helpers
import { initializeSecurity } from './utils/securityHelpers';
import './utils/pwaHelpers';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Initialize security on app start
    initializeSecurity();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <motion.div 
        className="min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <InstallPrompt />
        
        <AnimatePresence mode="wait">
          {showSplash ? (
            <Enhanced3DSplashScreen key="splash" />
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                {/* Home route - direct to booking */}
                <Route path="/" element={<MassageBookingPage />} />
                
                {/* Info pages */}
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                
                {/* Swedish routes */}
                <Route path="/integritetspolicy" element={<PrivacyPolicy />} />
                <Route path="/anvandardvillkor" element={<TermsOfService />} />
                
                {/* Legacy redirects for backwards compatibility */}
                <Route path="/location/:branch" element={<Navigate to="/" replace />} />
                <Route path="/city" element={<Navigate to="/" replace />} />
                <Route path="/asecs" element={<Navigate to="/" replace />} />
                <Route path="/om-oss" element={<Navigate to="/about" replace />} />
                
                {/* Catch all route - redirect to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Router>
  );
}

export default App;