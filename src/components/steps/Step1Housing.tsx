import React from 'react';
import { Building } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import RadioGroupField from '../inputs/RadioGroupField';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import InfoBox from '../common/InfoBox';
import { houseTypeOptions, isolationLevels } from '../../config/formOptions';

export default function Step1Housing() {
  const { userData, colors } = useUserData();
  
  return (
    <Card title="Stap 2: Uw Woonsituatie" icon={<Building size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">Geef ons wat meer informatie over uw woning. Dit helpt ons een completer beeld te vormen.</p>
      
      <RadioGroupField
        label="Wat voor type woning heeft u?"
        options={houseTypeOptions}
        currentValue={userData.housing.houseType}
        section="housing"
        fieldName="houseType"
        displayAs="blocks" 
      />

      <RadioGroupField
        label="Hoe goed is uw woning momenteel geïsoleerd?"
        options={isolationLevels}
        currentValue={userData.housing.isolationLevel}
        section="housing"
        fieldName="isolationLevel"
        displayAs="blocks"
      />

      <InfoBox>
        De mate van isolatie bepaalt hoeveel energie u verbruikt én kunt besparen. 
        Een goed geïsoleerde woning haalt het hoogste rendement uit een warmtebatterij zoals de NEStore.
      </InfoBox>

      <StepNavigation prevStep="ownership" nextStep="heating" />
      <StepProgress step={2} stepTitle="Woonsituatie" />
    </Card>
  );
}