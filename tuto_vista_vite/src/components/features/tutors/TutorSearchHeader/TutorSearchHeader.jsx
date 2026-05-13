import React from 'react';

const TutorSearchHeader = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="max-w-2xl">
        <span className="text-sm font-label font-bold uppercase tracking-[0.1em] text-tertiary mb-2 block">
          Explora Expertos
        </span>
        <h1 className="text-5xl font-headline font-black text-primary leading-tight">
          Encuentra tu mentor académico ideal.
        </h1>
      </div>
      <div className="relative w-full md:w-96 group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 group-focus-within:text-primary transition-colors">
          search
        </span>
        <input
          className="w-full pl-12 pr-6 py-4 bg-surface-container-lowest border-none rounded-xl shadow-sm focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-outline-variant"
          placeholder="Buscar por nombre o especialidad..."
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </header>
  );
};

export default TutorSearchHeader;
