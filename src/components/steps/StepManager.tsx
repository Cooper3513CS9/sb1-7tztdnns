import React from 'react';
import { useUserData } from '../../context/UserDataContext';
import Step1Household from './Step1Household';
import Step2Shower from './Step2Shower';
import Step3Housing from './Step3Housing';
import Step4HeatingSystem from './Step4HeatingSystem';
import Step5Solar from './Step4Solar';
import Step6Priorities from './Step5Priorities';
import Step7Summary from './Step6Summary';
import Step8InteractiveComparisonPage from './Step7InteractiveComparisonPage';
import Step9SalderingImpactPage from './Step8SalderingImpactPage';
import Step10ContactFormPage from './Step9ContactFormPage';
import Step11ResultsPage from './Step10ResultsPage';
import LoadingOverlay from '../common/LoadingOverlay';

const STEP_COMPONENTS: Record<string, React.ComponentType> = {
  'intake-step1': Step1Household,
  'intake-step2': Step2Shower,
  'intake-step3': Step3Housing,
  'intake-step4': Step4HeatingSystem,
  'intake-step5': Step5Solar,
  'intake-step6': Step6Priorities,
  'summary-check': Step7Summary,
  'comparison-page': Step8InteractiveComparisonPage,
  'saldering-impact-page': Step9SalderingImpactPage,
  'contact-form-page': Step10ContactFormPage,
  'results-page': Step11ResultsPage,
};

export default function StepManager() {
  const { currentStep, isLoading } = useUserData();
  const Component = STEP_COMPONENTS[currentStep] || Step1Household;
  
  return (
    <>
      <Component />
      {isLoading && <LoadingOverlay />}
    </>
  );
}