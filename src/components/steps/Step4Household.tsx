import React from 'react';
import { Users } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import CounterInput from '../inputs/CounterInput';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import InfoBox from '../common/InfoBox';

export default function Step4Household() {
  const { userData, colors } = useUserData();
  
  return (
    <Card title="Stap 5: Uw Huishouden" icon={<Users size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">Vertel ons meer over uw huishouden voor een advies op maat.</p>
      <CounterInput
        label="Aantal personen in uw huishouden"
        value={userData.household.persons}
        section="household"
        fieldName="persons"
        min={1}
      />
      {userData.household.persons > 2 && (
        <InfoBox>
          Heeft u opgroeiende kinderen? Houd er rekening mee dat hun warmwaterverbruik (en dus energiekosten) waarschijnlijk zal toenemen naarmate ze ouder worden. Een NEStore met ruime capaciteit is een slimme investering voor de toekomst van uw gezin.
        </InfoBox>
      )}
      <StepNavigation prevStep="solar" nextStep="shower" />
      <StepProgress step={5} stepTitle="Huishouden" /> 
    </Card>
  );
}