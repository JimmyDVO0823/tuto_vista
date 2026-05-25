import React from 'react';

export const ChatHeader = ({ name, specialty, avatarUrl, isOnline, onAction }) => {
  return (
    <header className="h-auto min-h-[4rem] px-4 md:px-10 py-3 md:py-0 md:h-24 flex items-center justify-between bg-surface-container-lowest shadow-[0_8px_40px_rgba(25,28,30,0.04)] z-20 w-full">
      {/* Datos del contacto activo */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="relative flex-shrink-0">
          <img className="w-12 h-12 rounded-full object-cover" src={avatarUrl} alt={name} />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface-container-lowest" />
          )}
        </div>
        <div>
          <h3 className="font-headline font-bold text-lg text-primary leading-tight">{name}</h3>
          <p className="text-xs text-on-surface-variant font-body flex items-center gap-2 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            {specialty}
          </p>
        </div>
      </div>

      {/* Botones de acción del chat */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onAction && onAction('call')}
          className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary"
          title="Llamada de voz"
        >
          <span className="material-symbols-outlined">call</span>
        </button>
        <button 
          onClick={() => onAction && onAction('video')}
          className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary"
          title="Video reunión"
        >
          <span className="material-symbols-outlined">video_call</span>
        </button>
        <button 
          onClick={() => onAction && onAction('more')}
          className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary"
          title="Más opciones"
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </header>
  );
};