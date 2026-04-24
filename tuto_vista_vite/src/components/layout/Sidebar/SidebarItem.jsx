/**
 * @fileoverview Layout Sub-component - Navigation Link
 * @module components/layout/Sidebar/SidebarItem
 * @description An atomic navigational unit within the Sidebar. It encapsulates 
 * the logic for active state visualization, grouping hover interactions, and 
 * responsive tooltips when in collapsed mode.
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SidebarItem Component.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.label - The descriptive text label for the navigation intent.
 * @param {string} props.path - The target route URL.
 * @param {string} props.icon - The name of the Material Symbols ligature to render.
 * @param {boolean} props.isCollapsed - Architectural switch for mini-mode rendering.
 * @param {boolean} props.isActive - Visual flag indicating if the current route matches 'path'.
 * @component
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
