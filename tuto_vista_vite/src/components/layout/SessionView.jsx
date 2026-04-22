import React from 'react';

/**
 * SessionView Component - Displays the current user state in the sidebar
 * 
 * @param {Object} user - User object containing name, role, and image
 * @param {boolean} isCollapsed - Whether the sidebar is in mini mode
 */
const SessionView = ({ user, isCollapsed }) => {
  const hasUser = !!user;
  
  return (
    <div className={`px-5 mb-8 flex items-center gap-3 transition-opacity duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
      {/* User Avatar */}
      <div className="w-10 h-10 min-w-[40px] rounded-full overflow-hidden bg-[#e6e8ea] border-2 border-white shadow-sm shrink-0">
        <img
          alt={hasUser ? user.name : "Guest"}
          src={hasUser ? user.image : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* User Info */}
      {!isCollapsed && (
        <div className="animate-in slide-in-from-left-2 duration-300">
          <p className="text-sm font-bold text-primary font-body whitespace-nowrap">
            {hasUser ? user.name : "Sesión no iniciada"}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-[#191c1e]/60 font-medium whitespace-nowrap">
            {hasUser ? user.role : "Invitado"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SessionView;
