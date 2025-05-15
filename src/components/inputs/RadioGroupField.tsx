import React from 'react';
import { useUserData } from '../../context/UserDataContext';

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioGroupFieldProps {
  label: string;
  options: RadioOption[];
  currentValue: string | number;
  section: string;
  fieldName: string;
  helpText?: string;
  displayAs?: 'list' | 'blocks';
}

export default function RadioGroupField({ 
  label, 
  options, 
  currentValue, 
  section, 
  fieldName, 
  helpText, 
  displayAs = 'list' 
}: RadioGroupFieldProps) {
  const { updateUserData, colors } = useUserData();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      {displayAs === 'list' ? (
        <div className="space-y-2">
          {options.map(option => (
            <label key={option.value} className="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
              <input
                type="radio"
                name={`${section}-${fieldName}`}
                value={option.value}
                checked={currentValue === option.value}
                onChange={() => updateUserData(section, { [fieldName]: option.value })}
                className="h-4 w-4 focus:ring-0 focus:ring-offset-0"
                style={{accentColor: colors.primary}}
              />
              <span className="ml-3 text-sm text-slate-700">{option.label}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {options.map(option => (
            <label 
              key={option.value} 
              className={`flex flex-col items-center justify-center text-center p-4 border rounded-lg cursor-pointer transition-all duration-150 ease-in-out h-full
                          ${currentValue === option.value 
                            ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-500 shadow-lg' 
                            : 'bg-white border-slate-300 hover:border-blue-400 hover:shadow-md'}`}
              style={currentValue === option.value ? {borderColor: colors.primary} : {}}
            >
              <input
                type="radio"
                name={`${section}-${fieldName}`}
                value={option.value}
                checked={currentValue === option.value}
                onChange={() => updateUserData(section, { [fieldName]: option.value })}
                className="sr-only"
              />
              <span className={`text-sm font-medium ${currentValue === option.value ? 'text-blue-700' : 'text-slate-700'}`}>
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
      {helpText && <p className="mt-2 text-xs text-slate-500">{helpText}</p>}
    </div>
  );
}