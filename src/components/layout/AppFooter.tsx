import React from 'react';

export default function AppFooter() {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} NEStore Energy Solutions. Alle rechten voorbehouden.</p>
        <p className="text-xs mt-1">Ontwikkeld en geproduceerd in Delft, Nederland.</p>
        <div className="mt-2">
          <a href="#" className="text-xs text-slate-400 hover:text-white mx-2">Privacybeleid</a>
          <span className="text-slate-500">|</span>
          <a href="#" className="text-xs text-slate-400 hover:text-white mx-2">Algemene Voorwaarden</a>
        </div>
      </div>
    </footer>
  );
}