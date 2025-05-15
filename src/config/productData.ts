import { 
  Sun, Droplet, Leaf, Shield, Home, TrendingUp, Flame,
  BatteryCharging, ZapOff, MapPin, Users2, AlertTriangle, 
  ShieldCheck, Lightbulb, Clock, BarChartHorizontalBig, Thermometer 
} from 'lucide-react';

export const explanationContent = {
  eigenVerbruik: {
    title: "Maximaal Eigen Verbruik van Zonnestroom",
    explanation: "Met de afbouw van de salderingsregeling wordt het steeds belangrijker om zoveel mogelijk van uw eigen zonnestroom direct te gebruiken. NEStore slaat overtollige zonnestroom op in de vorm van warm water, waardoor u deze energie later kunt gebruiken wanneer u het nodig heeft. Dit verhoogt uw eigen verbruik tot wel 85-90%, wat betekent dat u minder afhankelijk wordt van het elektriciteitsnet en maximaal profiteert van uw zonnepanelen."
  },
  waaromGeenZonneboilerVoorSalderen: {
    title: "Waarom NEStore beter is dan een Zonneboiler",
    explanation: "Een traditionele zonneboiler kan alleen direct zonne-energie omzetten in warm water en heeft geen mogelijkheid om overtollige zonnestroom op te slaan. NEStore daarentegen kan slim laden met zowel zonne-overschot als goedkope netstroom, en biedt veel meer opslagcapaciteit. Dit maakt NEStore een veel effectievere oplossing voor het maximaliseren van uw eigen verbruik en het voorbereiden op de afbouw van de salderingsregeling."
  },
  nederlandsProduct: {
    title: "Nederlands Product, Nederlandse Kwaliteit",
    explanation: "NEStore is een innovatief Nederlands product, ontwikkeld en geproduceerd in Delft. Dit betekent niet alleen dat u bijdraagt aan de Nederlandse economie en innovatie, maar ook dat u kunt rekenen op lokale service en ondersteuning. De systemen worden gebouwd volgens de hoogste kwaliteitsstandaarden, met een verwachte levensduur van meer dan 30 jaar."
  }
};

export const nestoreProductSpecs = {
  E20: {
    model_code: 'E20',
    name: 'NEStore E20 G1+',
    energy_capacity: 20.9,
    water_volume_40c: 600,
    heating_time_hours: 7,
    height_cm: 153,
    width_cm: 59,
    depth_cm: 59,
    standby_loss: 0.17,
    weight_kg: 350,
    max_temperature: 110,
    heating_element_kw: 3.5,
    price_excl_vat: 6900,
    price_incl_vat: 8349,
    benefits: [
      "Tot 20,9 kWh energieopslag / 600L warm water",
      "Ideaal voor gemiddelde huishoudens",
      "100% brandveilig (water + RVS)",
      "Lange levensduur (>30 jaar)",
      "Gemaakt en ondersteund in Nederland"
    ]
  },
  E30: {
    model_code: 'E30',
    name: 'NEStore E30 G1+',
    energy_capacity: 30.3,
    water_volume_40c: 900,
    heating_time_hours: 10,
    height_cm: 205,
    width_cm: 59,
    depth_cm: 59,
    standby_loss: 0.24,
    weight_kg: 500,
    max_temperature: 110,
    heating_element_kw: 3.5,
    price_excl_vat: 8250,
    price_incl_vat: 9983,
    benefits: [
      "Tot 30,3 kWh energieopslag / 900L warm water",
      "Perfect voor grotere huishoudens of hoge warmwaterbehoefte",
      "Maximale onafhankelijkheid en comfort",
      "100% brandveilig (water + RVS)",
      "Lange levensduur (>30 jaar)",
      "Gemaakt en ondersteund in Nederland"
    ]
  }
};

export const modelRecommendationRules = [
  { rule_name: 'Groot huishouden of veel verbruik', persons_min: 4, persons_max: null, water_demand_min: 250, water_demand_max: null, has_bath: null, recommended_model_code: 'E30', priority: 10 },
  { rule_name: 'Huishouden met bad', persons_min: null, persons_max: null, water_demand_min: null, water_demand_max: null, has_bath: true, recommended_model_code: 'E30', priority: 20 },
  { rule_name: 'Standaard aanbeveling', persons_min: null, persons_max: null, water_demand_min: null, water_demand_max: null, has_bath: null, recommended_model_code: 'E20', priority: 999 },
];

