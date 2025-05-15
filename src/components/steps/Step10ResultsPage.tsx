import React, { useEffect } from 'react';
import { 
  CheckCircle2, Info, Star, MinusCircle, AlertTriangle, 
  Download, MessageSquare, TrendingUp, Sun, Flame, Droplet, 
  Leaf, Shield, Home, ListOrdered
} from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import StepProgress from '../common/StepProgress';
import StepNavigation from '../common/StepNavigation';
import LoadingOverlay from '../common/LoadingOverlay';
import { houseTypeOptions, heatingSystemOptions } from '../../config/formOptions';

interface KeyFigureBoxProps {
  label: string;
  value: React.ReactNode;
  subtext?: string;
  color?: "green" | "blue" | "slate";
}

function KeyFigureBox({ label, value, subtext, color = "blue" }: KeyFigureBoxProps) {
  const { colors } = useUserData();
  const colorStyles = {
    green: { bg: 'bg-green-50', text: colors.accent, border: 'border-green-200' },
    blue: { bg: colors.light, text: colors.primary, border: `${colors.primary}30` },
    slate: { bg: 'bg-slate-100', text: colors.textDark, border: 'border-slate-200' },
  };
  const selectedStyle = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`p-4 rounded-lg shadow-md ${selectedStyle.bg}`} style={{border: `1px solid ${selectedStyle.border}`}}>
      <p className="text-sm font-medium" style={{color: selectedStyle.text}}>{label}</p>
      <p className="text-3xl font-bold mt-1" style={{color: selectedStyle.text}}>{value}</p>
      {subtext && <p className="text-xs mt-1" style={{color: selectedStyle.text}}>{subtext}</p>}
    </div>
  );
}

interface SpecItemProps {
  label: string;
  value: React.ReactNode;
}

function SpecItem({ label, value }: SpecItemProps) {
  return (
    <>
      <dt className="text-slate-500">{label}:</dt>
      <dd className="text-slate-700 font-medium">{value}</dd>
    </>
  );
}

interface ExplanationBlockProps {
  title: string;
  text: string;
}

function ExplanationBlock({ title, text }: ExplanationBlockProps) {
  const { colors } = useUserData();
  return (
    <div className="mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
      <div className="flex items-center mb-2 text-slate-700">
        <Info size={20} className="mr-2 flex-shrink-0" style={{color: colors.secondary}}/>
        <h4 className="text-md font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-slate-600 whitespace-pre-line">{text}</p>
    </div>
  );
}

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  primary?: boolean;
  icon?: React.ReactNode;
}

function ActionButton({ label, onClick, primary = false, icon }: ActionButtonProps) {
  const { colors } = useUserData();
  const baseClasses = "w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 border rounded-lg shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";
  const primaryClasses = `text-white focus:ring-orange-400`;
  const secondaryClasses = `border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:ring-blue-500`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
      style={primary ? {backgroundColor: colors.secondary, borderColor: colors.secondary} : {}}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}

