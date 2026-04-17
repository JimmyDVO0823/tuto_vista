import React from 'react';

const TutorCard = ({ name, image, subject, price, rating, reviews, quote, isTopRated }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-6 hover:shadow-[0_8px_40px_rgba(25,28,30,0.04)] transition-all group">
      <div className="flex items-start justify-between">
        <div className="relative">
          <img
            alt={name}
            className={`w-20 h-20 rounded-xl object-cover ${isTopRated ? 'ring-4 ring-surface-container-low' : ''}`}
            src={image}
          />
          {isTopRated && (
            <div className="absolute -bottom-2 -right-2 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-1 rounded-full shadow-sm uppercase tracking-wider">
              Top Rated
            </div>
          )}
        </div>
        <div className="text-right">
          <span className="block text-2xl font-bold text-primary font-headline">
            ${price}<span className="text-xs font-medium text-on-surface-variant">/h</span>
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">
          {name}
        </h2>
        <p className="text-xs font-bold text-tertiary uppercase tracking-widest mt-1">
          {subject}
        </p>
        <p className="mt-4 text-sm text-on-surface-variant leading-relaxed line-clamp-3 italic">
          "{quote}"
        </p>
      </div>
      <div className="flex items-center gap-4 pt-2">
        <div className="flex items-center gap-1 text-tertiary">
          <span
            className="material-symbols-outlined text-base"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="text-sm font-bold">{rating}</span>
        </div>
        <span className="text-xs text-outline-variant font-medium">
          ({reviews} reseñas)
        </span>
      </div>
      <div className="pt-4 mt-auto border-t border-outline-variant/10">
        <button className="w-full py-3 border-2 border-primary/10 hover:border-primary text-primary font-bold text-sm rounded-md transition-all active:scale-[0.98]">
          Ver Perfil
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
