import React, { useState, useRef, useEffect } from 'react';

export const MessageInputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-ajuste de altura del textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <footer className="p-8 bg-surface-container-low">
      <div className="bg-surface-container-lowest rounded-xl p-2 shadow-[0_-8px_40px_rgba(25,28,30,0.02)] flex items-end gap-2 group focus-within:ring-2 ring-primary/5">
        <button 
          className="p-3 text-on-surface-variant hover:text-primary transition-colors"
          type="button"
          title="Adjuntar archivo"
        >
          <span className="material-symbols-outlined">add_circle</span>
        </button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 px-2 resize-none max-h-40 min-h-[48px] placeholder:text-outline-variant font-body text-on-surface"
          placeholder="Type your academic inquiry here..."
          rows={1}
        />
        
        <div className="flex items-center gap-2 p-1">
          <button 
            className="p-3 text-on-surface-variant hover:text-primary transition-colors"
            type="button"
            title="Añadir emoji"
          >
            <span className="material-symbols-outlined">mood</span>
          </button>
          <button 
            onClick={handleSend}
            className="signature-gradient w-12 h-12 rounded-lg text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
            type="button"
            title="Enviar mensaje"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <p className="text-[10px] text-outline-variant font-label uppercase tracking-widest flex items-center gap-1.5 font-medium">
          <span className="material-symbols-outlined text-[12px]">lock</span>
          End-to-end encrypted scholarly communication
        </p>
      </div>
    </footer>
  );
};