export default function Step10ResultsPage() {
  const { userData, colors, productAlternativesConfig, explanationContent, nestoreProductSpecs, goToStep } = useUserData();
  const { results, priorities, contact, housing, heating, household } = userData;

  useEffect(() => {
    if (!results || results.yearlyBenefit === null || !contact.submitted || !results.recommendedModelCode) {
      goToStep('contact-form-page');
    }
  }, [results, contact, goToStep]);

  if (!results || !results.recommendedModelCode || !contact.submitted) {
    return <LoadingOverlay />;
  }
  
  const recommendedSpec = nestoreProductSpecs[results.recommendedModelCode];
  if (!recommendedSpec) {
    console.error("Aanbevolen specificaties niet gevonden voor model:", results.recommendedModelCode);
    return (
      <Card title="Fout bij laden resultaten" icon={<Info size={28} style={{color: colors.primary}}/>}>
        <p>Er is een onverwachte fout opgetreden bij het laden van de productdetails.</p>
      </Card>
    );
  }

  const sortedPriorities = [...priorities].sort((a, b) => {
    if (b.importance !== a.importance) {
      return b.importance - a.importance;
    }
    const originalIndexA = userData.priorities.findIndex(p => p.id === a.id);
    const originalIndexB = userData.priorities.findIndex(p => p.id === b.id);
    return originalIndexA - originalIndexB;
  });

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = { 
      TrendingUp: <TrendingUp />,
      Sun: <Sun />,
      Flame: <Flame />,
      Droplet: <Droplet />,
      Leaf: <Leaf />,
      Shield: <Shield />,
      Home: <Home />,
      ListOrdered: <ListOrdered />
    };
    return icons[iconName] || <ListOrdered />;
  };

  const allPriorityBenefits = sortedPriorities.map((priority) => {
    const benefitDetails = productAlternativesConfig.nestore.priorityBenefits[priority.id];
    return benefitDetails ? { 
      ...benefitDetails, 
      originalLabel: priority.label, 
      importance: priority.importance,
      icon: getIconComponent(priority.iconName)
    } : null;
  }).filter(benefit => benefit !== null);

  const showPlacementNudge = housing.availableSpace === 'beperkt' && results.recommendedModelCode === 'E30';
  const totalYearlySavings = (results.yearlyBenefit || 0) + 
                            (results.yearlyLossSaldering || 0) + 
                            (results.extraSavingsFromHeating || 0);

  const showHeatingSystemSavings = results.extraSavingsFromHeating && results.extraSavingsFromHeating > 0;
  const hasIndirectBoiler = heating.hasBoiler && heating.boilerType === 'indirect';
  const hasOldBoiler = heating.boilerAge === '15+' || heating.boilerAge === '11-15';
  const hasCirculation = heating.hasCirculation === true;
  const heatingSystemLabel = heatingSystemOptions.mainSystem.find(o => o.value === heating.mainHeatingSystem)?.label;

  const getHeatingContext = () => {
    const parts = [];
    if (hasIndirectBoiler) parts.push('indirect gestookte boiler');
    if (hasOldBoiler) parts.push('verouderde warmwatervoorziening');
    if (hasCirculation) parts.push('warmwatercirculatie');
    return parts.length > 0 ? ` met ${parts.join(' en ')}` : '';
  };

  return (
    <Card title="Stap 11: Uw Gedetailleerd NEStore Advies" icon={<CheckCircle2 size={28} style={{color: colors.accent}}/>}>
      <p className="text-slate-600 mb-6">
        Hieronder vindt u de specifieke voordelen van de NEStore {results.recommendedModelCode} voor uw {household.persons}-persoons 
        huishouden in uw {houseTypeOptions.find(o => o.value === housing.houseType)?.label.toLowerCase() || 'woning'}
        {housing.constructionYearCategory !== 'onbekend' ? ` uit ${housing.constructionYearCategory}` : ''}{getHeatingContext()}.
      </p>

      {showPlacementNudge && (
        <div className="mt-6 p-4 rounded-lg flex items-start" style={{backgroundColor: colors.light, border: `1px solid ${colors.primary}30`}}>
          <AlertTriangle size={20} className="text-orange-500 mr-2 flex-shrink-0" />
          <p className="text-sm" style={{color: colors.textMedium}}>
            Let op: U heeft aangegeven beperkte ruimte te hebben. De aanbevolen NEStore {results.recommendedModelCode} is {recommendedSpec.height_cm}cm hoog. 
            Controleer of dit past in uw beoogde installatieruimte.
          </p>
        </div>
      )}

      <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-200 shadow-lg">
        <h3 className="text-xl font-bold text-green-700 mb-2">
          Ons Advies: NEStore {results.recommendedModelCode} Warmtebatterij
        </h3>
        <p className="text-md text-green-600">
          Perfect voor uw situatie met {userData.solar.panels} zonnepanelen en {heatingSystemLabel?.toLowerCase()}
          {getHeatingContext()}.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <KeyFigureBox 
          label="Jaarlijkse besparing" 
          value={`€${totalYearlySavings.toLocaleString()}`} 
          subtext={showHeatingSystemSavings ? `Incl. €${results.extraSavingsFromHeating?.toLocaleString()} gasbesparing` : "Na afbouw saldering"} 
          color="green" 
        />
        <KeyFigureBox 
          label="Terugverdientijd" 
          value={results.paybackYearsAfterSaldering === Infinity ? "N.v.t." : `${results.paybackYearsAfterSaldering} jaar`} 
          subtext={`Rendement: ${results.paybackYearsAfterSaldering === Infinity || results.paybackYearsAfterSaldering === 0 ? "N.v.t." : `${Math.round(100 / results.paybackYearsAfterSaldering)}%`}`} 
          color="blue" 
        />
        <KeyFigureBox 
          label="CO₂ reductie" 
          value={`${results.co2SavingInKg.toLocaleString()} kg/jaar`} 
          subtext={`Equivalent aan ${Math.round(results.co2SavingInKg / 20)} bomen`} 
          color="slate" 
        />
      </div>
      
      <div className="mb-8 bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3 text-lg text-slate-700">Specificaties {recommendedSpec.name}:</h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <SpecItem label="Energiecapaciteit" value={`${recommendedSpec.energy_capacity} kWh`} />
          <SpecItem label="Warmwatervolume (@40°C)" value={`± ${recommendedSpec.water_volume_40c} liter`} />
          <SpecItem label="Warm water voor uw gezin" value={`± ${results.waterCapacityInDays === Infinity ? "onbeperkt" : results.waterCapacityInDays + " dagen"}`} />
          <SpecItem label="Stilstandverlies" value={`${recommendedSpec.standby_loss} kWh/dag`} />
          <SpecItem label="Afmetingen (HxBxD)" value={`${recommendedSpec.height_cm}x${recommendedSpec.width_cm}x${recommendedSpec.depth_cm} cm`} />
          <SpecItem label="Vermogen element" value={`${recommendedSpec.heating_element_kw} kW`} />
        </div>
      </div>

      {allPriorityBenefits.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">NEStore en Uw Prioriteiten</h3>
          <p className="text-sm text-slate-600 mb-4">
            Hieronder ziet u hoe NEStore aansluit bij uw aangegeven prioriteiten, met de belangrijkste eerst.
          </p>
          <div className="space-y-4">
            {allPriorityBenefits.map((benefit, index) => {
              let cardBg = 'bg-white border-slate-200';
              let titleColor = colors.primary;
              let textColor = 'text-slate-700';
              if (benefit.importance === 5) {
                cardBg = 'bg-orange-50 border-orange-300';
                titleColor = colors.secondary;
                textColor = 'text-orange-700';
              } else if (benefit.importance === 3) {
                cardBg = 'bg-yellow-50 border-yellow-300';
                titleColor = '#F59E0B';
                textColor = 'text-yellow-700';
              }

              const Icon = benefit.icon;
              return (
                <div key={benefit.originalLabel + index} className={`border rounded-lg p-4 shadow-sm ${cardBg}`}>
                  <div className="flex items-center mb-2" style={{color: titleColor}}>
                    {benefit.importance === 5 && <Star size={20} className="mr-2 text-orange-500" fill="currentColor"/>}
                    {benefit.importance === 3 && <CheckCircle2 size={20} className="mr-2 text-yellow-500"/>}
                    {benefit.importance === 2 && <MinusCircle size={20} className="mr-2 text-slate-500"/>}
                    <div className="mr-3">{Icon}</div>
                    <h4 className={`text-lg font-semibold ${textColor}`}>{benefit.title}</h4>
                  </div>
                  <ul className="list-disc list-inside text-sm text-slate-600 pl-4 space-y-1">
                    {benefit.points.map((point, i) => <li key={i}>{point}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <ExplanationBlock title={explanationContent.eigenVerbruik.title} text={explanationContent.eigenVerbruik.explanation} />
      <ExplanationBlock title={explanationContent.waaromGeenZonneboilerVoorSalderen.title} text={explanationContent.waaromGeenZonneboilerVoorSalderen.explanation} />
      <ExplanationBlock title={explanationContent.nederlandsProduct.title} text={explanationContent.nederlandsProduct.explanation} />

      <div className="bg-slate-800 text-white p-6 rounded-lg shadow-xl mt-10">
        <h3 className="text-2xl font-bold mb-4">Klaar voor de Toekomst met NEStore!</h3>
        <p className="mb-3">
          De NEStore {results.recommendedModelCode} biedt u een slimme, veilige en duurzame oplossing om uw energiekosten te verlagen, 
          comfort te verhogen en bij te dragen aan een stabieler energienet.
        </p>
        <ul className="list-disc list-inside space-y-1 mb-6 pl-4">
          {productAlternativesConfig.nestore.general_benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
          {recommendedSpec.benefits.map((benefit, i) => <li key={`spec-${i}`}>{benefit}</li>)}
        </ul>
        <h4 className="text-lg font-semibold mb-2">Volgende stappen:</h4>
        <ol className="list-decimal list-inside space-y-1 mb-6 pl-4">
          <li>Download uw persoonlijke adviesrapport hieronder.</li>
          <li>Plan een vrijblijvend adviesgesprek met een NEStore specialist.</li>
          <li>Ontvang een offerte op maat.</li>
          <li>Geniet van de voordelen van NEStore!</li>
        </ol>
        <div className="flex flex-col sm:flex-row gap-4">
          <ActionButton icon={<Download />} label="Download Adviesrapport (PDF)" primary={true} onClick={() => alert("PDF download nog niet geïmplementeerd")} />
          <ActionButton icon={<MessageSquare />} label="Plan Adviesgesprek" onClick={() => alert("Adviesgesprek plannen nog niet geïmplementeerd")} />
        </div>
      </div>

      <StepNavigation 
        prevStep="contact-form-page"
        nextLabel="Download Adviesrapport" 
      />
      <StepProgress step={11} stepTitle="Uw Persoonlijk Advies" />
    </Card>
  );
}