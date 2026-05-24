import React from 'react';

export const ContactMenu = ({ contacts, activeContactId, onContactSelect }) => {
  return (
    <div className="w-full space-y-2 px-4">
      {contacts.map((contact) => {
        const isActive = contact.id === activeContactId;
        return (
          <div
            key={contact.id}
            onClick={() => onContactSelect && onContactSelect(contact.id)}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-none ${
              isActive
                ? 'bg-surface-container-lowest shadow-[0_4px_20px_rgba(0,32,69,0.05)]'
                : 'hover:bg-surface-container-low bg-transparent'
            }`}
          >
            <div className="relative flex-shrink-0">
              <img 
                className={`w-14 h-14 rounded-full object-cover ${!isActive ? 'opacity-80' : ''}`} 
                src={contact.avatarUrl} 
                alt={contact.name}
              />
              {contact.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface-container-lowest" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <p className={`font-headline font-bold text-sm truncate ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                  {contact.name}
                </p>
                <span className="text-[10px] font-label font-medium text-outline-variant uppercase tracking-wider">
                  {contact.lastMessageTime}
                </span>
              </div>
              <p className={`text-xs truncate font-body ${isActive ? 'text-on-surface-variant font-medium' : 'text-outline'}`}>
                {contact.lastMessageText}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};