export const comparisonData = {
  warmtepomp_boiler: { 
    name: "Warmtepomp + Boiler", 
    opslagcapaciteit: 5.8, 
    warmwater_volume: 200, 
    levensduur: "10-15", 
    eigen_gebruik_zon: "N.v.t.", 
    brandveiligheid_score: 2, 
    max_temperatuur: 55,
    gasbesparing_potentieel: "Deels (vervangt CV voor tapwater)",
    laadflexibiliteit: "Gemiddeld (Net, kan op daluren)",
    productielocatie: "Divers",
    short_description: "Efficiënte elektrische waterverwarming via warmtepomp."
  },
  lithium_thuisbatterij: { 
    name: "Lithium Thuisbatterij", 
    opslagcapaciteit: 10, 
    warmwater_volume: 0, 
    levensduur: "10-15", 
    eigen_gebruik_zon: "60-70%", 
    brandveiligheid_score: 0, 
    max_temperatuur: 0, 
    gasbesparing_potentieel: "N.v.t.",
    laadflexibiliteit: "Hoog (Zon & Net, prijsgestuurd)",
    productielocatie: "Veelal Azië",
    short_description: "Slaat overtollige zonnestroom elektrisch op, niet voor warm water."
  },
  zonnestroomboiler: { 
    name: "Zonnestroomboiler", 
    opslagcapaciteit: 3.8, 
    warmwater_volume: 150, 
    levensduur: "15-20", 
    eigen_gebruik_zon: "Direct thermisch (10-30%)", 
    brandveiligheid_score: 2, 
    max_temperatuur: 70,
    gasbesparing_potentieel: "Beperkt (30-50%, sterk seizoensafhankelijk)", 
    laadflexibiliteit: "Zeer Laag (Alleen direct zon-overschot)", 
    productielocatie: "Divers",
    short_description: "Elektrische boiler; verwarmt alleen met direct zon-overschot, beperkte opslag en flexibiliteit." 
  },
};

export const productAlternativesConfig = { 
  nestore: { 
    name: "NEStore Warmtebatterij", 
    short_description: "Slimme warmteopslag voor maximaal eigen verbruik en comfort.",
    safety: "100% (water & RVS)", 
    production: "Nederland",
    isWinner: true,
    general_benefits: [ 
        "Maximale verhoging eigen verbruik zonnestroom (tot 85-90%)",
        "Substantiële gasbesparing voor warm tapwater (tot 100%)",
        "Slim laden met zonne-overschot én goedkope netstroom (prijsgestuurd)",
        "Ontkoppelt opwek van verbruik: energiebuffer voor dagen",
        "Minimaal stilstandsverlies dankzij superieure vacuümisolatie",
        "100% brandveilig (water & RVS) en zeer lange levensduur (>30 jaar)",
        "Effectieve bijdrage aan netontlasting",
        "Nederlands product: innovatie, service en kwaliteit"
    ],
    priorityBenefits: { 
      "prio-payback": { title: "Snelle terugverdientijd", icon: TrendingUp, points: ["Slim laden op goedkope momenten", "Minimaal stilstandsverlies (0,17-0,24 kWh/dag)", "Zeer lange levensduur (>30 jaar)", "Maximaliseert waarde van elke kWh"] },
      "prio-solar": { title: "Optimale oplossing voor afbouw saldering", icon: Sun, points: ["Verhoogt eigenverbruik significant (tot 85-90%)", "Laadt met zonne-overschot, voorkomt dure netstroom", "Minimaliseert terugleververliezen en maximaliseert waarde eigen stroom"] },
      "prio-gas": { title: "Drastisch minder gasverbruik", icon: Flame, points: ["Substantiële reductie gasverbruik voor warm tapwater (tot 100%)", "Grote warmteopslag voor meerdere dagen onafhankelijkheid van gas", "Draagt bij aan verlichting netcongestie door minder piekvraag gas"] },
      "prio-water": { title: "Ongeëvenaard warmwatercomfort", icon: Droplet, points: ["Grote capaciteit (600-900L @40°C), altijd ruim voldoende", "Warm water direct beschikbaar, onafhankelijk van zon of buitentemperatuur", "Stabiele, hoge temperatuur (tot 110°C opslag)"] },
      "prio-co2": { title: "Maximale CO₂-besparing", icon: Leaf, points: ["Significant lagere CO₂-uitstoot door gasvermindering en optimaal gebruik groene stroom", "Draagt bij aan persoonlijke en nationale klimaatdoelen"] },
      "prio-safety": { title: "Compromisloze brandveiligheid", icon: Shield, points: ["100% brandveilig: maakt gebruik van water en RVS", "Geen risico's zoals bij lithium-gebaseerde systemen", "Bewezen, robuuste en onderhoudsarme technologie"] },
      "prio-dutch": { title: "Nederlandse topkwaliteit", icon: Home, points: ["Ontwikkeld en geproduceerd in Delft", "Lokale service, ondersteuning en expertise", "Draagt bij aan Nederlandse innovatie en werkgelegenheid"] }
    }
  },
  thuisbatterij: { name: "Thuisbatterij (Lithium)", short_description: "Slaat elektriciteit op voor later gebruik.", isWinner: false, general_benefits:[] },
  zonneboiler: { name: "Zonnestroomboiler", short_description: "Elektrische boiler; verwarmt alleen met direct zon-overschot, beperkte opslag en flexibiliteit.", isWinner: false, general_benefits:[] }, 
  warmtepomp: { name: "Warmtepomp + Boiler", short_description: "Efficiënte elektrische waterverwarming.", isWinner: false, general_benefits:[] }
};

