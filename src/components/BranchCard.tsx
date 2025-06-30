import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { SpringButton } from './SpringAnimations';

interface BranchCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  logoSrc?: string;
  onClick: () => void;
}

const BranchCard: React.FC<BranchCardProps> = ({ title, subtitle, imageSrc, logoSrc, onClick }) => {
  // Spring animations for the card
  const [cardSpring, cardApi] = useSpring(() => ({
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
    config: { tension: 300, friction: 20 }
  }));

  const [backgroundSpring, backgroundApi] = useSpring(() => ({
    scale: 1,
    rotate: 0,
    config: { tension: 200, friction: 25 }
  }));

  const handleMouseEnter = () => {
    cardApi.start({ 
      scale: 1.05, 
      rotateY: 5,
      rotateX: -5,
      boxShadow: '0 25px 50px rgba(59, 130, 246, 0.4)'
    });
    backgroundApi.start({ scale: 1.1, rotate: 2 });
  };

  const handleMouseLeave = () => {
    cardApi.start({ 
      scale: 1, 
      rotateY: 0,
      rotateX: 0,
      boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
    });
    backgroundApi.start({ scale: 1, rotate: 0 });
  };

  const handleClick = () => {
    cardApi.start({
      to: async (next) => {
        await next({ scale: 1.05, rotateY: 5 });
        await next({ scale: 0.95, rotateY: -5 });
        await next({ scale: 1.05, rotateY: 5 });
      }
    });
    setTimeout(onClick, 150);
  };

  return (
    <animated.div
      style={{
        ...cardSpring,
        minHeight: '200px'
      }}
      className="relative bg-white rounded-2xl overflow-hidden border-4 border-blue-600 cursor-pointer aspect-square group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Enhanced Background Image with parallax effect */}
      <animated.div
        style={{
          ...backgroundSpring,
          backgroundImage: `url(${imageSrc})`
        }}
        className="absolute inset-0 bg-cover bg-center opacity-20"
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85" />
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center p-4 md:p-6">
        {/* Enhanced Logo with multiple animation layers */}
        <div className="mb-4 relative">
          <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 scale-150" />
          
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white p-1 shadow-md relative z-10 flex items-center justify-center">
            <span className="text-blue-600 text-xl md:text-2xl font-bold">
              {title.charAt(0)}
            </span>
          </div>
          
          {/* Orbiting ring */}
          <div 
            className="absolute inset-0 border-2 border-blue-600/30 rounded-full"
            style={{ animation: 'spin 10s linear infinite' }}
          />
        </div>
        
        {/* Enhanced Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-2 tracking-wide">
          {title}
        </h2>
        
        {/* Enhanced Subtitle */}
        <p className="text-xs md:text-sm text-gray-600 text-center font-medium">
          {subtitle}
        </p>
        
        {/* Book Button */}
        <SpringButton
          onClick={handleClick}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors duration-200"
          variant="primary"
        >
          BOKA NU
        </SpringButton>
        
        {/* Animated accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-600 to-blue-800" />
      </div>

      {/* Floating particles */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-600 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-blue-600 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-1/2 left-4 w-1 h-1 bg-blue-600 rounded-full opacity-50 animate-ping"></div>
    </animated.div>
  );
};

export default BranchCard;