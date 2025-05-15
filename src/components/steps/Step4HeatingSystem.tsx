import React from 'react';
import { Flame } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import RadioGroupField from '../inputs/RadioGroupField';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import InfoBox from '../common/InfoBox';
import { heatingSystemOptions } from '../../config/formOptions';

export default function Step4HeatingSystem() {
  const { userData, colors, updateUserData } = useUserData();
  const { heating } = userData;
  
  const showBoilerAge = heating.hasBoiler === true;
  const showBoilerType = heating.hasBoiler === true;
  const showHeatingSystemAge = heating.mainHeatingSystem === 'cv-gas';
  
  return (
    <Card title="Stap 4: Uw Verwarming & Warm Water" icon={<Flame size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">
        Om uw besparingspotentieel nauwkeuriger te bepalen, hebben we wat informatie nodig over uw huidige verwarmings- en warmwatersysteem.
      </p>

      <RadioGroupField
        label="Wat is uw hoofdverwarmingssysteem?"
        options={heatingSystemOptions.mainSystem}
        currentValue={heating.mainHeatingSystem}
        section="heating"
        fieldName="mainHeatingSystem"
        displayAs="blocks"
      />

      {showHeatingSystemAge && (
        <div className="mt-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Leeftijd CV-ketel (indien bekend)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {heatingSystemOptions.systemAge.map(option => (
              <label
                key={option.value}
                className={`
                  relative flex items-center justify-center px-3 py-1 rounded-full cursor-pointer text-sm
                  transition-all duration-200 hover:shadow-sm whitespace-nowrap
                  ${heating.heatingSystemAge === option.value 
                    ? 'bg-blue-50 border border-blue-200 text-blue-700 font-medium shadow-sm transform scale-105' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/50'}
                `}
              >
                <input
                  type="radio"
                  name="heatingSystemAge"
                  value={option.value}
                  checked={heating.heatingSystemAge === option.value}
                  onChange={() => updateUserData('heating', { heatingSystemAge: option.value })}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}

      <RadioGroupField
        label="Heeft u een aparte boiler voor warm tapwater?"
        options={heatingSystemOptions.hasBoiler}
        currentValue={heating.hasBoiler}
        section="heating"
        fieldName="hasBoiler"
        helpText="Dit is een apart warmwatervat, niet de CV-ketel zelf"
        displayAs="blocks"
      />

      {showBoilerType && (
        <RadioGroupField
          label="Wat voor type boiler heeft u?"
          options={heatingSystemOptions.boilerType}
          currentValue={heating.boilerType}
          section="heating"
          fieldName="boilerType"
          displayAs="blocks"
        />
      )}

      {showBoilerAge && (
        <div className="mt-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Leeftijd boiler (indien bekend)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {heatingSystemOptions.boilerAge.map(option => (
              <label
                key={option.value}
                className={`
                  relative flex items-center justify-center px-3 py-1 rounded-full cursor-pointer text-sm
                  transition-all duration-200 hover:shadow-sm whitespace-nowrap
                  ${heating.boilerAge === option.value 
                    ? 'bg-blue-50 border border-blue-200 text-blue-700 font-medium shadow-sm transform scale-105' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/50'}
                `}
              >
                <input
                  type="radio"
                  name="boilerAge"
                  value={option.value}
                  checked={heating.boilerAge === option.value}
                  onChange={() => updateUserData('heating', { boilerAge: option.value })}
                  className="sr-only"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}

      <RadioGroupField
        label="Heeft u een warmwatercirculatieleiding in huis?"
        options={heatingSystemOptions.hasCirculation}
        currentValue={heating.hasCirculation}
        section="heating"
        fieldName="hasCirculation"
        helpText="Dit is een leiding die continu warm water rondpompt zodat u sneller warm water heeft bij de kraan"
        displayAs="blocks"
      />

      <InfoBox>
        Een indirect gestookte boiler of warmwatercirculatieleiding kan leiden tot aanzienlijk warmteverlies en dus hoger gasverbruik. 
        De NEStore kan in deze situaties extra interessant zijn vanwege de superieure isolatie en slimme opwarming.
      </InfoBox>

      <StepNavigation prevStep="intake-step3" nextStep="intake-step5" />
      <StepProgress step={4} stepTitle="Verwarming & Warm Water" />
    </Card>
  );
}