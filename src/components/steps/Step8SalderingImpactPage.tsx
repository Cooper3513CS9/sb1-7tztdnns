import React, { useState, useEffect } from 'react';
import { Percent, Info, TrendingUp } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import LoadingOverlay from '../common/LoadingOverlay';

export default function Step8SalderingImpactPage() {
  const { userData, colors, getActiveRates, goToStep } = useUserData();
  const { solar, results } = userData;
  const rates = getActiveRates();

  useEffect(() => {
    if (!results || results.yearlyBenefit === null || !results.recommendedModelCode) {
      goToStep('comparison-page');
    }
  }, [results, goToStep]);

  if (!rates || !solar || !results || !results.recommendedModelCode) return <LoadingOverlay />;

  const yearlyProduction = solar.yearlyProduction;
  const currentSelfConsumptionPerc = solar.selfConsumption;
  const nestoreSelfConsumptionPerc = 85;

  // Calculate values for current situation
  const currentSelfUsed = yearlyProduction * (currentSelfConsumptionPerc / 100);
  const currentExported = yearlyProduction * (1 - (currentSelfConsumptionPerc / 100));
  
  const nestoreSelfUsed = yearlyProduction * (nestoreSelfConsumptionPerc / 100);
  const nestoreExported = yearlyProduction * (1 - (nestoreSelfConsumptionPerc / 100));

  // Calculate financial values
  const currentValueSelfUsed = Math.round(currentSelfUsed * rates.electricity_rate_normal);
  const currentValueExported = Math.round(currentExported * rates.electricity_feedin_future_rate);
  const currentTotalValue = currentValueSelfUsed + currentValueExported;

  const nestoreValueSelfUsed = Math.round(nestoreSelfUsed * rates.electricity_rate_normal);
  const nestoreValueExported = Math.round(nestoreExported * rates.electricity_feedin_future_rate);
  const nestoreTotalValue = nestoreValueSelfUsed + nestoreValueExported;

  const extraBenefit = nestoreTotalValue - currentTotalValue;

  return (
    <Card title="Stap 9: Impact van de afschaffing van de salderingsregeling" icon={<Percent size={28} style={{color: colors.primary}} />}>
      <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl border border-blue-100 mb-8">
        <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
          <Info size={20} className="mr-2" />
          Belangrijke verandering in 2027
        </h3>
        <p className="text-blue-700">
          Vanaf 1 januari 2027 wordt de salderingsregeling volledig afgeschaft. U mag dan uw teruggeleverde zonnestroom niet meer verrekenen met uw verbruik. 
          Voor teruggeleverde stroom ontvangt u een lagere vergoeding, gemiddeld circa €{rates.electricity_feedin_future_rate.toFixed(2)} per kWh (afhankelijk van uw energieleverancier).
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h4 className="text-xl font-semibold mb-4">
          Vergelijking zonder en met NEStore (bij een jaaropbrengst van {yearlyProduction.toLocaleString()} kWh):
        </h4>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h5 className="font-medium text-lg text-slate-700">Zonder NEStore</h5>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Eigen gebruik ({currentSelfConsumptionPerc}%)</span>
                <span className="font-semibold">€{currentValueSelfUsed.toLocaleString()},-</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Teruglevering ({100 - currentSelfConsumptionPerc}%)</span>
                <span className="font-semibold">€{currentValueExported.toLocaleString()},-</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="font-medium">Totale waarde opgewekte stroom</span>
                <span className="font-semibold">€{currentTotalValue.toLocaleString()},-</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-medium text-lg text-green-700 flex items-center">
              <TrendingUp size={20} className="mr-2" />
              Met NEStore
            </h5>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="flex justify-between items-center mb-2">
                <span>Eigen gebruik ({nestoreSelfConsumptionPerc}%)</span>
                <span className="font-semibold text-green-700">€{nestoreValueSelfUsed.toLocaleString()},-</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Teruglevering ({100 - nestoreSelfConsumptionPerc}%)</span>
                <span className="font-semibold">€{nestoreValueExported.toLocaleString()},-</span>
              </div>
              <div className="mt-3 pt-3 border-t border-green-200 flex justify-between items-center">
                <span className="font-medium">Totale waarde opgewekte stroom</span>
                <span className="font-semibold text-green-700">€{nestoreTotalValue.toLocaleString()},-</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl mb-8">
        <h4 className="text-lg font-semibold mb-4">Prijs per kWh:</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Zelf gebruikt:</span>
              <span className="font-semibold text-green-600">€{rates.electricity_rate_normal.toFixed(2)}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span>Teruggeleverd:</span>
              <span className="font-semibold text-orange-600">€{rates.electricity_feedin_future_rate.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
        <h4 className="text-lg font-semibold text-green-800 mb-2">Besparing dankzij NEStore:</h4>
        <p className="text-green-700 mb-4">
          Doordat u meer stroom zelf gebruikt (van {currentSelfConsumptionPerc}% naar {nestoreSelfConsumptionPerc}%), 
          verhoogt u de waarde van uw zonnestroom.
        </p>
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Extra jaarlijkse besparing:</span>
            <span className="text-xl font-bold text-green-600">€{extraBenefit.toLocaleString()},-</span>
          </div>
        </div>
      </div>

      <StepNavigation 
        prevStep="comparison-page" 
        nextStep="contact-form-page" 
        nextLabel="Naar Contact & Advies" 
      />
      <StepProgress step={9} stepTitle="Impact Saldering" />
    </Card>
  );
}