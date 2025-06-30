import React from 'react';
import { useSpring, animated, useSpringValue, useIsomorphicLayoutEffect } from '@react-spring/web';

// Spring-powered button component
export const SpringButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}> = ({ children, onClick, className = '', variant = 'primary' }) => {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    rotateZ: 0,
    boxShadow: variant === 'primary' 
      ? '0 4px 15px rgba(59, 130, 246, 0.3)' 
      : '0 2px 8px rgba(0, 0, 0, 0.15)',
    config: { tension: 300, friction: 10 }
  }));

  const handleMouseEnter = () => {
    api.start({ 
      scale: 1.05, 
      rotateZ: 1,
      boxShadow: variant === 'primary' 
        ? '0 8px 25px rgba(59, 130, 246, 0.4)' 
        : '0 4px 15px rgba(0, 0, 0, 0.25)'
    });
  };

  const handleMouseLeave = () => {
    api.start({ 
      scale: 1, 
      rotateZ: 0,
      boxShadow: variant === 'primary' 
        ? '0 4px 15px rgba(59, 130, 246, 0.3)' 
        : '0 2px 8px rgba(0, 0, 0, 0.15)'
    });
  };

  const handleMouseDown = () => {
    api.start({ scale: 0.95, rotateZ: -1 });
  };

  const handleMouseUp = () => {
    api.start({ scale: 1.05, rotateZ: 1 });
  };

  return (
    <animated.button
      style={springs}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </animated.button>
  );
};

// Spring-powered card component
export const SpringCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const springs = useSpring({
    from: { 
      opacity: 0, 
      transform: 'translateY(50px) rotateX(-10deg)',
      boxShadow: '0 0px 0px rgba(0, 0, 0, 0)'
    },
    to: { 
      opacity: 1, 
      transform: 'translateY(0px) rotateX(0deg)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    delay,
    config: { tension: 200, friction: 20 }
  });

  const [hoverSprings, hoverApi] = useSpring(() => ({
    scale: 1,
    rotateY: 0,
    config: { tension: 400, friction: 40 }
  }));

  return (
    <animated.div
      style={{ ...springs, ...hoverSprings }}
      className={className}
      onMouseEnter={() => hoverApi.start({ scale: 1.02, rotateY: 2 })}
      onMouseLeave={() => hoverApi.start({ scale: 1, rotateY: 0 })}
    >
      {children}
    </animated.div>
  );
};

// Floating text effect
export const FloatingText: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const y = useSpringValue(0, {
    config: { tension: 100, friction: 20 }
  });

  useIsomorphicLayoutEffect(() => {
    const loop = () => {
      y.start({
        from: y.get(),
        to: y.get() === 0 ? -10 : 0,
        loop: true,
        config: { duration: 2000 }
      });
    };
    loop();
  }, [y]);

  return (
    <animated.div
      style={{ transform: y.to(val => `translateY(${val}px)`) }}
      className={className}
    >
      {children}
    </animated.div>
  );
};

// Bouncing logo component
export const BouncingLogo: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const [springs, api] = useSpring(() => ({
    scale: 1,
    rotate: 0,
    config: { tension: 300, friction: 8 }
  }));

  const handleClick = () => {
    api.start({
      scale: [1, 1.2, 1],
      rotate: [0, 360, 720],
      config: { tension: 200, friction: 12 }
    });
  };

  return (
    <animated.div
      style={springs}
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
    </animated.div>
  );
};

// Parallax scroll component
export const ParallaxElement: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = '' }) => {
  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  useIsomorphicLayoutEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      api.start({ y: scrollY * speed });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [api, speed]);

  return (
    <animated.div
      style={{ transform: y.to(val => `translateY(${val}px)`) }}
      className={className}
    >
      {children}
    </animated.div>
  );
};