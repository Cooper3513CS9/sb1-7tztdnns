import React, { ReactNode } from 'react';
import { useUserData } from '../../context/UserDataContext';

interface CheckboxFieldProps {
  label: ReactNode;
  checked: boolean;
  section: string;
  fieldName: string;
}

export default function CheckboxField({ label, checked, section, fieldName }: CheckboxFieldProps) {
  const { updateUserData, colors } = useUserData();
  
  return (
    <div className="mb-6">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="h-5 w-5 rounded border-slate-300 focus:ring-0 focus:ring-offset-0"
          style={{accentColor: colors.primary}}
          checked={checked}
          onChange={() => updateUserData(section, { [fieldName]: !checked })}
        />
        <span className="ml-3 text-sm text-slate-700">{label}</span>
      </label>
    </div>
  );
}