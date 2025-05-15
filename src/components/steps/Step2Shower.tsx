import React from 'react';
import { Droplet } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import CounterInput from '../inputs/CounterInput';
import RadioGroupField from '../inputs/RadioGroupField';
import CheckboxField from '../inputs/CheckboxField';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import InfoBox from '../common/InfoBox';
import { showerDurationOptions, showerHeadTypes } from '../../config/formOptions';

export default function Step2Shower() {
  const { userData, colors } = useUserData();
  
  return (
    <Card title="Stap 2: Uw Warmwatergebruik" icon={<Droplet size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">Inzicht in uw warmwatergebruik helpt ons het juiste NEStore model te adviseren.</p>
      <CounterInput
        label="Aantal douches per persoon per dag (gemiddeld)"
        value={userData.household.showersPerPerson}
        section="household"
        fieldName="showersPerPerson"
        min={0}
      />
      <RadioGroupField
        label="Gemiddelde douchetijd per douche"
        options={showerDurationOptions}
        currentValue={userData.household.showerDurationCategory}
        section="household"
        fieldName="showerDurationCategory"
        displayAs="blocks" 
      />
      <RadioGroupField
        label="Soort douchekop (meest gebruikt)"
        options={showerHeadTypes}
        currentValue={userData.household.showerHeadType}
        section="household"
        fieldName="showerHeadType"
        helpText="Een regendouche verbruikt aanzienlijk meer water."
        displayAs="blocks" 
      />
      <CheckboxField
        label="Er is een bad aanwezig dat regelmatig gebruikt wordt"
        checked={userData.household.hasBath}
        section="household"
        fieldName="hasBath"
      />
      <InfoBox>
        Wist u dat een gemiddelde douchebeurt van 8 minuten met een normale douchekop al snel 70-80 liter warm water verbruikt? Korter douchen of een waterbesparende douchekop kan aanzienlijk schelen op uw water- én energierekening. Dit verkort de terugverdientijd van uw NEStore!
      </InfoBox>
      <StepNavigation prevStep="intake-step1" nextStep="intake-step3" />
      <StepProgress step={2} stepTitle="Warmwatergebruik" /> 
    </Card>
  );
}