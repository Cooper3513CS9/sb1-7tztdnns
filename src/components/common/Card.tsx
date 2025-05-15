import React, { ReactNode } from 'react';
import { useUserData } from '../../context/UserDataContext';

interface CardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  gradient?: boolean;
}

export default function Card({ title, children, icon, className = '', gradient = false }: CardProps) {
  const { colors } = useUserData();
  
  return (
    <div className={`bg-white shadow-xl rounded-xl overflow-hidden ${className}`}>
      <div className={`p-6 sm:p-8 ${gradient ? 'bg-gradient-to-br' : ''}`} 
        style={gradient ? {
          background: `linear-gradient(135deg, ${colors.gradients.primary[0]}, ${colors.gradients.primary[1]})`
        } : {}}>
        <div className="flex items-center mb-6">
          {icon && <div className="mr-3 flex-shrink-0">{icon}</div>}
          <h2 className={`text-2xl sm:text-3xl font-bold ${gradient ? 'text-white' : 'text-slate-800'}`}>
            {title}
          </h2>
        </div>
        <div className={gradient ? 'bg-white rounded-lg p-6' : ''}>
          {children}
        </div>
      </div>
    </div>
  );
}