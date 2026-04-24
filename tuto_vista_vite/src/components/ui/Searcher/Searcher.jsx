/**
 * @fileoverview UI Atomic Component - Search Input
 * @module components/ui/Searcher
 * @description A refined search field designed for real-time filtering 
 * of academic records. Orchestrates an icon-integrated input with 
 * a focus on subtle shadows and focus-state rings.
 */

import React from 'react';

/**
 * Searcher Component.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.value - The current search query.
 * @param {function(string): void} props.onChange - Callback for query updates.
 * @param {string} [props.placeholder="Buscar..."] - Input hint.
 * @param {string} [props.className=""] - Additional container styles.
 * @component
 */
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
