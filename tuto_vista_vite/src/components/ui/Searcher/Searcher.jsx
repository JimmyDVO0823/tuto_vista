import React from 'react';

const Searcher = ({ 
  value, 
  onChange, 
  placeholder = "Buscar...", 
  className = "" 
}) => {
  return (
    <div className={`relative flex-1 ${className}`}>
      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Searcher;
