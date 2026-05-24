import React from 'react';
import PropTypes from 'prop-types';

export const StatCard = ({ 
  label, 
  value, 
  icon, 
  color = 'border-primary', 
  gradient = false, 
  highlight = null 
}) => {
  return (
    <div
      className={`col-span-12 md:col-span-4 p-8 rounded-lg shadow-sm flex flex-col justify-between h-48 transition-all ${
        gradient 
          ? "signature-gradient text-white" 
          : `bg-white border-l-4 ${color}`
      }`}
    >
      {/* Icono superior derecho */}
      <span
        className={`material-symbols-outlined text-4xl self-end ${
          gradient ? "text-white/30" : "text-gray-200"
        }`}
      >
        {icon}
      </span>

      {/* Textos e información */}
      <div>
        <h3
          className={`text-xs font-medium uppercase tracking-widest mb-1 ${
            gradient ? "text-white/60" : "text-gray-400"
          }`}
        >
          {label}
        </h3>
        <div className="flex items-center gap-2">
          <p
            className={`text-4xl font-bold font-headline ${
              gradient ? "text-white" : "text-primary"
            }`}
          >
            {value}
          </p>
          {highlight && (
            <span className="text-academic-gold font-bold text-sm bg-academic-gold/10 px-2 py-0.5 rounded">
              {highlight}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  gradient: PropTypes.bool,
  highlight: PropTypes.string
};

export default StatCard;