import React from 'react';
import AppHeader from './layout/AppHeader';
import AppFooter from './layout/AppFooter';
import StepManager from './steps/StepManager';
import LoadingOverlay from './common/LoadingOverlay';
import { UserDataProvider } from '../context/UserDataContext';

export default function NEStoreApp() {
  return (
    <UserDataProvider>
      <div className="min-h-screen bg-gray-100 font-sans">
        <AppHeader />
        <main className="max-w-4xl mx-auto py-8 px-4">
          <StepManager />
        </main>
        <AppFooter />
      </div>
    </UserDataProvider>
  );
}