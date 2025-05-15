import React, { createContext, useContext, useState } from 'react';
import { 
  Sun, Droplet, Leaf, Shield, Home, TrendingUp, Flame,
  BatteryCharging, ZapOff, MapPin, Users2, AlertTriangle, 
  ShieldCheck, Lightbulb, Clock, BarChartHorizontalBig, Thermometer 
} from 'lucide-react';

interface UserDataContextType {
  userData: any;
  currentStep: string;
  isLoading: boolean;
  colors: any;
  comparisonData: any;
  comparisonCriteriaConfig: any[];
  nestoreProductSpecs: any;
  comparisonInfoboxContent: any;
  productAlternativesConfig: any;
  explanationContent: any;
  updateUserData: (section: string, data: any) => void;
  goToStep: (step: string) => void;
  calculateAllResults: () => Promise<void>;
  getActiveRates: () => any;
  apiSaveLead: (data: any) => Promise<void>;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = React.useState({
    basic: {
      ownership: 'koop',
    },
    household: { 
      persons: 2, 
      showersPerPerson: 1, 
      showerDurationCategory: 8, 
      showerHeadType: 'normaal', 
      hasBath: false 
    },
    housing: { 
      houseType: 'ruime-tussenwoning',
      isolationLevel: 'good',
      constructionYearCategory: '2001-2015',
      availableSpace: 'ruim'
    },
    heating: {
      mainHeatingSystem: 'cv-gas',
      heatingSystemAge: 'onbekend',
      hasBoiler: false,
      boilerType: 'onbekend',
      boilerAge: 'onbekend',
      hasCirculation: false
    },
    solar: {
      hasSolar: true,
      panelsCategory: 'medium', 
      panels: 10, 
      yearlyProduction: 3500, 
      knowsExactSolarData: false, 
      selfConsumption: 35 
    },
    contact: {
      email: '',
      phone: '',
      agreed: false,
      submitted: false
    },
    priorities: [
      {
        id: 'prio-payback',
        label: 'Snelle terugverdientijd',
        description: 'Maximale kostenbesparing en korte terugverdientijd',
        iconName: 'TrendingUp',
        importance: 5
      },
      {
        id: 'prio-solar',
        label: 'Maximaal profijt zonnepanelen',
        description: 'Optimaal gebruik van zelf opgewekte zonnestroom',
        iconName: 'Sun',
        importance: 3
      },
      {
        id: 'prio-gas',
        label: 'Gasbesparing',
        description: 'Minimaliseer gasverbruik voor warm water',
        iconName: 'Flame',
        importance: 3
      },
      {
        id: 'prio-water',
        label: 'Warm water comfort',
        description: 'Altijd voldoende warm water beschikbaar',
        iconName: 'Droplet',
        importance: 2
      },
      {
        id: 'prio-co2',
        label: 'CO₂ reductie',
        description: 'Maximale bijdrage aan klimaatdoelen',
        iconName: 'Leaf',
        importance: 2
      },
      {
        id: 'prio-safety',
        label: 'Veiligheid',
        description: 'Brandveilige energieopslag',
        iconName: 'Shield',
        importance: 2
      },
      {
        id: 'prio-dutch',
        label: 'Nederlands product',
        description: 'Ondersteuning Nederlandse innovatie',
        iconName: 'Home',
        importance: 2
      }
    ],
    results: null
  });

  const [currentStep, setCurrentStep] = useState('intake-step1');
  const [isLoading, setIsLoading] = useState(false);

  const colors = {
    primary: '#1d4ed8',
    secondary: '#ea580c',
    accent: '#16a34a',
    light: '#f0f9ff',
    textDark: '#1e293b',
    textMedium: '#475569',
    textLight: '#94a3b8',
    gradients: {
      primary: ['#1d4ed8', '#2563eb'],
      secondary: ['#ea580c', '#f97316'],
      accent: ['#16a34a', '#22c55e']
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }
  };

