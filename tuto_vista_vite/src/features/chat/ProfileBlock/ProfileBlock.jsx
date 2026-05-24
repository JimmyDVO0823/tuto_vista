import React from 'react';

export const ProfileBlock = ({ name, role, avatarUrl }) => {
  return (
    <div className="w-full px-8 py-2">
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <img 
            className="w-12 h-12 rounded-full object-cover" 
            src={avatarUrl} 
            alt={`Avatar de ${name}`}
          />
        </div>
        <div className="min-w-0">
          <p className="font-headline font-bold text-on-surface text-sm truncate">{name}</p>
          <p className="text-xs text-on-surface-variant font-body truncate">{role}</p>
        </div>
      </div>
    </div>
  );
};