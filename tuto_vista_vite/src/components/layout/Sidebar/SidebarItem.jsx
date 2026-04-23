import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SidebarItem Component - Part of The Academic Editorial Design System
 * 
 * @param {string} label - The text to display
 * @param {string} path - The navigation path
 * @param {string} icon - Material Symbols icon name
 * @param {boolean} isCollapsed - Whether the sidebar is in mini mode
 * @param {boolean} isActive - Whether this item is currently active
 */
const SidebarItem = ({ label, path, icon, isCollapsed, isActive }) => {
  return (
    <Link
      to={path}
      className={`flex items-center gap-4 py-3 relative transition-all group ${
        isActive
          ? 'bg-white text-primary font-semibold rounded-l-full ml-4 pl-4'
          : 'text-elegant-gray px-7 hover:bg-[#e6e8ea]'
      } ${isCollapsed ? 'px-0 justify-center ml-0 rounded-none' : ''}`}
    >
      <span className={`material-symbols-outlined !text-[24px] transition-transform duration-300 ${isCollapsed && isActive ? 'text-primary scale-110' : ''}`}>
        {icon}
      </span>
      
      {!isCollapsed && (
        <span className="text-sm font-body whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
          {label}
        </span>
      )}
      
      {isCollapsed && (
        <div className="absolute left-full ml-4 px-2 py-1 bg-primary text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </Link>
  );
};

export default SidebarItem;
