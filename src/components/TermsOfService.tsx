import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, CreditCard, AlertTriangle, Clock, Users, Shield, Heart, MapPin, Phone } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
            Användarvillkor
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
                Användarvillkor
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
              <FileText size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Allmänna villkor</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Välkommen till Massage Corner Sverige AB! Dessa användarvillkor ("Villkor") styr din användning av 
            våra massagetjänster, webbplats och besök på våra lokaler. Genom att använda våra tjänster eller 
            boka behandlingar accepterar du dessa villkor i sin helhet. Läs igenom dem noggrant innan du 
            genomför en bokning.
          </p>
        </div>

        {/* Company info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Om oss</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <MapPin size={14} className="mr-2 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <strong>Massage Corner Sverige AB</strong><br />
                Organisationsnummer: [Organisationsnummer]<br />
                Skolgatan 13A<br />
                553 16 Jönköping
              </div>
            </div>
            <div className="flex items-center">
              <Phone size={14} className="mr-2 text-emerald-600 flex-shrink-0" />
              <span>073-175 95 67</span>
            </div>
            <p className="text-sm italic">
              Vi är ett registrerat företag som erbjuder professionella massagetjänster enligt 
              svenska bestämmelser för hälso- och sjukvård.
            </p>
          </div>
        </div>

        {/* Our Services */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Heart size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Våra tjänster</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Vi erbjuder följande massagetjänster:</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Medicinsk massage</strong> - Professionell behandling för skador och spänningar, inklusive ultraljudbehandling</li>
                <li><strong>Klassisk massage</strong> - Djupgående helkroppsmassage eller behandling av specifika områden</li>
                <li><strong>Avslappningsmassage</strong> - Mjuk och lugnande massage för total avkoppling</li>
                <li><strong>Koppningsmassage</strong> - Dynamisk och statisk koppningsbehandling</li>
                <li><strong>Specialbehandlingar</strong> - Lymfdränage, ansiktsmassage, honungsmassage m.m.</li>
                <li><strong>Ben- och fotmassage</strong> - Fokuserad behandling för ben och fötter</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Kvalitet och säkerhet</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Alla behandlingar utförs av diplomerade massörer</li>
                <li>Vi följer strikta hygien- och säkerhetsrutiner</li>
                <li>Individuellt anpassade behandlingar efter dina behov</li>
                <li>Professionell utrustning och miljö</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Terms */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Calendar size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Bokningsvillkor</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Bokning och bekräftelse</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Bokningar görs online via Bokadirekt.se, per telefon eller på plats</li>
                <li>Alla bokningar måste bekräftas av oss för att vara giltiga</li>
                <li>Du får bekräftelse via SMS eller e-post</li>
                <li>Vi förbehåller oss rätten att avböja bokningar</li>
                <li>Du måste vara minst 16 år gammal för att boka behandling</li>
                <li>Personer under 18 år behöver vårdnadshavares samtycke</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Förberedelser inför behandling</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Kom 5-10 minuter före din bokade tid</li>
                <li>Informera om eventuella allergier eller medicinska tillstånd</li>
                <li>Undvik att äta stora måltider 2 timmar före behandlingen</li>
                <li>Ta av smycken och kontaktlinser före behandlingen</li>
                <li>Duscha gärna före besöket</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Avbokning och ändringar</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Avbokning:</strong> Minst 24 timmar i förväg utan kostnad</li>
                <li><strong>Sen avbokning:</strong> Mindre än 24 timmar - 50% av behandlingens pris debiteras</li>
                <li><strong>Utebliven behandling:</strong> Fullt pris debiteras</li>
                <li><strong>Ändringar:</strong> Kontakta oss minst 24 timmar före för att ändra tid</li>
                <li><strong>Sjukdom:</strong> Vid akut sjukdom accepteras avbokning utan kostnad med läkarintyg</li>
                <li>Kontakta oss på 073-175 95 67 för avbokning eller ändringar</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Förseningar</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Vid försening kortas behandlingstiden ner för att hålla schemat</li>
                <li>Fullt pris debiteras även vid förkortad behandling</li>
                <li>Vi strävar efter flexibilitet men kan inte garantera ombokning vid försening</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <CreditCard size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Betalningsvillkor</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Betalning sker efter avslutad behandling på plats</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Vi accepterar kontanter, bankkort, Swish och andra digitala betalningsmetoder</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Priser kan ändras utan förvarning - aktuella priser finns på hemsidan</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Alla priser inkluderar moms enligt svensk lag</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Dricks är frivilligt och uppskattas</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Bokadirekt.se kan kräva förskottsbetalning för vissa bokningar</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Kvitto utfärds alltid vid behandling - spara det för eventuella försäkringsärenden</span>
            </div>
          </div>
        </div>

        {/* Health and Safety */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Shield size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Hälsa och säkerhet</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Din hälsa och säkerhet</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Informera alltid om medicinska tillstånd, skador eller graviditet</li>
                <li>Meddela omedelbart om du känner obehag under behandlingen</li>
                <li>Vi följer alla hälso- och säkerhetsbestämmelser enligt svensk lag</li>
                <li>Sterilisering av verktyg enligt branschstandard</li>
                <li>Om du är sjuk, vänligen avboka för att skydda andra kunder och personal</li>
                <li>Vi förbehåller oss rätten att vägra behandling av hälsoskäl</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Kontraindikationer för massage</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Akut inflammation eller infektion</li>
                <li>Feber eller andra infektionssjukdomar</li>
                <li>Öppna sår eller hudskador i behandlingsområdet</li>
                <li>Vissa hjärt- och kärlsjukdomar (konsultera läkare först)</li>
                <li>Blodförtunnande mediciner (informera massören)</li>
                <li>Graviditet (särskilda försiktighetsåtgärder krävs)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Förväntade uppförande</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Respektfullt bemötande av personal och andra kunder</li>
                <li>Punktlighet för bokade tider</li>
                <li>Följ personalens instruktioner och säkerhetsriktlinjer</li>
                <li>Ingen konsumtion av alkohol eller droger före behandling</li>
                <li>Respektera våra lokaler och utrustning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Service quality */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Heart size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Servicekvalitet och garanti</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Vår kvalitetsgaranti</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Vi strävar efter högsta kvalitet i alla våra behandlingar</li>
                <li>Om du inte är nöjd, kontakta oss inom 48 timmar efter behandlingen</li>
                <li>Vi erbjuder kompletterande behandling vid behov</li>
                <li>Feedback och förslag är alltid välkomna för att förbättra våra tjänster</li>
                <li>Alla våra massörer har professionell utbildning och certifiering</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Behandlingsresultat</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Individuella resultat kan variera beroende på tillstånd och behov</li>
                <li>Massage är inte en medicinsk behandling utan en komplementär vårform</li>
                <li>Vi garanterar inte specifika medicinska resultat</li>
                <li>För medicinska problem, konsultera alltid en legitimerad vårdgivare</li>
                <li>Flera behandlingar kan behövas för optimalt resultat</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Liability */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Ansvarsbegränsning</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <p>
              Massage Corner Sverige AB ansvarar inte för:
            </p>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Allergiska reaktioner som inte rapporterats i förväg</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Personliga tillhörigheter som försvinner eller skadas</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Resultat som inte uppfyller orealistiska förväntningar</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Indirekta skador eller följdskador</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Skador som uppstår på grund av felaktig information från kunden</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Problem som uppstår efter behandlingen på grund av bristande eftervård</span>
              </div>
            </div>
            <p className="text-sm italic bg-gray-50 p-3 rounded-lg">
              <strong>Viktigt:</strong> Vi har ansvarsförsäkring som täcker vår verksamhet enligt 
              branschstandard. Detta ansvar gäller endast vid påvisad vårdslöshet från vår sida.
            </p>
          </div>
        </div>

        {/* Privacy and data */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Shield size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Integritet och datahantering</h3>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Vi behandlar dina personuppgifter enligt vår integritetspolicy</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Behandlingsinformation dokumenteras för din säkerhet och vårt ansvar</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Bokadirekt.se hanterar bokningsdata enligt sina villkor</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Du har rätt att få information om vilka uppgifter vi har om dig</span>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Vi delar aldrig dina uppgifter med tredje part utan ditt samtycke</span>
            </div>
          </div>
        </div>

        {/* Contact and Disputes */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Phone size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Kontakt och reklamationer</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Klagomål och reklamationer</h4>
              <p className="mb-2">
                För klagomål eller reklamationer, kontakta oss omedelbart:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Telefon: 073-175 95 67</li>
                <li>Besök vår salong på Skolgatan 13A, Jönköping</li>
                <li>Följ oss på Instagram: @massage.corner.jkpg</li>
                <li>E-post: info@massage-corner.se</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Reklamationsprocess</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Kontakta oss inom 48 timmar efter behandlingen</li>
                <li>Beskriv problemet så detaljerat som möjligt</li>
                <li>Vi strävar efter att lösa alla problem inom 7 arbetsdagar</li>
                <li>Vid behov erbjuder vi kompletterande behandling eller återbetalning</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Tvistlösning</h4>
              <p>
                Dessa villkor styrs av svensk lag. Eventuella tvister ska först lösas genom förhandling. 
                Om detta inte är möjligt kan tvisten prövas av Allmänna reklamationsnämnden (ARN) eller 
                relevant domstol. Som konsument har du rätt att vända dig till ARN för kostnadsfri 
                tvistprövning.
              </p>
            </div>
          </div>
        </div>

        {/* Consumer rights */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Users size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Konsumenträttigheter</h3>
          </div>
          <div className="space-y-4 text-gray-700 text-sm md:text-base">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Ångerrätt</h4>
              <p className="mb-2">
                Enligt distans- och hemförsäljningslagen (för onlinebokningar):
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>14 dagars ångerrätt från bokningsdatum</li>
                <li>Ångerrätten bortfaller vid påbörjad behandling</li>
                <li>Måste meddelas skriftligt (e-post godkänns)</li>
                <li>Gäller endast för konsumenter, inte företagskunder</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Garantier enligt konsumentköplagen</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Tjänsten ska utföras på ett fackmannamässigt sätt</li>
                <li>Tjänsten ska vara fri från fel som minskar dess värde eller användbarhet</li>
                <li>Vid fel har du rätt till avhjälpande, prisavdrag eller hävning</li>
                <li>Reklamation ska göras inom skälig tid efter upptäckt fel</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Hjälp och stöd</h4>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Konsumentverket:</strong> konsumentverket.se</li>
                <li><strong>Allmänna reklamationsnämnden:</strong> arn.se</li>
                <li><strong>Konsumentrådgivning:</strong> Kontakta din kommun</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <FileText size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Ändringar av villkoren</h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Vi förbehåller oss rätten att ändra dessa villkor när som helst. Väsentliga ändringar kommer 
            att kommuniceras via vår webbplats eller genom direkt kommunikation minst 30 dagar innan 
            de träder i kraft. Fortsatt användning av våra tjänster efter ändringar innebär att du 
            accepterar de nya villkoren.
          </p>
        </div>

        {/* Final note */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-lg p-6 border border-emerald-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Heart size={20} className="text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-emerald-800">Tack för ditt förtroende!</h3>
          </div>
          <p className="text-emerald-700 leading-relaxed text-sm md:text-base">
            Vi ser fram emot att välkomna dig till Massage Corner Sverige AB och ge dig den bästa 
            möjliga massageupplevelsen. Genom att följa dessa villkor skapar vi tillsammans en 
            trygg och professionell miljö för alla våra kunder.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermsOfService;