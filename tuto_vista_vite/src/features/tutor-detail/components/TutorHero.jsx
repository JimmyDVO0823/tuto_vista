import React from 'react';

const TutorHero = ({ tutor }) => {
  return (
    <header className="mb-8 md:mb-16 flex flex-col md:flex-row items-start justify-between gap-6">
      <div className="max-w-2xl">
        <span className="text-xs font-bold text-academic-gold uppercase tracking-[0.2em] mb-4 block">Perfil del Tutor</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight font-headline mb-6 leading-tight">
          {tutor.nombre_completo}
        </h1>
        {tutor.frase_personal && (
          <p className="text-xl text-gray-500 leading-relaxed italic border-l-4 border-academic-gold/50 pl-6 font-display">
            "{tutor.frase_personal}"
          </p>
        )}
      </div>
      <div className="flex flex-col items-start md:items-end gap-2">
        <div className="flex items-center gap-1 text-academic-gold">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-xl font-bold">{tutor.calificacion_promedio?.toFixed(1)}</span>
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          {tutor.total_sesiones} sesiones dictadas
        </span>
      </div>
    </header>
  );
};

export default TutorHero;
