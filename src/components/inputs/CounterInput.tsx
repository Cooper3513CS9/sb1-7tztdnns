import React from 'react';
import { useUserData } from '../../context/UserDataContext';

interface CounterInputProps {
  label: string;
  value: number;
  section: string;
  fieldName: string;
  min?: number;
  step?: number;
  unit?: string;
}

export default function CounterInput({ 
  label, 
  value, 
  section, 
  fieldName, 
  min = 0, 
  step = 1, 
  unit 
}: CounterInputProps) {
  const { updateUserData } = useUserData();

  const setValue = (newValue: number) => {
    updateUserData(section, { [fieldName]: Math.max(min, newValue) });
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => setValue(value - step)}
          disabled={value <= min}
          className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 disabled:opacity-50 text-xl"
        >
          -
        </button>
        <span className="text-xl font-semibold text-slate-700 w-12 text-center">{value}{unit && <span className="text-sm">{unit}</span>}</span>
        <button
          type="button"
          onClick={() => setValue(value + step)}
          className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-300 text-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}