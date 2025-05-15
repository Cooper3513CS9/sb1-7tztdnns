import React from 'react';
import { Zap } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import CounterInput from '../inputs/CounterInput';
import InputField from '../inputs/InputField';
import CheckboxField from '../inputs/CheckboxField';
import RadioGroupField from '../inputs/RadioGroupField';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import { hasSolarOptions, solarPanelGroups } from '../../config/formOptions';

export default function Step3Solar() {
  const { userData, updateUserData, colors } = useUserData();
  const { solar } = userData;
  
  return (
    <Card title="Stap 4: Uw Zonnepanelen" icon={<Zap size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">
        Heeft u zonnepanelen op uw woning?
      </p>

      <RadioGroupField
        label="Zonnepanelen aanwezig"
        options={hasSolarOptions}
        currentValue={solar.hasSolar}
        section="solar"
        fieldName="hasSolar"
        displayAs="blocks"
      />
      
      {solar.hasSolar && (
        <>
          <CheckboxField
            label="Ik weet de exacte gegevens van mijn zonnepanelen"
            checked={solar.knowsExactSolarData}
            section="solar"
            fieldName="knowsExactSolarData"
          />

          {solar.knowsExactSolarData ? (
            <>
              <CounterInput
                label="Exact aantal zonnepanelen"
                value={solar.panels}
                section="solar"
                fieldName="panels"
                min={0}
              />
              <InputField
                label="Exacte jaarlijkse opbrengst van uw zonnepanelen"
                type="number"
                name="yearlyProduction"
                value={solar.yearlyProduction}
                section="solar"
                fieldName="yearlyProduction"
                unit="kWh"
                helpText="U vindt dit meestal op de omvorter of in uw monitoring app."
                min={0}
              />
            </>
          ) : (
            <RadioGroupField
              label="Geschat aantal zonnepanelen"
              options={solarPanelGroups}
              currentValue={solar.panelsCategory}
              section="solar"
              fieldName="panelsCategory" 
              helpText="We maken een schatting van uw jaaropbrengst op basis van deze keuze."
              displayAs="blocks" 
            />
          )}
          
          <div className="mt-6">
            <label htmlFor="selfConsumption" className="block text-sm font-medium text-slate-700 mb-1">
              Huidig percentage eigen verbruik van uw zonnestroom ({solar.selfConsumption}%)
            </label>
            <input
              type="range"
              id="selfConsumption"
              name="selfConsumption"
              min="0"
              max="100"
              step="1"
              value={solar.selfConsumption}
              onChange={(e) => updateUserData('solar', { selfConsumption: parseInt(e.target.value, 10) })}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2 mb-1"
              style={{accentColor: colors.primary}}
            />
            <p className="text-xs text-slate-500">
              Dit is het deel van uw opgewekte zonnestroom dat u direct zelf verbruikt. Gemiddeld is dit 30-40% zonder opslag.
            </p>
          </div>
        </>
      )}

      <StepNavigation prevStep="heating" nextStep="household" />
      <StepProgress step={4} stepTitle="Zonnepanelen" /> 
    </Card>
  );
}