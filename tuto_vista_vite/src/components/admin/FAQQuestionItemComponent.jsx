import React from 'react';

const FAQQuestionItemComponent = ({ pregunta, catNombre, handleEliminarPregunta }) => {
  return (
    <div className="p-4 border border-outline-variant/10 rounded-xl bg-surface-container-low/50 group hover:border-primary/20 transition-all">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold text-academic-gold uppercase border border-academic-gold/20 px-2 py-0.5 rounded">
          {catNombre}
        </span>
        <button onClick={() => handleEliminarPregunta(pregunta.id)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-all p-1 hover:bg-red-50 rounded">
          <span className="material-symbols-outlined text-base">delete</span>
        </button>
      </div>
      <h4 className="font-bold text-sm text-primary mb-1">{pregunta.pregunta}</h4>
      <p className="text-xs text-on-surface-variant opacity-70 line-clamp-2">{pregunta.respuesta}</p>
    </div>
  );
};

export default FAQQuestionItemComponent;
