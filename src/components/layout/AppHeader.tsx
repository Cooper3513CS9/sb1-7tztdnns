import React from 'react';
import { Flame } from 'lucide-react';
import { useUserData } from '../../context/UserDataContext';

export default function AppHeader() {
  const { colors } = useUserData();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
        <Flame size={32} style={{ color: colors.secondary }} className="mr-3"/>
        <h1 className="text-3xl font-bold" style={{ color: colors.primary }}>
          NEStore Energie Adviseur
        </h1>
      </div>
    </header>
  );
}