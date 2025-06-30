import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, Award, Calendar, Shield, FileText, Star, MapPin } from 'lucide-react';
import BottomNavigation from './BottomNavigation';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content Area - Proper spacing for bottom nav */}
      <div className="flex-1 pb-20 overflow-y-auto">
        <div className="p-4 max-w-4xl mx-auto space-y-6">
          
          {/* Header section */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 mr-3 bg-white p-2 shadow-lg flex items-center justify-center" style={{ borderRadius: '8px' }}>
                <img 
                  src="/logo.png" 
                  alt="Massage Corner Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="text-left">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  MASSAGE CORNER
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  SVERIGE AB
                </p>
              </div>
            </div>
          </div>

          {/* Olga Gustafson - Featured Professional */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-lg p-6 border border-emerald-200">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Heart size={20} className="text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-emerald-800">Vår Diplomerade Massör</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-emerald-200 flex-shrink-0 overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
                  <img 
                    src="/Olga.png" 
                    alt="Olga Gustafson - Diplomerad Massör" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full flex items-center justify-center">
                    <div className="text-emerald-700 text-2xl font-bold">OG</div>
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-3">
                    <h4 className="text-xl font-bold text-gray-800">Olga Gustafson</h4>
                    <div className="flex items-center justify-center md:justify-start gap-1">
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} size={16} className="text-yellow-400 fill-current" />
                        ))}
                        <Star size={16} className="text-yellow-400 fill-current opacity-70" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 ml-1">4.7</span>
                    </div>
                  </div>
                  
                  <p className="text-emerald-700 font-medium text-sm mb-3">
                    Diplomerad Massör
                  </p>
                  
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>
                      Olga är vår erfarna och diplomerade massör med gedigen utbildning inom 
                      medicinsk massage och olika massagetekniker. Med hennes professionella 
                      approach och omsorgsfulla behandling får du den bästa möjliga vården.
                    </p>
                    <p>
                      Specialiserad inom klassisk massage, djupmassage, avslappningsmassage, 
                      triggerpunktbehandling och stretching. Olga anpassar alltid behandlingen 
                      efter dina individuella behov.
                    </p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                      Medicinsk massage
                    </span>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-medium">
                      Klassisk massage
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      Avslappningsmassage
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                      Triggerpunkter
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Story */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Calendar size={20} className="text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">Vår historia</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
              Massage Corner Sverige AB grundades med visionen att erbjuda professionell och avkopplande massage 
              i hjärtat av Jönköping. Med Olga Gustafson som vår diplomerade massör har vi byggt upp en trygg 
              och välkomnande miljö där våra kunder kan koppla av och få den behandling de behöver.
            </p>
          </div>

          {/* Our Philosophy */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Heart size={20} className="text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">Vår filosofi</h3>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
              <p>
                På Massage Corner tror vi på kroppens naturliga förmåga att läka och återhämta sig. 
                Vår approach är holistisk – vi ser till hela människan, inte bara problemområdet.
              </p>
              
              <div className="border-l-4 border-emerald-600 pl-4 py-2 bg-emerald-50 rounded-r-lg italic">
                "Vi skapar en plats där kunder kan kliva in genom våra dörrar och lämna sina dagliga bekymmer bakom sig, 
                sitta en stund och få professionell behandling utförd enligt deras egna önskemål och krav."
              </div>
              
              <p>
                Varje behandling anpassas individuellt efter dina behov. Oavsett om du söker smärtlindring, 
                stresshantering eller bara vill unna dig en stund av avkoppling, finns vi här för dig.
              </p>
              
              <div className="text-center py-4">
                <p className="text-lg font-bold text-emerald-600 italic">
                  – Professionell men inte exklusiv –
                </p>
              </div>
            </div>
          </div>

          {/* Professional Credentials */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Award size={20} className="text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">Professionell Kvalifikation</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Award size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Diplomerad Massör</h4>
                    <p className="text-xs text-gray-600">Certifierad utbildning inom massage och anatomi</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Heart size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Medicinsk Massage</h4>
                    <p className="text-xs text-gray-600">Specialistutbildning inom behandling av skador</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Kundbetyg 4.7/5</h4>
                    <p className="text-xs text-gray-600">Baserat på kundrecensioner och feedback</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Lokal Expertis</h4>
                    <p className="text-xs text-gray-600">Djup kunskap om kunders behov i Jönköping</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Månggårig Erfarenhet</h4>
                    <p className="text-xs text-gray-600">Flera års praktisk erfarenhet inom massageterapi</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Star size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">Kontinuerlig Utbildning</h4>
                    <p className="text-xs text-gray-600">Håller sig uppdaterad med senaste tekniker</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Heart size={20} className="text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800">Våra värden</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <Heart size={32} className="mx-auto mb-3 text-emerald-600" />
                <h4 className="font-semibold text-emerald-800 text-sm mb-2">Omsorg</h4>
                <p className="text-xs text-emerald-700">Vi bryr oss genuint om varje kunds välbefinnande</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg">
                <Award size={32} className="mx-auto mb-3 text-teal-600" />
                <h4 className="font-semibold text-teal-800 text-sm mb-2">Precision</h4>
                <p className="text-xs text-teal-700">Högsta noggrannhet i varje behandling vi utför</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Users size={32} className="mx-auto mb-3 text-blue-600" />
                <h4 className="font-semibold text-blue-800 text-sm mb-2">Professionalitet</h4>
                <p className="text-xs text-blue-700">Passion för massageterapi och kontinuerlig utveckling</p>
              </div>
            </div>
          </div>

          {/* Privacy Policy and Terms of Use Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <motion.button
              onClick={() => navigate('/integritetspolicy')}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 text-left"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Shield size={20} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Integritetspolicy</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Läs om hur vi hanterar din personliga information och skyddar din integritet.
              </p>
            </motion.button>

            <motion.button
              onClick={() => navigate('/anvandardvillkor')}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 text-left"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <FileText size={20} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-800">Användarvillkor</h3>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Läs våra villkor för användning av våra tjänster och webbplats.
              </p>
            </motion.button>
          </div>

        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </motion.div>
  );
};

export default About;