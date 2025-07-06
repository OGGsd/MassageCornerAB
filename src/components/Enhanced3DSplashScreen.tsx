import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Heart } from 'lucide-react';
import FloatingElements3D from './FloatingElements3D';

const Enhanced3DSplashScreen: React.FC = () => {
  // Spring animations for the entire splash
  const containerSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 200, friction: 20 }
  });

  const textSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 500,
    config: { tension: 300, friction: 30 }
  });

  const logoSpring = useSpring({
    from: { scale: 0, rotate: -180 },
    to: { scale: 1, rotate: 0 },
    delay: 200,
    config: { tension: 260, friction: 20 }
  });
  return (
    <animated.div 
      style={containerSpring}
      className="fixed inset-0 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 flex items-center justify-center z-50 overflow-hidden"
    >
      {/* 3D Background Elements */}
      <FloatingElements3D />

      <div className="text-center px-4 relative z-10">
        {/* Enhanced Logo with 3D effects */}
        <div className="flex items-center justify-center mb-6">
          <animated.div style={logoSpring} className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 mr-4 bg-white p-2 shadow-lg flex items-center justify-center relative overflow-hidden" style={{ borderRadius: '12px' }}>
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 opacity-20 animate-pulse"></div>
              <img 
                src="/logo.png" 
                alt="Massage Corner Logo" 
                className="w-full h-full object-contain relative z-10" 
              />
              
              {/* Orbiting ring */}
              <div className="absolute inset-0 border-2 border-white/30 animate-spin" style={{ animationDuration: '8s', borderRadius: '12px' }}></div>
            </div>
          </animated.div>
          
          <animated.div style={textSpring} className="text-left">
            <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
              MASSAGE
            </h1>
            <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
              CORNER
            </h1>
          </animated.div>
        </div>
        
        <animated.p 
          style={textSpring}
          className="text-white text-xs md:text-sm opacity-90 font-medium mb-8 text-center"
        >
          Vårda din kropp med en härlig massage
        </animated.p>

        {/* Enhanced loading animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/5 to-black/20 pointer-events-none"></div>
    </animated.div>
  );
};

export default Enhanced3DSplashScreen;