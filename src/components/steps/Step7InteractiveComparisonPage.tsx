import React, { useState, useEffect } from 'react';
import { BarChart3, Lightbulb, Info } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import InfoBox from '../common/InfoBox';
import LoadingOverlay from '../common/LoadingOverlay';

export default function Step7InteractiveComparisonPage() {
  const { userData, colors, comparisonData: compDataFromContext, comparisonCriteriaConfig, goToStep, nestoreProductSpecs, comparisonInfoboxContent } = useUserData();
  const { results } = userData;
  const [activeCriterionId, setActiveCriterionId] = useState(comparisonCriteriaConfig[0].id);

  useEffect(() => {
    if (!results || !results.recommendedModelCode) {
      goToStep('summary-check');
    }
  }, [results, goToStep]);

  if (!results || !results.recommendedModelCode) {
    return <LoadingOverlay />;
  }

  const recommendedSpec = nestoreProductSpecs[results.recommendedModelCode];
  if (!recommendedSpec) {
    return (
      <Card title="Fout bij laden data" icon={<Info size={28} style={{color: colors.primary}}/>}>
        <p>Productspecificaties voor het aanbevolen model konden niet worden geladen.</p>
        <StepNavigation prevStep="summary-check" />
      </Card>
    );
  }

  const productsToCompare = [
    {
      name: recommendedSpec.name,
      opslagcapaciteit: recommendedSpec.energy_capacity,
      warmwater_volume: recommendedSpec.water_volume_40c,
      levensduur: "30+",
      eigen_gebruik_zon: "85-90%",
      brandveiligheid_score: 3,
      max_temperatuur: recommendedSpec.max_temperature,
      gasbesparing_potentieel: "Tot 90-100%",
      laadflexibiliteit: "Zeer Hoog (Zon & Net, prijsgestuurd, anticipeert)",
      productielocatie: "Nederland",
      isNEStore: true,
      short_description: "Slimme warmteopslag voor maximaal eigen verbruik en comfort.",
    },
    compDataFromContext.warmtepomp_boiler,
    compDataFromContext.lithium_thuisbatterij,
    compDataFromContext.zonnestroomboiler,
  ];

  const activeCriterion = comparisonCriteriaConfig.find(c => c.id === activeCriterionId);
  if (!activeCriterion) {
    setActiveCriterionId(comparisonCriteriaConfig[0].id);
    return <LoadingOverlay />;
  }

  const getBarPercentage = (value: any, maxValue: number | undefined, isTextOrScore: boolean | undefined) => {
    if (isTextOrScore) {
      // Special handling for lifespan text values
      if (activeCriterion.id === 'levensduur') {
        const numericValue = parseInt(value.split('-')[1] || value.split('+')[0]);
        return Math.min(100, Math.max(5, (numericValue / 30) * 100));
      }
      return 5;
    }
    if (typeof value !== 'number' || value === 0 || !maxValue || maxValue === 0) return 5;
    return Math.min(100, Math.max(5, (value / maxValue) * 100));
  };

  const getBrandveiligheidText = (score: number) => {
    if (activeCriterion.scoreLabels && score >= 0 && score < activeCriterion.scoreLabels.length) {
      return activeCriterion.scoreLabels[score];
    }
    return "Onbekend";
  };

  const IconComponent = activeCriterion.icon || Lightbulb;
  const infoBoxText = comparisonInfoboxContent[activeCriterion.id] || comparisonInfoboxContent.default;

  return (
    <Card title="Stap 7: NEStore vs. Alternatieven" icon={<BarChart3 size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">
        Vergelijk de aanbevolen NEStore {results.recommendedModelCode} met andere oplossingen op basis van verschillende criteria. Klik op een criterium om de details te zien.
      </p>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {comparisonCriteriaConfig.map(criterion => {
            const CritIcon = criterion.icon || Lightbulb;
            return (
              <button
                key={criterion.id}
                onClick={() => setActiveCriterionId(criterion.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg flex items-center transition-all duration-200 ${
                  activeCriterionId === criterion.id
                    ? 'text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={activeCriterionId === criterion.id ? {
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.gradients.accent[1]})`
                } : {}}
              >
                <CritIcon size={16} className="mr-2" />
                {criterion.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeCriterion && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center mb-3">
            <IconComponent size={20} className="mr-2" style={{color: colors.accent}} />
            <h4 className="text-lg font-semibold text-slate-700">{activeCriterion.label}</h4>
          </div>
          <p className="text-sm text-slate-600 mb-4">{activeCriterion.tooltip}</p>

          <div className="space-y-4">
            {productsToCompare.map(product => {
              const value = product[activeCriterion.dataKey];
              let displayValue = 'N.v.t.';
              if (activeCriterion.isScore) {
                displayValue = getBrandveiligheidText(value);
              } else if (activeCriterion.isText) {
                displayValue = value + (activeCriterion.unit && (typeof value === 'string' && !value.includes(activeCriterion.unit)) ? ` ${activeCriterion.unit}` : '');
              } else if (typeof value === 'number') {
                displayValue = `${value.toLocaleString()} ${activeCriterion.unit || ''}`;
              }

              const barPercentage = getBarPercentage(
                typeof value === 'number' ? value : (activeCriterion.isScore ? value : value),
                activeCriterion.maxValue,
                activeCriterion.isText || activeCriterion.isScore
              );

              const isNederland = activeCriterion.id === 'productielocatie' && value === 'Nederland';
              const isAzie = activeCriterion.id === 'productielocatie' && value === 'Veelal Azië';

              return (
                <div key={product.name} className="p-3 border border-slate-200 rounded-md bg-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-medium ${product.isNEStore ? 'text-green-600' : 'text-slate-700'}`}>
                      {product.name}
                    </span>
                    <span className={`text-sm font-semibold flex items-center ${product.isNEStore ? 'text-green-600' : 'text-blue-600'}`}>
                      {activeCriterion.id === 'productielocatie' && isNederland && <span title="Nederland" className="mr-1">🇳🇱</span>}
                      {activeCriterion.id === 'productielocatie' && isAzie && <span title="Azië" className="mr-1">🌏</span>}
                      {activeCriterion.id === 'productielocatie' && !isNederland && !isAzie && value === "Divers" && <span title="Divers" className="mr-1">🌍</span>}
                      {displayValue}
                    </span>
                  </div>
                  {!activeCriterion.isText && !activeCriterion.isScore && (
                    <div className="w-full bg-slate-200 rounded-full h-3.5">
                      <div
                        className="h-3.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${barPercentage}%`,
                          background: product.isNEStore 
                            ? `linear-gradient(135deg, ${colors.accent}, ${colors.gradients.accent[1]})`
                            : `linear-gradient(135deg, ${colors.primary}, ${colors.gradients.primary[1]})`
                        }}
                      ></div>
                    </div>
                  )}
                  {activeCriterion.id === 'levensduur' && (
                    <div className="w-full bg-slate-200 rounded-full h-3.5 mt-1">
                      <div
                        className="h-3.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${barPercentage}%`,
                          background: product.isNEStore 
                            ? `linear-gradient(135deg, ${colors.accent}, ${colors.gradients.accent[1]})`
                            : `linear-gradient(135deg, ${colors.primary}, ${colors.gradients.primary[1]})`
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <InfoBox>{infoBoxText}</InfoBox>

      <StepNavigation prevStep="summary-check" nextStep="saldering-impact-page" nextLabel="Impact Saldering" />
      <StepProgress step={7} stepTitle="Vergelijking" />
    </Card>
  );
}