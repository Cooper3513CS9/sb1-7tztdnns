import React from 'react';
import { useUserData } from '../../context/UserDataContext';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string | number;
  unit?: string;
  helpText?: string;
  min?: number;
  step?: number;
  section: string;
  fieldName: string;
  inputClassName?: string;
  onChangeCallback?: (value: any) => void;
}

export default function InputField({ 
  label, 
  type = "number", 
  name, 
  value, 
  unit, 
  helpText, 
  min, 
  step, 
  section, 
  fieldName, 
  inputClassName = "", 
  onChangeCallback 
}: InputFieldProps) {
  const { updateUserData } = useUserData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val: string | number = type === "number" ? parseFloat(e.target.value) : e.target.value;
    if (type === "number" && isNaN(val as number)) val = min !== undefined ? min : 0;
    if (type === "number" && min !== undefined && type !== "text") val = Math.max(min, val as number);
    
    updateUserData(section, { [fieldName]: val });
    if (onChangeCallback) onChangeCallback(val);
  };

  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <div className="flex items-center">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          min={min}
          step={step}
          className={`block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 ${inputClassName}`}
        />
        {unit && <span className="ml-3 text-slate-500 text-sm">{unit}</span>}
      </div>
      {helpText && <p className="mt-1 text-xs text-slate-500">{helpText}</p>}
    </div>
  );
}