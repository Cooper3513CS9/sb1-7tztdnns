import React from 'react';
import { useUserData } from '../../context/UserDataContext';

interface StepProgressProps {
  step: number;
  stepTitle?: string;
}

export default function StepProgress({ step, stepTitle }: StepProgressProps) {
  const { colors } = useUserData();
  const totalSteps = 10;
  const percentage = Math.max(0, Math.min(100, (step / totalSteps) * 100));
  
  return (
    <div className="mt-8">
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${percentage}%`, backgroundColor: colors.accent }}></div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-1">
        <span>{stepTitle || `Stap ${step}`}</span>
        <span>{step} van {totalSteps}</span>
      </div>
    </div>
  );
}