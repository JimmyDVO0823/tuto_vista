import React from 'react';

export const ChatHeader = ({ name, specialty, avatarUrl, isOnline, onAction }) => {
  return (
    <header className="h-auto min-h-[4rem] px-4 md:px-10 py-3 md:py-0 md:h-24 flex items-center justify-between bg-surface-container-lowest shadow-[0_8px_40px_rgba(25,28,30,0.04)] z-20 w-full">

      {/* Contact info — pushed right on mobile to clear sidebar button */}
      <div className="flex items-center gap-3 md:gap-4 pl-10 md:pl-0 flex-1 min-w-0">
        
        {/* Avatar — hidden on mobile */}
        <div className="relative flex-shrink-0 hidden md:flex">
          <img className="w-12 h-12 rounded-full object-cover" src={avatarUrl} alt={name} />
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface-container-lowest" />
          )}
        </div>

        {/* Name + status */}
        <div className="min-w-0">
          <p className="font-bold text-primary truncate">{name}</p>
          <p className="text-xs text-elegant-gray truncate">{specialty}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
        <button onClick={() => onAction?.('call')}
          className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary flex-shrink-0"
          title="Llamada de voz">
          <span className="material-symbols-outlined">call</span>
        </button>

        <button onClick={() => onAction?.('video')}
          className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary flex-shrink-0"
          title="Video reunión">
          <span className="material-symbols-outlined">video_call</span>
        </button>

        <button onClick={() => onAction?.('more')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs font-bold flex-shrink-0"
          title="Abandonar conversación">
          <span className="material-symbols-outlined text-sm">logout</span>
          <span className="hidden md:inline">Abandonar</span>
        </button>

        <button onClick={() => onAction?.('more')}
          className="p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary flex-shrink-0"
          title="Más opciones">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </header>
  );
};