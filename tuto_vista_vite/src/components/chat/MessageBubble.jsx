import React from 'react';

export const MessageBubble = ({ text, timestamp, isSent, isRead, imageUrl }) => {
  return (
    <div className={`flex flex-col w-full ${isSent ? 'items-end' : 'items-start'}`}>
      {/* Texto del Mensaje */}
      {text && (
        <div className={`max-w-2xl p-6 rounded-xl rounded-tr-none shadow-sm ${
          isSent 
            ? 'signature-gradient text-white shadow-[0_12px_32px_rgba(0,32,69,0.1)]' 
            : 'bg-surface-container-lowest text-on-surface shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
        }`}>
          <p className="text-sm leading-relaxed font-body">{text}</p>
        </div>
      )}

      {/* Renderizado opcional de imagen académica */}
      {imageUrl && (
        <div className={`rounded-xl overflow-hidden shadow-md max-w-xs group cursor-zoom-in relative ${text ? 'mt-3' : ''}`}>
          <img 
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" 
            src={imageUrl} 
            alt="Visualization"
          />
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
          </div>
        </div>
      )}

      {/* Timestamp y Meta */}
      <span className={`mt-2 text-[10px] font-label font-medium text-outline uppercase tracking-wider flex items-center gap-1`}>
        {timestamp}
        {isSent && (
          <span 
            className={`material-symbols-outlined text-sm text-tertiary`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isRead ? 'done_all' : 'done'}
          </span>
        )}
      </span>
    </div>
  );
};