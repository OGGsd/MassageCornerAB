import React, { Suspense, lazy } from 'react';

// Lazy load Spline to reduce initial bundle size
const Spline = lazy(() => import('@splinetool/react-spline'));

// Loading component for Spline scenes
const SplineLoader: React.FC = () => (
  <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-600 to-blue-800">
    <div className="text-white text-center">
      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-sm">Loading 3D Scene...</p>
    </div>
  </div>
);

// Hero 3D Scene Component
export const HeroSplineScene: React.FC<{
  className?: string;
  sceneUrl?: string;
  fallback?: React.ReactNode;
}> = ({ 
  className = '', 
  sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode', // Example scene
  fallback
}) => {
  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={fallback || <SplineLoader />}>
        <Spline 
          scene={sceneUrl}
        />
      </Suspense>
    </div>
  );
};

// Interactive Logo 3D Component
export const InteractiveLogo3D: React.FC<{
  className?: string;
  sceneUrl?: string;
  fallback?: React.ReactNode;
}> = ({ 
  className = '',
  sceneUrl = 'https://prod.spline.design/your-logo-scene/scene.splinecode', // Replace with your scene
  fallback
}) => {
  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={fallback || 
        <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">S</span>
        </div>
      }>
        <Spline 
          scene={sceneUrl}
        />
      </Suspense>
    </div>
  );
};

// Background 3D Scene Component
export const BackgroundSplineScene: React.FC<{
  className?: string;
  sceneUrl?: string;
  fallback?: React.ReactNode;
}> = ({ 
  className = '',
  sceneUrl = 'https://prod.spline.design/background-scene/scene.splinecode', // Replace with your scene
  fallback
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Suspense fallback={fallback || <div className="w-full h-full bg-transparent"></div>}>
        <Spline 
          scene={sceneUrl}
        />
      </Suspense>
    </div>
  );
};

// Instructions component for Spline integration
export const SplineInstructions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 m-4">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🎨 Massage Corner - 3D Scener</h3>
      
      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">1. Skapa din scen</h4>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Gå till <a href="https://spline.design" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">spline.design</a></li>
            <li>Registrera dig gratis</li>
            <li>Använd 3D-editorn för fantastiska scener</li>
            <li>Lägg till animationer och effekter</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">2. Export for Web</h4>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Click "Export" in your Spline project</li>
            <li>Choose "Code Export" → "React"</li>
            <li>Copy the scene URL (ends with .splinecode)</li>
            <li>Replace the sceneUrl props in the components above</li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">3. Optimize for Performance</h4>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Keep polygon count reasonable for web</li>
            <li>Use compressed textures</li>
            <li>Test on mobile devices</li>
            <li>Consider loading states</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>💡 Pro Tip:</strong> Start with simple scenes and gradually add complexity. 
          Spline's free tier gives you everything you need for impressive 3D experiences!
        </p>
      </div>
    </div>
  );
};