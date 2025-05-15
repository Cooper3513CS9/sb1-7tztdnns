import React from 'react';
import { Check, Edit, ArrowRight, Users, Home, Sun, Star } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import { 
  showerDurationOptions, showerHeadTypes, solarPanelGroups,
  houseTypeOptions, constructionYearOptions, availableSpaceOptions, 
  importanceLevels 
} from '../../config/formOptions';

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

function SummaryItem({ label, value, className = "text-slate-700", icon }: SummaryItemProps) {
  return (
    <div className="flex justify-between items-center py-2.5 border-b border-slate-100 last:border-b-0">
      <dt className="text-slate-500 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </dt>
      <dd className={`font-medium ${className}`}>{value}</dd>
    </div>
  );
}

interface SummarySectionProps {
  title: string;
  children: React.ReactNode;
  editStep: string;
  icon?: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

function SummarySection({ title, children, editStep, icon, gradientFrom, gradientTo }: SummarySectionProps) {
  const { goToStep, colors } = useUserData();
  
  const headerStyle = gradientFrom && gradientTo ? {
    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
  } : {};

  return (
    <div className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
      <div className="p-4" style={headerStyle}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-white flex items-center text-lg">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h3>
          <button 
            onClick={() => goToStep(editStep)} 
            className="text-xs font-medium bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full flex items-center transition-colors duration-200"
          >
            <Edit size={14} className="inline mr-1" /> Wijzigen
          </button>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-inner">
          <dl className="space-y-1">{children}</dl>
        </div>
      </div>
    </div>
  );
}

export default function Step6Summary() {
  const { userData, calculateAllResults, colors } = useUserData();
  const { household, housing, solar, priorities = [] } = userData;

  const getImportanceLabel = (importanceValue: number) => {
    if (importanceValue === 5) {
      return <span className="text-orange-600 font-bold">Zeer Belangrijk</span>;
    } else if (importanceValue === 3) {
      return <span className="text-blue-600 font-semibold">Belangrijk</span>;
    } else {
      return <span className="text-slate-600">Standaard</span>;
    }
  };

  return (
    <Card title="Stap 6: Controleer Uw Gegevens" icon={<Check size={28} style={{color: colors.primary}}/>}>
      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Bijna klaar voor uw persoonlijke advies!</h3>
        <p className="text-blue-600">
          We hebben alle informatie verzameld om uw voordeel te berekenen. 
          Controleer alstublieft of alle gegevens correct zijn.
        </p>
      </div>
      
      <div className="space-y-6 text-sm">
        <SummarySection 
          title="Huishouden" 
          editStep="intake-step1"
          icon={<Users size={24} />}
          gradientFrom={colors.primary}
          gradientTo="#1e40af"
        >
          <SummaryItem label="Aantal personen" value={household.persons} />
          <SummaryItem label="Douches p.p. per dag" value={household.showersPerPerson} />
          <SummaryItem 
            label="Douchetijd" 
            value={showerDurationOptions.find(o => o.value === household.showerDurationCategory)?.label || `${household.showerDurationCategory} min`} 
          />
          <SummaryItem 
            label="Type douchekop" 
            value={showerHeadTypes.find(s => s.value === household.showerHeadType)?.label || household.showerHeadType} 
          />
          <SummaryItem label="Bad aanwezig" value={household.hasBath ? 'Ja' : 'Nee'} />
        </SummarySection>

        <SummarySection 
          title="Woonsituatie" 
          editStep="intake-step3"
          icon={<Home size={24} />}
          gradientFrom={colors.secondary}
          gradientTo="#c2410c"
        >
          <SummaryItem 
            label="Type woning" 
            value={houseTypeOptions.find(o => o.value === housing.houseType)?.label || housing.houseType} 
          />
          <SummaryItem 
            label="Bouwjaar" 
            value={constructionYearOptions.find(o => o.value === housing.constructionYearCategory)?.label || housing.constructionYearCategory} 
          />
          <SummaryItem 
            label="Beschikbare ruimte" 
            value={availableSpaceOptions.find(o => o.value === housing.availableSpace)?.label || housing.availableSpace} 
          />
        </SummarySection>

        <SummarySection 
          title="Zonnepanelen" 
          editStep="intake-step4"
          icon={<Sun size={24} />}
          gradientFrom={colors.accent}
          gradientTo="#15803d"
        >
          {solar.knowsExactSolarData ? (
            <>
              <SummaryItem label="Aantal panelen" value={solar.panels} />
              <SummaryItem label="Jaaropbrengst" value={`${solar.yearlyProduction} kWh`} />
            </>
          ) : (
            <SummaryItem 
              label="Geschat aantal panelen" 
              value={solarPanelGroups.find(g => g.value === solar.panelsCategory)?.label || solar.panelsCategory} 
            />
          )}
          <SummaryItem label="Huidig eigen verbruik" value={`${solar.selfConsumption}%`} />
        </SummarySection>

        <SummarySection 
          title="Uw Ingestelde Prioriteiten" 
          editStep="intake-step5"
          icon={<Star size={24} />}
          gradientFrom="#6366f1"
          gradientTo="#4f46e5"
        >
          {Array.isArray(priorities) && priorities.map((p) => (
            <SummaryItem 
              key={p.id} 
              label={p.label} 
              value={getImportanceLabel(p.importance)}
              className={
                p.importance === 5 
                  ? 'text-orange-600 font-bold' 
                  : p.importance === 3 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-slate-600'
              }
            />
          ))}
        </SummarySection>
      </div>

      <div className="mt-10 bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-100 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-green-800 mb-2">Klaar om uw voordeel te berekenen!</h3>
            <p className="text-green-700 mb-4">
              We hebben alle benodigde informatie verzameld om uw persoonlijke voordeel met NEStore te berekenen.
              Klik op de knop hieronder om de berekening te starten.
            </p>
          </div>
          <div className="flex-shrink-0 hidden sm:block">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
              <ArrowRight size={32} className="text-white" />
            </div>
          </div>
        </div>
        <StepNavigation 
          prevStep="intake-step5" 
          nextStep="comparison-page" 
          onNextClick={calculateAllResults} 
          nextLabel="Mijn Voordeel Berekenen & Vergelijken" 
        />
      </div>

      <StepProgress step={6} stepTitle="Samenvatting" />
    </Card>
  );
}