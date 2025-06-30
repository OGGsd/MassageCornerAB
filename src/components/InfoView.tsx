import React from 'react';
import { MapPin, Phone, Clock, Users, Heart, Star, Facebook, Instagram, Mail, Globe } from 'lucide-react';

const InfoView: React.FC = () => {
  const handlePhoneCall = () => {
    window.location.href = 'tel:0731759567';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@massage-corner.se';
  };

  const handleWebsite = () => {
    const url = 'https://www.massage-corner.se/';
    
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = url;
      }
    } catch (error) {
      window.location.href = url;
    }
  };

  const handleInstagram = () => {
    const url = 'https://www.instagram.com/massage.corner.jkpg/';
    
    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = url;
      }
    } catch (error) {
      window.location.href = url;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Header */}
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

      {/* About section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <Heart size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Välkommen till oss</h3>
        </div>
        <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
          <p className="font-semibold text-emerald-800">
            Vårda din kropp med en härlig massage.
          </p>
          <p>
            Oavsett vad du behöver kommer du att bli väl omhändertagen. 
            Massage på endast utvalda delar av kroppen eller helkroppsmassage väljer du själv.
          </p>
          <p>
            Allt ifrån en hård, djupgående massage (som t.ex. idrottsmassage) med fokus på dina eventuella 
            problemområden till en mjukare avslappningsmassage erbjuds i den klassiska massagen beroende 
            på individuella behov och egen önskan.
          </p>
          <p>
            Även inslag av triggerpunktsbehandling och stretching erbjuds.
          </p>
        </div>
      </div>

      {/* Services overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <Star size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Våra behandlingar</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-emerald-50 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 text-sm md:text-base mb-2">
                Medicinsk Massage
              </h4>
              <p className="text-emerald-700 text-xs md:text-sm">
                Professionell behandling med ultraljud vid behov för behandling av skador och spänningar.
              </p>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-4">
              <h4 className="font-semibold text-teal-800 text-sm md:text-base mb-2">
                Klassisk Massage
              </h4>
              <p className="text-teal-700 text-xs md:text-sm">
                Djupgående massage för hela kroppen eller specifika områden, inklusive ben- och fotmassage.
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 text-sm md:text-base mb-2">
                Avslappningsmassage
              </h4>
              <p className="text-purple-700 text-xs md:text-sm">
                Mjuk och lugnande massage för total avkoppling och återhämtning.
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="bg-orange-50 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 text-sm md:text-base mb-2">
                Koppningsmassage
              </h4>
              <p className="text-orange-700 text-xs md:text-sm">
                Dynamisk och statisk koppningsbehandling för förbättrad cirkulation.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 text-sm md:text-base mb-2">
                Specialbehandlingar
              </h4>
              <p className="text-blue-700 text-xs md:text-sm">
                Lymfdränage, ansiktsmassage, honungsmassage och cervical traction.
              </p>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-4">
              <h4 className="font-semibold text-emerald-800 text-sm md:text-base mb-2">
                Kombinationsbehandlingar
              </h4>
              <p className="text-emerald-700 text-xs md:text-sm">
                Skräddarsy din massage genom att kombinera olika tekniker.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Location and Contact */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <MapPin size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Hitta till oss</h3>
        </div>
        <div className="space-y-4 text-gray-700">
          <div className="flex items-start">
            <MapPin size={14} className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-sm md:text-base">
              Skolgatan 13A<br />
              553 16 Jönköping
            </span>
          </div>
          <div className="flex items-center">
            <Phone size={14} className="mr-2 text-gray-500 flex-shrink-0" />
            <span className="text-sm md:text-base">073-175 95 67</span>
          </div>
          <div className="flex items-start">
            <Clock size={14} className="mr-2 text-gray-500 mt-1 flex-shrink-0" />
            <div className="text-sm md:text-base">
              <div className="mb-2">
                <span className="font-semibold text-emerald-600">Öppettider:</span>
              </div>
              <div className="space-y-1">
                <div>Måndag – Fredag: 11:30 – 18:30</div>
                <div>Lördag: 11:30 – 16:30</div>
                <div>Söndag: Stängd</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            onClick={handlePhoneCall}
            className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            title="Ring oss"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={handleEmail}
            className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            title="Skicka e-post"
          >
            <Mail size={18} />
          </button>
          <button
            onClick={handleInstagram}
            className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
            title="Följ oss på Instagram"
          >
            <Instagram size={18} />
          </button>
          <button
            onClick={handleWebsite}
            className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            title="Besök hemsida"
          >
            <Globe size={18} />
          </button>
        </div>
      </div>

      {/* Website Button - Full width */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center">
          <button
            onClick={handleWebsite}
            className="flex items-center justify-center w-full max-w-md bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <Globe size={24} className="mr-3" />
            <span>www.massage-corner.se</span>
          </button>
        </div>
        <p className="text-center text-gray-600 text-sm mt-3">
          Besök vår hemsida för mer information
        </p>
      </div>

      {/* Booking info */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-lg p-6 border border-emerald-100">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
            <Users size={20} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-emerald-800">Vi finns här för dig!</h3>
        </div>
        <p className="text-emerald-700 leading-relaxed text-sm md:text-base">
          Du kan förvänta dig en avkopplande upplevelse där fokus helt ligger på dig. 
          Dina önskemål står i centrum och varje detalj tas om hand med precision och omsorg. 
          Efter din behandling kommer du att känna dig fräsch, välvårdad och stärkt – redo för vad som än väntar.
        </p>
      </div>
    </div>
  );
};

export default InfoView;