  const comparisonData = {
    warmtepomp_boiler: {
      name: "Warmtepompboiler",
      opslagcapaciteit: 200,
      warmwater_volume: 200,
      levensduur: "10-15",
      eigen_gebruik_zon: "40-50%",
      brandveiligheid_score: 2,
      max_temperatuur: 55,
      gasbesparing_potentieel: "Tot 60-70%",
      laadflexibiliteit: "Beperkt (alleen nachtstroom)",
      productielocatie: "Divers",
      isNEStore: false,
      short_description: "Warmtepompboiler voor warm water."
    },
    lithium_thuisbatterij: {
      name: "Lithium Thuisbatterij",
      opslagcapaciteit: 10,
      warmwater_volume: 0,
      levensduur: "8-12",
      eigen_gebruik_zon: "60-70%",
      brandveiligheid_score: 0,
      max_temperatuur: 0,
      gasbesparing_potentieel: "0%",
      laadflexibiliteit: "Hoog (Zon & Net)",
      productielocatie: "Veelal Azië",
      isNEStore: false,
      short_description: "Lithium-ion batterij voor elektriciteit."
    },
    zonnestroomboiler: {
      name: "Zonneboiler",
      opslagcapaciteit: 0,
      warmwater_volume: 120,
      levensduur: "15-20",
      eigen_gebruik_zon: "0%",
      brandveiligheid_score: 2,
      max_temperatuur: 85,
      gasbesparing_potentieel: "Tot 50-60%",
      laadflexibiliteit: "Geen (alleen zon)",
      productielocatie: "Divers",
      isNEStore: false,
      short_description: "Traditionele zonneboiler voor warm water."
    }
  };

  const comparisonCriteriaConfig = [
    {
      id: 'opslagcapaciteit',
      label: 'Energiecapaciteit',
      tooltip: 'De hoeveelheid energie die kan worden opgeslagen.',
      dataKey: 'opslagcapaciteit',
      unit: 'kWh',
      maxValue: 30,
      icon: null
    },
    {
      id: 'warmwater_volume',
      label: 'Warmwatervolume',
      tooltip: 'Het beschikbare volume warm water bij 40°C.',
      dataKey: 'warmwater_volume',
      unit: 'L',
      maxValue: 400,
      icon: null
    },
    {
      id: 'levensduur',
      label: 'Levensduur',
      tooltip: 'De verwachte technische levensduur in jaren.',
      dataKey: 'levensduur',
      isText: true,
      icon: null
    },
    {
      id: 'eigen_gebruik_zon',
      label: 'Eigen gebruik zonnestroom',
      tooltip: 'Het percentage zonnestroom dat u zelf kunt gebruiken.',
      dataKey: 'eigen_gebruik_zon',
      isText: true,
      icon: null
    },
    {
      id: 'brandveiligheid_score',
      label: 'Brandveiligheid',
      tooltip: 'Score voor brandveiligheid van het systeem.',
      dataKey: 'brandveiligheid_score',
      isScore: true,
      scoreLabels: ['Risicovol', 'Matig', 'Goed', 'Uitstekend'],
      icon: null
    },
    {
      id: 'max_temperatuur',
      label: 'Maximum temperatuur',
      tooltip: 'De maximale temperatuur die het systeem kan bereiken.',
      dataKey: 'max_temperatuur',
      unit: '°C',
      maxValue: 95,
      icon: null
    },
    {
      id: 'gasbesparing_potentieel',
      label: 'Gasbesparing',
      tooltip: 'Het potentieel voor gasbesparing.',
      dataKey: 'gasbesparing_potentieel',
      isText: true,
      icon: null
    },
    {
      id: 'laadflexibiliteit',
      label: 'Laadflexibiliteit',
      tooltip: 'De flexibiliteit in het laden van het systeem.',
      dataKey: 'laadflexibiliteit',
      isText: true,
      icon: null
    },
    {
      id: 'productielocatie',
      label: 'Productielocatie',
      tooltip: 'Waar het product wordt geproduceerd.',
      dataKey: 'productielocatie',
      isText: true,
      icon: null
    }
  ];

