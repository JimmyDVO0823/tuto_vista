/**
 * @fileoverview UI Atomic Component - Navigation Pagination
 * @module components/ui/Pagination
 * @description Manages large data set traversal through a refined 
 * numerical navigation system. Follows the 'Ghost Border' and 
 * 'Tonal Layering' principles.
 */

import React from 'react';

/**
 * Pagination Component.
 * 
 * @component
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="mt-10 md:mt-20 flex justify-center">
      <nav className="flex items-center gap-2 p-1 bg-surface-container-low rounded-xl">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all font-bold ${
              currentPage === page 
                ? "bg-primary text-white shadow-sm" 
                : "hover:bg-surface-container-high text-on-surface-variant"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
