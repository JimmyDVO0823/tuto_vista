import React from 'react';

const Pagination = () => {
  return (
    <div className="mt-20 flex justify-center">
      <nav className="flex items-center gap-2 p-1 bg-surface-container-low rounded-xl">
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold shadow-sm">
          1
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
          2
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
          3
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
