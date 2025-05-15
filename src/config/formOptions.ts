export const ownershipOptions = [
  { label: "Koopwoning", value: "koop" },
  { label: "Huurwoning", value: "huur" },
];

export const showerDurationOptions = [
  { label: "Kort (ca. 5 min)", value: 5 },
  { label: "Gemiddeld (ca. 8 min)", value: 8 },
  { label: "Lang (ca. 12+ min)", value: 12 },
];

export const showerHeadTypes = [
  { label: "Besparend (ca. 6 L/min)", value: 'besparend', consumption: 6 },
  { label: "Normaal (ca. 9 L/min)", value: 'normaal', consumption: 9 },
  { label: "Regendouche (ca. 15 L/min)", value: 'regendouche', consumption: 15 },
];

export const solarPanelGroups = [
  { label: "Weet ik niet / geen panelen", value: 'unknown', representativeCount: 0, avgProduction: 0 },
  { label: "Klein (1-8 panelen)", value: 'small', representativeCount: 6, avgProduction: 2100 },
  { label: "Gemiddeld (9-12 panelen)", value: 'medium', representativeCount: 10, avgProduction: 3500 },
  { label: "Groot (13+ panelen)", value: 'large', representativeCount: 16, avgProduction: 5600 },
];

export const hasSolarOptions = [
  { label: "Ja", value: true },
  { label: "Nee", value: false },
];

export const houseTypeOptions = [
  { label: "Ruime tussenwoning (>120m²)", value: "ruime-tussenwoning" },
  { label: "Tussenwoning", value: "tussenwoning" },
  { label: "Vrijstaande woning", value: "vrijstaand" },
  { label: "Twee-onder-een-kap", value: "twee-onder-een-kap" },
  { label: "Hoekwoning", value: "hoekwoning" },
  { label: "Appartement", value: "appartement" },
  { label: "Anders (bijv. chalet)", value: "anders" },
];

export const constructionYearOptions = [
  { label: "Voor 1945", value: "<1945" },
  { label: "1945-1970", value: "1945-1970" },
  { label: "1971-1980", value: "1971-1980" },
  { label: "1981-1990", value: "1981-1990" },
  { label: "1991-2000", value: "1991-2000" },
  { label: "2001-2015", value: "2001-2015" },
  { label: "Na 2015", value: ">2015" },
  { label: "Onbekend", value: "onbekend" },
];

export const isolationLevels = [
  { 
    label: "Uitstekend geïsoleerd", 
    value: "excellent",
    description: "Vloeren, muren en dak goed geïsoleerd, HR++ glas of beter"
  },
  { 
    label: "Redelijk geïsoleerd", 
    value: "good",
    description: "Bijv. dubbel glas, spouwmuur of dakisolatie aanwezig"
  },
  { 
    label: "Matig geïsoleerd", 
    value: "moderate",
    description: "Oudere woning, deels geïsoleerd"
  },
  { 
    label: "Slecht geïsoleerd of onbekend", 
    value: "poor",
    description: "Weinig tot geen isolatiemaatregelen"
  },
];

export const availableSpaceOptions = [
  { label: "Ja, voldoende ruimte beschikbaar", value: "voldoende" },
  { label: "Mogelijk, moet nog goed bekeken worden", value: "mogelijk" },
  { label: "Nee, waarschijnlijk niet genoeg ruimte", value: "onvoldoende" },
  { label: "Weet ik niet", value: "onbekend" },
];

export const heatingSystemOptions = {
  mainSystem: [
    { label: "CV-ketel op gas", value: "cv-gas" },
    { label: "CV-ketel + hybride warmtepomp", value: "cv-hybride" },
    { label: "All electric warmtepomp", value: "wp-all-electric" },
    { label: "Stadsverwarming", value: "stadsverwarming" },
    { label: "Elektrische verwarming", value: "elektrisch" },
    { label: "Anders", value: "anders" },
    { label: "Weet ik niet", value: "onbekend" },
  ],
  systemAge: [
    { label: "0-5 jr", value: "0-5" },
    { label: "6-10 jr", value: "6-10" },
    { label: "11-15 jr", value: "11-15" },
    { label: "> 15 jr", value: "15+" },
    { label: "?", value: "onbekend" },
  ],
  hasBoiler: [
    { label: "Ja", value: true },
    { label: "Nee", value: false },
    { label: "Weet ik niet", value: "onbekend" },
  ],
  boilerType: [
    { label: "Elektrische boiler", value: "elektrisch" },
    { label: "Indirect gestookte boiler (via CV-ketel)", value: "indirect" },
    { label: "Gasboiler (apart)", value: "gas" },
    { label: "Zonneboiler (thermisch)", value: "zonneboiler" },
    { label: "Anders", value: "anders" },
    { label: "Weet ik niet", value: "onbekend" },
  ],
  boilerAge: [
    { label: "0-5 jr", value: "0-5" },
    { label: "6-10 jr", value: "6-10" },
    { label: "11-15 jr", value: "11-15" },
    { label: "> 15 jr", value: "15+" },
    { label: "?", value: "onbekend" },
  ],
  hasCirculation: [
    { label: "Ja", value: true },
    { label: "Nee", value: false },
    { label: "Weet ik niet", value: "onbekend" },
  ],
};