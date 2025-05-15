import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';
import Card from '../common/Card';
import InputField from '../inputs/InputField';
import CheckboxField from '../inputs/CheckboxField';
import StepNavigation from '../common/StepNavigation';
import StepProgress from '../common/StepProgress';
import LoadingOverlay from '../common/LoadingOverlay';

export default function Step9ContactFormPage() {
  const { userData, colors, goToStep, apiSaveLead, updateUserData } = useUserData();
  const { results, contact } = userData;
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!results || results.yearlyBenefit === null) {
      goToStep('summary-check');
    }
  }, [results, goToStep]);

  if (!results || results.yearlyBenefit === null) {
    return <LoadingOverlay />;
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    updateUserData('contact', { [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors(prev => ({...prev, [name]: undefined}));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!contact.email) newErrors.email = "E-mailadres is verplicht.";
    else if (!/\S+@\S+\.\S+/.test(contact.email)) newErrors.email = "Voer een geldig e-mailadres in.";
    if (!contact.agreed) newErrors.agreed = "U dient akkoord te gaan met de voorwaarden.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await apiSaveLead({ email: contact.email, phone: contact.phone, agreedToTerms: contact.agreed });
        updateUserData('contact', { submitted: true });
        goToStep('results-page');
      } catch (error) {
        console.error("Fout bij opslaan lead:", error);
        setErrors(prev => ({...prev, form: "Er is een fout opgetreden. Probeer het later opnieuw."}));
      }
    }
  };

  return (
    <Card title="Stap 9: Ontgrendel Uw Volledige NEStore Advies" icon={<Mail size={28} style={{color: colors.primary}}/>}>
      <p className="text-slate-600 mb-6">
        U heeft nu een goed beeld van hoe NEStore presteert en wat de impact is van de salderingsregeling. 
        Vul hieronder uw gegevens in om uw volledige, persoonlijke NEStore advies te ontvangen. We sturen u een kopie per e-mail.
      </p>
      
      <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
        <h4 className="font-semibold text-green-700 mb-2">Korte samenvatting van uw voordeel:</h4>
        <ul className="list-disc list-inside text-sm text-green-600 space-y-1">
          <li>Jaarlijkse besparing (na saldering): <span className="font-bold">€{(results.yearlyBenefit + results.yearlyLossSaldering).toLocaleString()}</span></li>
          <li>Terugverdientijd: <span className="font-bold">{results.paybackYearsAfterSaldering === Infinity ? "N.v.t." : `${results.paybackYearsAfterSaldering} jaar`}</span></li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 border-t border-slate-200 pt-6 space-y-4">
        <InputField 
          label="E-mailadres" 
          type="email" 
          name="email" 
          value={contact.email} 
          section="contact" 
          fieldName="email" 
          inputClassName={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500 -mt-3 mb-2">{errors.email}</p>}

        <InputField 
          label="Telefoonnummer (optioneel, voor WhatsApp updates)" 
          type="tel" 
          name="phone" 
          value={contact.phone} 
          section="contact" 
          fieldName="phone" 
        />
        
        <CheckboxField 
          label={<>Ik ga akkoord met de <a href="#" className="underline hover:text-blue-700">privacyvoorwaarden</a> en het ontvangen van dit eenmalige advies.</>} 
          checked={contact.agreed} 
          section="contact" 
          fieldName="agreed" 
        />
        {errors.agreed && <p className="text-xs text-red-500 -mt-3 mb-2">{errors.agreed}</p>}
        {errors.form && <p className="text-sm text-red-500">{errors.form}</p>}

        <StepNavigation prevStep="saldering-impact-page" nextStep="results-page" nextLabel="Bekijk Mijn NEStore Advies" nextButtonType="submit"/>
      </form>
      <StepProgress step={9} stepTitle="Contactgegevens" /> 
    </Card>
  );
}