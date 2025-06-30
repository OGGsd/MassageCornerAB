import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-blue-600 flex items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-16 w-16 h-16 bg-white/15 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [360, 180, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-12 h-12 bg-white/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      <div className="text-center px-4 relative z-10">
        {/* Logo and Brand with enhanced staggered animation */}
        <motion.div 
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="w-20 h-20 md:w-24 md:h-24 mr-4 rounded-full bg-white p-2 shadow-lg flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 4px 15px rgba(0,0,0,0.2)",
                  "0 8px 25px rgba(255,255,255,0.3)",
                  "0 4px 15px rgba(0,0,0,0.2)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Calendar size={32} className="text-blue-600" />
            </motion.div>
            {/* Rotating ring around logo */}
            <motion.div
              className="absolute inset-0 border-2 border-white/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
          
          <div className="text-left">
            <motion.h1 
              className="text-white text-xl md:text-2xl font-bold tracking-wide"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(255,255,255,0.8)"
              }}
            >
              MASSAGE
            </motion.h1>
            <motion.h1 
              className="text-white text-xl md:text-2xl font-bold tracking-wide"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(255,255,255,0.8)"
              }}
            >
              CORNER
            </motion.h1>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-white text-sm opacity-90 font-medium"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          VÅRDA DIN KROPP MED EN HÄRLIG MASSAGE
        </motion.p>

        {/* Enhanced animated loading indicator */}
        <motion.div
          className="mt-8 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;