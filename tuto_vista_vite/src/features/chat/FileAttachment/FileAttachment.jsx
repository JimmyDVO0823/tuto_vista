import React from 'react';

export const FileAttachment = ({ fileName, fileSize, fileType, onDownload }) => {
  return (
    <div className="flex flex-col items-start max-w-md w-full">
      <div 
        onClick={onDownload}
        className="bg-surface-container-lowest p-4 rounded-xl border-l-4 border-tertiary flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow cursor-pointer w-full"
      >
        <div className="w-12 h-12 bg-tertiary/10 flex items-center justify-center rounded-lg text-tertiary">
          <span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-headline font-bold text-primary truncate">{fileName}</p>
          <p className="text-xs text-on-surface-variant font-body uppercase tracking-tight">
            {fileSize} • {fileType}
          </p>
        </div>
        <button 
          className="text-outline hover:text-primary transition-colors p-1"
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Evita doble trigger con el contenedor
            if (onDownload) onDownload();
          }}
        >
          <span className="material-symbols-outlined">download</span>
        </button>
      </div>
    </div>
  );
};