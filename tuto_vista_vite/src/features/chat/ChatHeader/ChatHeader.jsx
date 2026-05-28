import React from 'react';

export const ChatHeader = ({ name, specialty, avatarUrl, isOnline, onAction }) => {
  return (
    <header className="h-auto min-h-[4rem] px-4 md:px-10 py-3 md:py-0 md:h-24 flex items-center bg-surface-container-lowest shadow-[0_8px_40px_rgba(25,28,30,0.04)] z-20 w-full">
      
      {/* Espaciador izquierdo para centrar el bloque principal */}
      <div className="flex-1 flex justify-start"></div>

      {/* Datos del contacto activo (Centralizado) */}
      <div className="flex-shrink-0 flex items-center justify-center gap-3 md:gap-4">
        <div className="relative flex-shrink-0">
          <img className="w-12 h-12 rounded-full object-cover" src={avatarUrl} alt={name} />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface-container-lowest" />
          )}
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-headline font-bold text-lg text-primary leading-tight text-center">{name}</h3>
          <p className="text-xs text-on-surface-variant font-body flex items-center justify-center gap-2 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            {specialty}
          </p>
        </div>
      </div>

      {/* Botones de acción del chat */}
      <div className="flex-1 flex items-center justify-end gap-1 md:gap-2">
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs font-bold mr-1"
          title="Abandonar esta conversación"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span className="hidden md:inline">Abandonar</span>
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