export const comparisonCriteriaConfig = [
  { id: "eigen_gebruik_zon", label: "Verhoging Eigen Verbruik Zon", icon: Sun, unit: "%", dataKey: "eigen_gebruik_zon", higherIsBetter: true, tooltip: "Percentage zonnestroom dat u zelf kunt gebruiken dankzij opslag. Hoger is beter.", maxValue: 100, isText: true },
  { id: "gasbesparing_potentieel", label: "Gasbesparing Tapwater", icon: Flame, unit: "%", dataKey: "gasbesparing_potentieel", higherIsBetter: true, tooltip: "Potentiële besparing op gasverbruik voor warm tapwater. Hoger is beter.", isText: true },
  { id: "laadflexibiliteit", label: "Slim Laden Flexibiliteit", icon: BatteryCharging, dataKey: "laadflexibiliteit", higherIsBetter: true, tooltip: "Flexibiliteit in het laden van energie (zon, net, prijsgestuurd). 'Zeer Hoog' is het beste.", isText: true },
  { id: "opslagcapaciteit", label: "Energie Opslagcapaciteit", icon: BarChartHorizontalBig, unit: "kWh", dataKey: "opslagcapaciteit", higherIsBetter: true, tooltip: "Hoeveel energie kan het systeem thermisch opslaan? Hoger is beter.", maxValue: 35 }, 
  { id: "warmwater_volume", label: "Warm Water Volume", icon: Droplet, unit: "L @40°C", dataKey: "warmwater_volume", higherIsBetter: true, tooltip: "Hoeveelheid direct beschikbaar warm water. Hoger is beter.", maxValue: 1000 },
  { id: "levensduur", label: "Levensduur", icon: Clock, unit: "jaar", dataKey: "levensduur", higherIsBetter: true, tooltip: "Verwachte levensduur van het systeem. Langer is beter.", maxValue: 35, isText: true }, 
  { id: "brandveiligheid", label: "Brandveiligheid", icon: ShieldCheck, dataKey: "brandveiligheid_score", higherIsBetter: true, tooltip: "Mate van brandveiligheid. Hoger is beter.", isScore: true, scoreLabels: ["Risicovol", "Gemiddeld", "Hoog", "Zeer Hoog"] },
  { id: "max_temperatuur", label: "Max. Watertemperatuur Opslag", icon: Thermometer, unit: "°C", dataKey: "max_temperatuur", higherIsBetter: true, tooltip: "Maximale temperatuur van het opgeslagen water (hoger = meer energie/comfort).", maxValue: 120 },
  { id: "productielocatie", label: "Productielocatie", icon: MapPin, dataKey: "productielocatie", higherIsBetter: false, tooltip: "Waar wordt het product hoofdzakelijk geproduceerd?", isText: true },
];

export const comparisonInfoboxContent = {
  eigen_gebruik_zon: "NEStore maximaliseert uw eigen verbruik van zonnestroom, wat cruciaal is nu de salderingsregeling verdwijnt. Zie in de volgende stap de financiële impact!",
  gasbesparing_potentieel: "Met NEStore kunt u uw gasverbruik voor warm tapwater drastisch verminderen, vaak tot nul. Dit ziet u direct terug in uw energierekening.",
  laadflexibiliteit: "NEStore laadt slim, niet alleen met zon, maar ook met goedkope netstroom. Dit biedt optimale kostenbesparing – iets wat een simpele zonnestroomboiler niet kan.",
  opslagcapaciteit: "NEStore biedt significant meer kWh opslagcapaciteit dan de meeste alternatieven, wat resulteert in langere periodes van onafhankelijkheid en comfort.",
  warmwater_volume: "Met NEStore geniet u van een zeer ruime hoeveelheid direct beschikbaar warm water, ideaal voor grotere gezinnen of bij veel verbruik.",
  levensduur: "De robuuste technologie van NEStore staat garant voor een zeer lange levensduur van meer dan 30 jaar, ver boven veel alternatieven, wat de terugverdientijd verder verbetert.",
  brandveiligheid: "Kies voor gemoedsrust: NEStore is 100% brandveilig dankzij de watergebaseerde opslag, in tegenstelling tot systemen met lithiumbatterijen.",
  max_temperatuur: "NEStore slaat water op een hoge temperatuur op (tot 110°C), wat meer energie en comfort per liter betekent en legionellavorming voorkomt.",
  productielocatie: "NEStore is een Nederlands kwaliteitsproduct, ontwikkeld en geproduceerd in Delft, met lokale service en ondersteuning.",
  default: "De NEStore blinkt uit op cruciale punten. In de volgende stap ziet u de financiële impact van de veranderende salderingsregeling."
};