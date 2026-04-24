import React from 'react';

/**
 * SessionView Component - Displays the current user state in the sidebar
 * 
 * @param {Object} user - User object containing name, role, and image
 * @param {boolean} isCollapsed - Whether the sidebar is in mini mode
 */
const SessionView = ({ user, isCollapsed }) => {
  const hasUser = !!user;

  // Extraer el primer nombre y el primer apellido
  let shortName = "Sesión no iniciada";
  if (hasUser && !!user.name) {
    const parts = user.name.split(' ');
    shortName = parts.length >= 2 ? `${parts[0]} ${parts[1]}` : user.name;
  }

  return (
    <div className={`px-5 mb-8 flex items-center gap-3 transition-opacity duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
      {/* User Avatar */}
      <div className="w-10 h-10 min-w-[40px] rounded-full overflow-hidden bg-[#e6e8ea] border-2 border-white shadow-sm shrink-0 flex items-center justify-center text-[#191c1e]/60">
        {hasUser && user.avatar ? (
          <img
            alt={user.name}
            src={user.avatar}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="material-symbols-outlined !text-[24px]">person</span>
        )}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="animate-in slide-in-from-left-2 duration-300 overflow-hidden">
          <p className="text-sm font-bold text-primary font-body whitespace-nowrap overflow-hidden text-ellipsis">
            {shortName}
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
