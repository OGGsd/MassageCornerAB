import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, Mail, Phone, MapPin, Calendar, Users, Heart } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to About page
      navigate('/about');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-600 text-white py-4 px-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={handleBackClick}
            className="mr-4 p-2 hover:bg-black hover:bg-opacity-20 rounded-full transition-colors"
            aria-label="Gå tillbaka"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-8 h-8 mr-3 rounded-full bg-white p-1 flex items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Massage Corner Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <h1 className="text-lg md:text-xl font-bold">
            Integritetspolicy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        
        {/* Header section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white p-2 shadow-lg flex items-center justify-center mr-4" style={{ borderRadius: '8px' }}>
              <img 
                src="/logo.png" 
                alt="Massage Corner Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div className="text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Integritetspolicy
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
              </p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Shield size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Introduktion</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Massage Corner Sverige AB ("vi", "oss", "vårt") respekterar din integritet och är engagerade i att skydda 
            din personliga information. Denna integritetspolicy förklarar hur vi samlar in, använder, lagrar och 
            skyddar din information när du använder våra tjänster, besöker våra lokaler eller använder vår webbplats.
          </p>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Personuppgiftsansvarig</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <MapPin size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <strong>Massage Corner Sverige AB</strong><br />
                Skolgatan 13A<br />
                553 16 Jönköping
              </div>
            </div>
            <div className="flex items-center">
              <Phone size={14} className="mr-2 text-emerald-600 flex-shrink-0" />
              <span>073-175 95 67</span>
            </div>
            <div className="flex items-center">
              <Mail size={14} className="mr-2 text-emerald-600 flex-shrink-0" />
              <span>info@massage-corner.se</span>
            </div>
          </div>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Database size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Vilken information samlar vi in?</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Personuppgifter</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Namn och kontaktuppgifter (telefonnummer, e-postadress)</li>
                <li>Bokningsinformation och behandlingshistorik</li>
                <li>Hälsoinformation relevant för massagebehandling</li>
                <li>Betalningsinformation (hanteras säkert via tredjepartstjänster)</li>
                <li>Kommunikation via telefon, e-post eller sociala medier</li>
                <li>Eventuella allergier eller medicinska tillstånd som påverkar behandling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Teknisk information</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>IP-adress och enhetsidentifierare</li>
                <li>Webbläsarinformation och användningsdata</li>
                <li>Cookies och liknande teknologier</li>
                <li>Information från bokningssystem (Bokadirekt.se)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Behandlingsinformation</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Val av massagebehandling och behandlingstid</li>
                <li>Eventuella anpassningar eller specialönskemål</li>
                <li>Feedback och kommentarer om behandlingar</li>
                <li>Uppföljningsinformation för behandlingsresultat</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal basis for processing */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Lock size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Rättslig grund för behandling</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Avtal:</strong> För att fullfölja vårt avtal med dig när du bokar behandlingar</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Samtycke:</strong> När du ger samtycke för marknadsföring eller nyhetsbrev</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Berättigat intresse:</strong> För att förbättra våra tjänster och kundupplevelse</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Rättslig förpliktelse:</strong> För att uppfylla bokförings- och skattelagstiftning</span>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Heart size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Hur använder vi din information?</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Hantera bokningar och tillhandahålla massagebehandlingar</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Kommunicera med dig om dina bokningar och våra tjänster</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Anpassa behandlingar efter dina individuella behov</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Förbättra våra tjänster och kundupplevelse</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Skicka marknadsföringsinformation (endast med ditt samtycke)</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Uppfylla rättsliga förpliktelser</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Förebygga bedrägerier och säkerställa säkerhet</span>
            </div>
          </div>
        </div>

        {/* Data sharing */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Delning av information</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <p>Vi delar aldrig dina personuppgifter med tredje part utan ditt samtycke, förutom i följande fall:</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Bokadirekt.se:</strong> För hantering av onlinebokningar</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Betalningsleverantörer:</strong> För säker hantering av betalningar</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Myndigheter:</strong> När det krävs enligt lag</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Tekniska leverantörer:</strong> För drift av webbplats och IT-säkerhet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Shield size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Dataskydd och säkerhet</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
            Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina personuppgifter mot 
            obehörig åtkomst, förlust, förstörelse eller ändring. Detta inkluderar:
          </p>
          <div className="space-y-2 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Kryptering av känslig information</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Begränsad åtkomst till personuppgifter</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Regelbundna säkerhetsgranskningar</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Säker lagring i svenska datacenter</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Utbildning av personal i dataskydd</span>
            </div>
          </div>
        </div>

        {/* Data retention */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Calendar size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Lagringstid</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Kunduppgifter:</strong> 3 år efter senaste behandling</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Behandlingsjournal:</strong> 10 år enligt patientdatalagen</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Bokföringsdata:</strong> 7 år enligt bokföringslagen</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Marknadsföring:</strong> Tills du återkallar samtycke</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span><strong>Webblogg:</strong> 13 månader enligt e-integritetslagen</span>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Eye size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Dina rättigheter enligt GDPR</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
            Enligt dataskyddsförordningen (GDPR) har du följande rättigheter:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt till information</strong> - om vilka uppgifter vi behandlar</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt till rättelse</strong> - korrigering av felaktiga uppgifter</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt till radering</strong> - "rätten att bli glömd"</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt till begränsning</strong> - begränsa behandlingen</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt till dataportabilitet</strong> - få ut dina uppgifter</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt att invända</strong> - mot behandlingen</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt att återkalla samtycke</strong> - när som helst</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-sm"><strong>Rätt att klaga</strong> - till Integritetsskyddsmyndigheten</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Database size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Cookies och liknande teknologier</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <p>Vi använder cookies för att förbättra din upplevelse på vår webbplats:</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Nödvändiga cookies:</strong> För grundläggande funktionalitet</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Funktionella cookies:</strong> För att komma ihåg dina inställningar</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span><strong>Bokadirekt-cookies:</strong> För bokningsfunktionalitet</span>
              </div>
            </div>
            <p className="text-sm italic">
              Du kan hantera cookies i din webbläsares inställningar, men observera att vissa funktioner 
              kanske inte fungerar korrekt om cookies är inaktiverade.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Mail size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Kontakta oss</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
            Om du har frågor om denna integritetspolicy eller vill utöva dina rättigheter, kontakta oss:
          </p>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
              <Phone size={16} className="mr-3 text-emerald-600" />
              <span className="text-sm md:text-base">073-175 95 67</span>
            </div>
            <div className="flex items-center">
              <Mail size={16} className="mr-3 text-emerald-600" />
              <span className="text-sm md:text-base">info@massage-corner.se</span>
            </div>
            <div className="flex items-start">
              <MapPin size={16} className="mr-3 text-emerald-600 mt-1" />
              <div className="text-sm md:text-base">
                <div>Massage Corner Sverige AB</div>
                <div>Skolgatan 13A</div>
                <div>553 16 Jönköping</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-semibold text-emerald-800 mb-2">Integritetsskyddsmyndigheten</h4>
            <p className="text-emerald-700 text-sm">
              Om du är missnöjd med hur vi hanterar dina personuppgifter har du rätt att klaga till 
              Integritetsskyddsmyndigheten (IMY). Besök <strong>imy.se</strong> för mer information.
            </p>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Calendar size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Ändringar av policyn</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Vi kan komma att uppdatera denna integritetspolicy från tid till annan. Väsentliga ändringar kommer 
            att kommuniceras via vår webbplats eller genom direkt kommunikation. Vi rekommenderar att du 
            regelbundet läser denna policy för att hålla dig informerad om hur vi skyddar din information.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;