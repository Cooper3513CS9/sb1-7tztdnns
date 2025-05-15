import React from 'react';
import { useUserData } from '../../context/UserDataContext';

export default function LoadingOverlay() {
  const { colors } = useUserData();
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4" style={{borderColor: colors.primary, borderTopColor: 'transparent'}}></div>
        <p className="mt-4 text-lg font-semibold" style={{color: colors.primary}}>Moment geduld, we berekenen uw voordeel...</p>
      </div>
    </div>
  );
}