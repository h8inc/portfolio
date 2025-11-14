import React from 'react';

interface ExplainerCardProps {
  title: string;
  description: string;
  className?: string;
}

export const ExplainerCard: React.FC<ExplainerCardProps> = ({ 
  title, 
  description, 
  className = '' 
}) => {
  return (
    <div 
      className={`w-full max-w-md bg-[#FAF7F0] rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] border-black shadow-2xl p-4 sm:p-6 ${className}`}
    >
      <h3 
        className="text-lg sm:text-xl font-bold mb-2 text-black" 
        style={{ fontFamily: 'Aeonik Extended' }}
      >
        {title}
      </h3>
      <p 
        className="text-sm sm:text-base text-gray-700 leading-relaxed" 
        style={{ fontFamily: 'Aeonik' }}
      >
        {description}
      </p>
    </div>
  );
};

