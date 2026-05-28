import React from 'react';

const ReviewCard = ({ review }) => {
  const date = new Date(review.creadoEn).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold border border-primary/10">
            {review.estudianteNombre?.[0] || 'E'}
          </div>
          <div>
            <h5 className="text-sm font-bold text-primary font-headline">{review.estudianteNombre || 'Estudiante'}</h5>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest font-display">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-academic-gold bg-academic-gold/5 px-2 py-1 rounded-lg border border-academic-gold/10">
          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-sm font-black">{review.puntuacion?.toFixed(1)}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed italic font-display">
        "{review.comentario || 'Sin comentario.'}"
      </p>

      {review.sesionId && (
        <div className="pt-2 flex items-center gap-2">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/5">
            Sesión #{review.sesionId}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
