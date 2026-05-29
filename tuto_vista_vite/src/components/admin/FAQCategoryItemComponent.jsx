import React from 'react';

const FAQCategoryItemComponent = ({ categoria, handleEliminarFaqCat }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/5 transition-all hover:border-academic-gold/20">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-academic-gold">{categoria.icono || 'help'}</span>
        <span className="font-bold text-sm text-primary">{categoria.nombre}</span>
      </div>
      <button onClick={() => handleEliminarFaqCat(categoria.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all">
        <span className="material-symbols-outlined text-base">delete</span>
      </button>
    </div>
  );
};

export default FAQCategoryItemComponent;
