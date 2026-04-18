import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Sidebar Component - The Academic Editorial
 * Enhanced with collapsible/mini mode support
 */
const Sidebar = ({ isCollapsed, onMouseEnter, onMouseLeave, onToggle }) => {
  const location = useLocation();
  
  const navLinks = [
    { label: 'Dashboard', path: '/dashboard/student', icon: 'dashboard' },
    { label: 'My Sessions', path: '#', icon: 'calendar_today' },
    { label: 'Assignments', path: '#', icon: 'menu_book' },
    { label: 'Messages', path: '#', icon: 'mail' },
    { label: 'Settings', path: '#', icon: 'settings' },
  ];

  return (
    <nav 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`h-screen fixed left-0 top-0 bg-mini-gray flex flex-col py-8 z-50 transition-all duration-300 ease-in-out shadow-sm overflow-hidden ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand & Toggle */}
      <div className={`px-6 mb-10 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <span className="text-lg font-black tracking-widest uppercase text-primary font-display whitespace-nowrap animate-in fade-in duration-500">
            THE ACADEMIC
          </span>
        )}
        <button 
          onClick={onToggle}
          className={`material-symbols-outlined text-primary hover:bg-[#e6e8ea] p-2 rounded-full transition-colors ${isCollapsed ? 'scale-110' : ''}`}
        >
          {isCollapsed ? 'menu' : 'menu_open'}
        </button>
      </div>

      {/* User Profile */}
      <div className={`px-5 mb-8 flex items-center gap-3 transition-opacity duration-300 ${isCollapsed ? 'justify-center' : ''}`}>
        <div className="w-10 h-10 min-w-[40px] rounded-full overflow-hidden bg-[#e6e8ea] border-2 border-white shadow-sm shrink-0">
          <img
            alt="Julian Reed"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZOpt5w551XHfqYULnJTuGEpt5A5sQfS-rGYKJ8RDVypF4--j8zvRx_kCajeOtRLIRKsdAbkuPrKdk5ydD3xJddzS9imHE2c3kiFVHhtq30GBs7Uls7KcLTJIlMYLsJSNMlU3NIFdEPo4kbdl4YNcs6bTNdMjsPbKSZmBh_hfqoW21-1cy7-5EDrugAATFLZUnVBX_3-8198vMuOkVcHWkXn9UnbH80JaimlyeFq9dHs-XkAl9UuidVl9bOgJyvB6hsxkovmP3Zx-s"
            className="w-full h-full object-cover"
          />
        </div>
        {!isCollapsed && (
          <div className="animate-in slide-in-from-left-2 duration-300">
            <p className="text-sm font-bold text-primary font-body whitespace-nowrap">
              Julian Reed
            </p>
            <p className="text-[10px] uppercase tracking-wider text-[#191c1e]/60 font-medium whitespace-nowrap">
              Honors Scholar
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.label}
              to={link.path}
              className={`flex items-center gap-4 py-3 relative transition-all group ${
                isActive
                  ? 'bg-white text-primary font-semibold rounded-l-full ml-4 pl-4'
                  : 'text-elegant-gray px-7 hover:bg-[#e6e8ea]'
              } ${isCollapsed ? 'px-0 justify-center ml-0 rounded-none' : ''}`}
            >
              <span className={`material-symbols-outlined !text-[24px] transition-transform duration-300 ${isCollapsed && isActive ? 'text-primary scale-110' : ''}`}>
                {link.icon}
              </span>
              {!isCollapsed && (
                <span className="text-sm font-body whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                  {link.label}
                </span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-primary text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {link.label}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className={`px-5 mt-auto flex flex-col gap-4 ${isCollapsed ? 'items-center' : ''}`}>
        <button 
          className={`bg-academic-gold text-primary font-bold rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-sm ${
            isCollapsed ? 'w-10 h-10 p-0 rounded-full' : 'py-3 px-4 text-sm w-full'
          }`}
          title={isCollapsed ? 'Book New Session' : ''}
        >
          <span className="material-symbols-outlined !text-[20px]">add_circle</span>
          {!isCollapsed && <span className="whitespace-nowrap">Book New Session</span>}
        </button>
        
        <div className={`flex flex-col gap-1 border-t border-black/5 pt-4 ${isCollapsed ? 'items-center' : ''}`}>
          <Link
            to="#"
            className={`text-xs text-gray-500 hover:text-primary flex items-center gap-2 px-2 py-1 transition-colors font-medium ${isCollapsed ? 'p-0' : ''}`}
            title="Support"
          >
            <span className="material-symbols-outlined !text-[18px]">help</span>
            {!isCollapsed && <span>Support</span>}
          </Link>
          <button
            className={`text-xs text-gray-500 hover:text-red-600 flex items-center gap-2 px-2 py-1 transition-colors font-medium text-left ${isCollapsed ? 'p-0' : ''}`}
            title="Logout"
          >
            <span className="material-symbols-outlined !text-[18px]">logout</span>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
