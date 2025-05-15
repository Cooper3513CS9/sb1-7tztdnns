import React from 'react';
import { Building } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import RadioGroupField from '../inputs/RadioGroupField';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import InfoBox from '../common/InfoBox';
import { houseTypeOptions, constructionYearOptions, availableSpaceOptions } from '../../config/formOptions';

export default function Step3Housing() {
  const { userData, colors } = useUserData();
  
  return (
    <Card title="Stap 3: Uw Woonsituatie" icon={<Building size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">Geef ons wat meer informatie over uw woning. Dit helpt ons een completer beeld te vormen.</p>
      
      <RadioGroupField
        label="Wat voor type woning heeft u?"
        options={houseTypeOptions}
        currentValue={userData.housing.houseType}
        section="housing"
        fieldName="houseType"
        displayAs="blocks" 
      />

      <div className="mt-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Bouwjaar (indien bekend)
        </label>
        <div className="flex flex-wrap gap-1.5">
          {constructionYearOptions.map(option => (
            <label
              key={option.value}
              className={`
                relative flex items-center justify-center px-3 py-1 rounded-full cursor-pointer text-sm
                transition-all duration-200 hover:shadow-sm whitespace-nowrap
                ${userData.housing.constructionYearCategory === option.value 
                  ? 'bg-blue-50 border border-blue-200 text-blue-700 font-medium shadow-sm transform scale-105' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50/50'}
              `}
            >
              <input
                type="radio"
                name="constructionYear"
                value={option.value}
                checked={userData.housing.constructionYearCategory === option.value}
                onChange={() => userData.updateUserData('housing', { constructionYearCategory: option.value })}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <RadioGroupField
        label="Heeft u een idee van de beschikbare ruimte voor een NEStore (ca. 60x60cm vloeroppervlak)?"
        options={availableSpaceOptions}
        currentValue={userData.housing.availableSpace}
        section="housing"
        fieldName="availableSpace"
        helpText={`NEStore E20: 153cm hoog. NEStore E30: 205cm hoog.`}
        displayAs="blocks" 
      />

      <InfoBox>
        Het type woning en bouwjaar geven een indicatie van de isolatiewaarde en mogelijke warmtevraag. Voldoende ruimte is belangrijk voor een correcte installatie van de NEStore.
      </InfoBox>

      <StepNavigation prevStep="intake-step2" nextStep="intake-step4" />
      <StepProgress step={3} stepTitle="Woonsituatie" />
    </Card>
  );
}