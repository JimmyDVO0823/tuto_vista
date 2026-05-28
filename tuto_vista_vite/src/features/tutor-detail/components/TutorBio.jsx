import React from 'react';

const TutorBio = ({ tutor }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-primary tracking-tight font-headline">Sobre {tutor.nombre_completo.split(' ')[0]}</h2>
      <p className="text-gray-500 leading-relaxed text-lg whitespace-pre-line font-display">
        {tutor.biografia || 'Este tutor aún no ha configurado su biografía.'}
      </p>
    </div>
  );
};

export default TutorBio;
