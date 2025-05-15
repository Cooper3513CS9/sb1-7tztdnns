import React, { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';

interface InfoBoxProps {
  children: ReactNode;
}

export default function InfoBox({ children }: InfoBoxProps) {
  const { colors } = useUserData();
  return (
    <div className="mt-6 p-4 rounded-lg flex items-start" style={{backgroundColor: colors.light, border: `1px solid ${colors.primary}30`}}>
      <Info size={20} style={{color: colors.primary}} className="mr-3 mt-1 flex-shrink-0" />
      <p className="text-sm" style={{color: colors.textMedium}}>{children}</p>
    </div>
  );
}