  const nestoreProductSpecs = {
    E20: {
      name: "NEStore E20",
      energy_capacity: 20,
      water_volume_40c: 400,
      standby_loss: 0.4,
      height_cm: 153,
      width_cm: 60,
      depth_cm: 60,
      heating_element_kw: 6,
      max_temperature: 95,
      benefits: [
        "Perfect voor gezinnen tot 4 personen",
        "Compact formaat, past in de meeste woningen",
        "Ideaal voor 8-12 zonnepanelen"
      ]
    },
    E30: {
      name: "NEStore E30",
      energy_capacity: 30,
      water_volume_40c: 600,
      standby_loss: 0.5,
      height_cm: 205,
      width_cm: 60,
      depth_cm: 60,
      heating_element_kw: 9,
      max_temperature: 95,
      benefits: [
        "Geschikt voor grote gezinnen (5+ personen)",
        "Extra capaciteit voor maximale zelfvoorziening",
        "Optimaal voor 12+ zonnepanelen"
      ]
    }
  };

  const comparisonInfoboxContent = {
    opslagcapaciteit: "De energiecapaciteit bepaalt hoeveel energie het systeem kan opslaan. NEStore slaat energie op in de vorm van warm water, wat efficiënter en veiliger is dan elektrische opslag.",
    warmwater_volume: "Het warmwatervolume geeft aan hoeveel warm water (40°C) beschikbaar is voor douchen, baden en andere huishoudelijke toepassingen.",
    levensduur: "De levensduur is een cruciale factor voor de totale kosten. NEStore's thermische opslag heeft een significant langere levensduur dan elektrische batterijen.",
    eigen_gebruik_zon: "Hoe meer zonnestroom u zelf gebruikt, hoe hoger uw besparing. Dit wordt extra belangrijk na afschaffing van de salderingsregeling.",
    brandveiligheid_score: "Veiligheid is cruciaal bij energieopslag. Thermische opslag zoals NEStore is inherent veiliger dan lithium-ion batterijen.",
    max_temperatuur: "Een hogere maximumtemperatuur betekent meer energieopslag in hetzelfde volume en betere legionellapreventie.",
    gasbesparing_potentieel: "Gasbesparing wordt steeds belangrijker met stijgende gasprijzen. NEStore kan een groot deel van uw gasverbruik voor warm water vervangen.",
    laadflexibiliteit: "Flexibiliteit in laden betekent dat het systeem slim kan inspelen op zonneproductie en energieprijzen.",
    productielocatie: "Lokale productie betekent kortere transportafstanden, betere service en ondersteuning van de Nederlandse economie.",
    default: "Vergelijk de verschillende aspecten van energieopslagsystemen om de beste keuze voor uw situatie te maken."
  };

  const productAlternativesConfig = {
    nestore: {
      general_benefits: [
        "Maximaal profijt van uw zonnepanelen",
        "Geen risico op brandgevaarlijke situaties",
        "30+ jaar levensduur",
        "Minimaal onderhoud nodig",
        "100% recyclebaar"
      ],
      priorityBenefits: {
        cost_savings: {
          title: "Maximale Kostenbesparing",
          points: [
            "85-90% eigen gebruik van uw zonnestroom",
            "Besparing op gasverbruik voor warm water",
            "Lange levensduur verlaagt kosten per jaar",
            "Minimale onderhoudskosten"
          ]
        },
        sustainability: {
          title: "Duurzame Keuze",
          points: [
            "100% recyclebare materialen",
            "CO₂-reductie door gasbesparing",
            "Productie in Nederland",
            "Ondersteunt energietransitie"
          ]
        },
        comfort: {
          title: "Optimaal Comfort",
          points: [
            "Altijd voldoende warm water",
            "Geen geluidshinder",
            "Volledig automatische werking",
            "Monitoring via app"
          ]
        },
        independence: {
          title: "Energie Onafhankelijkheid",
          points: [
            "Minder afhankelijk van energiebedrijven",
            "Bescherming tegen stijgende energieprijzen",
            "Voorbereid op salderingsafbouw",
            "Zelfvoorzienend in warm water"
          ]
        },
        safety: {
          title: "Veilige Oplossing",
          points: [
            "Geen brandgevaarlijke materialen",
            "Bewezen technologie",
            "Automatische legionellapreventie",
            "Nederlandse veiligheidsnormen"
          ]
        },
        future_proof: {
          title: "Toekomstbestendig",
          points: [
            "30+ jaar levensduur",
            "Klaar voor smart grid",
            "Software updates",
            "Uitbreidbaar systeem"
          ]
        },
        ease_of_use: {
          title: "Gebruiksgemak",
          points: [
            "Volledig automatische werking",
            "Intuïtieve app-bediening",
            "Geen onderhoud nodig",
            "24/7 monitoring"
          ]
        }
      }
    }
  };

