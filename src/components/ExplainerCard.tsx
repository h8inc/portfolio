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
      className={`bg-[#FAF7F0] rounded-2xl sm:rounded-3xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6 ${className}`}
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

