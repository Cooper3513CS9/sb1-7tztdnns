import React from 'react';
import { Home } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import RadioGroupField from '../inputs/RadioGroupField';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import { ownershipOptions } from '../../config/formOptions';

export default function Step0Ownership() {
  const { userData, colors, goToStep } = useUserData();

  const handleNext = () => {
    if (userData.basic.ownership === 'huur') {
      goToStep('contact-form-page');
      return;
    }
    goToStep('intake-step1');
  };
  
  return (
    <Card title="Wat voor woning heeft u?" icon={<Home size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">
        Om u het beste advies te kunnen geven, willen we eerst weten of u een koop- of huurwoning heeft.
      </p>
      
      <RadioGroupField
        label="Selecteer uw woonsituatie"
        options={ownershipOptions}
        currentValue={userData.basic.ownership}
        section="basic"
        fieldName="ownership"
        displayAs="blocks"
      />

      {userData.basic.ownership === 'huur' && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Informatie voor huurders</h3>
          <p className="text-blue-700 text-sm">
            Voor een huurwoning dient de aanschaf van een NEStore via uw verhuurorganisatie geregeld te worden. 
            Wilt u dat wij contact opnemen met uw verhuurder om de mogelijkheden te bespreken?
          </p>
          <button
            onClick={() => goToStep('contact-form-page')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ja, neem contact op met mijn verhuurder
          </button>
        </div>
      )}

      <StepNavigation 
        nextStep="intake-step1"
        onNextClick={handleNext}
      />
      <StepProgress step={1} stepTitle="Woonsituatie" />
    </Card>
  );
}