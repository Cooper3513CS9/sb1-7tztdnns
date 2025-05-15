import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';

interface StepNavigationProps {
  prevStep?: string;
  nextStep?: string;
  onNextClick?: () => Promise<void> | void;
  nextLabel?: string;
  prevLabel?: string;
  nextButtonType?: "button" | "submit";
}

export default function StepNavigation({ 
  prevStep, 
  nextStep, 
  onNextClick, 
  nextLabel = "Volgende", 
  prevLabel = "Terug", 
  nextButtonType = "button" 
}: StepNavigationProps) {
  const { goToStep, colors, isLoading } = useUserData();

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;
    
    try {
      if (onNextClick) {
        await onNextClick();
      }
      if (nextStep) {
        goToStep(nextStep);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (prevStep && !isLoading) {
      goToStep(prevStep);
    }
  };
  
  return (
    <div className={`flex mt-8 ${prevStep ? 'justify-between' : 'justify-end'}`}>
      {prevStep && (
        <button
          type="button"
          onClick={handlePrev}
          disabled={isLoading}
          className="px-6 py-3 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 hover:shadow"
        >
          {prevLabel}
        </button>
      )}
      {nextStep && (
        <button
          type={nextButtonType}
          onClick={nextButtonType === "button" ? handleNext : undefined}
          disabled={isLoading}
          className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center hover:shadow-md transition-all duration-200 transform hover:scale-[1.02]"
          style={{ 
            backgroundColor: isLoading ? colors.textLight : colors.primary,
            boxShadow: colors.shadows.md
          }}
        >
          {nextLabel} <ArrowRight size={18} className="ml-2" />
        </button>
      )}
    </div>
  );
}