  const explanationContent = {
    eigenVerbruik: {
      title: "Waarom is eigen verbruik zo belangrijk?",
      explanation: `Met de afbouw van de salderingsregeling wordt het steeds belangrijker om zoveel mogelijk van uw eigen zonnestroom direct te gebruiken. Zonder opslag wordt meestal maar 30-40% direct gebruikt, de rest wordt teruggeleverd aan het net.\n\nMet NEStore verhoogt u dit naar 85-90% door de overtollige zonnestroom om te zetten in warm water. Dit water gebruikt u later op de dag of in de volgende dagen, waardoor u optimaal profiteert van uw zonnepanelen.`
    },
    waaromGeenZonneboilerVoorSalderen: {
      title: "Waarom geen traditionele zonneboiler?",
      explanation: `Een traditionele zonneboiler gebruikt speciale zonnecollectoren die alleen warmte kunnen produceren. Deze tellen niet mee voor de salderingsregeling.\n\nDoor te kiezen voor NEStore in combinatie met zonnepanelen profiteert u wel van saldering én kunt u na afbouw van de saldering uw eigen opgewekte stroom maximaal benutten. Bovendien werkt NEStore het hele jaar door, ook als de zon niet schijnt.`
    },
    nederlandsProduct: {
      title: "Nederlands product, ontwikkeld voor Nederlandse situatie",
      explanation: `NEStore is specifiek ontwikkeld voor de Nederlandse markt, rekening houdend met ons klimaat, de salderingsregeling en de energietransitie. Het systeem wordt in Nederland geproduceerd volgens de hoogste kwaliteitsnormen.\n\nDit betekent niet alleen korte transportafstanden en een lagere CO₂-voetafdruk, maar ook uitstekende service en ondersteuning in uw eigen taal.`
    }
  };

  const updateUserData = (section: string, data: any) => {
    setUserData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  };

  const goToStep = (step: string) => {
    setCurrentStep(step);
  };

  const calculateAllResults = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    updateUserData('results', {
      recommendedModelCode: 'E30',
      yearlyBenefit: 800,
      yearlyLossSaldering: 400,
      extraSavingsFromHeating: 200,
      paybackYearsAfterSaldering: 7,
      waterCapacityInDays: 3,
      co2SavingInKg: 2500
    });
    
    setIsLoading(false);
    goToStep('results-page');
  };

  const getActiveRates = () => {
    return {
      electricity_rate_normal: 0.40,
      electricity_feedin_future_rate: 0.10,
    };
  };

  const apiSaveLead = async (data: any) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Lead saved:', data);
    updateUserData('contact', { submitted: true });
    setIsLoading(false);
  };

  return (
    <UserDataContext.Provider value={{
      userData,
      currentStep,
      isLoading,
      colors,
      comparisonData,
      comparisonCriteriaConfig,
      nestoreProductSpecs,
      comparisonInfoboxContent,
      productAlternativesConfig,
      explanationContent,
      updateUserData,
      goToStep,
      calculateAllResults,
      getActiveRates,
      apiSaveLead
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}