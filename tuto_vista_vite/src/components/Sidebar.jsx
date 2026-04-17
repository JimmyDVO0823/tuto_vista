import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Sidebar Component - The Academic Editorial
 * Authority: Design System Specification
 */
const Sidebar = () => {
  const location = useLocation();
  
  const navLinks = [
    { label: 'Dashboard', path: '/dashboard/student', icon: 'dashboard' },
    { label: 'My Sessions', path: '#', icon: 'calendar_today' },
    { label: 'Assignments', path: '#', icon: 'menu_book' },
    { label: 'Messages', path: '#', icon: 'mail' },
    { label: 'Settings', path: '#', icon: 'settings' },
  ];

  return (
    <nav className="h-screen w-64 fixed left-0 top-0 bg-[#f2f4f6] dark:bg-[#1c1c1c] flex flex-col py-8 z-40">
      {/* Brand */}
      <div className="px-8 mb-10">
        <span className="text-lg font-black tracking-widest uppercase text-primary dark:text-[#f2f4f6] font-display">
          THE ACADEMIC
        </span>
      </div>

      {/* User Profile */}
      <div className="px-8 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#e6e8ea]">
          <img
            alt="Julian Reed"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZOpt5w551XHfqYULnJTuGEpt5A5sQfS-rGYKJ8RDVypF4--j8zvRx_kCajeOtRLIRKsdAbkuPrKdk5ydD3xJddzS9imHE2c3kiFVHhtq30GBs7Uls7KcLTJIlMYLsJSNMlU3NIFdEPo4kbdl4YNcs6bTNdMjsPbKSZmBh_hfqoW21-1cy7-5EDrugAATFLZUnVBX_3-8198vMuOkVcHWkXn9UnbH80JaimlyeFq9dHs-XkAl9UuidVl9bOgJyvB6hsxkovmP3Zx-s"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-primary dark:text-[#f2f4f6] font-body">
            Julian Reed
          </p>
          <p className="text-[10px] uppercase tracking-wider text-[#191c1e]/60 font-medium">
            Honors Scholar
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.label}
              to={link.path}
              className={`flex items-center gap-3 py-3 transition-all ${
                isActive
                  ? 'bg-white dark:bg-[#2c2c2c] text-primary dark:text-academic-gold font-semibold rounded-l-full ml-4 pl-4 scale-95 transform'
                  : 'text-[#191c1e]/70 dark:text-gray-400 px-8 hover:bg-[#e6e8ea] dark:hover:bg-[#333]'
              }`}
            >
              <span className="material-symbols-outlined !text-[20px]">
                {link.icon}
              </span>
              <span className="text-sm font-body">{link.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="px-8 mt-auto flex flex-col gap-4">
        <button className="signature-gradient text-white font-bold py-3 px-4 rounded-md text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined !text-[18px]">add_circle</span>
          Book New Session
        </button>
        
        <div className="flex flex-col gap-1 border-t border-black/5 pt-4">
          <Link
            to="#"
            className="text-xs text-gray-500 hover:text-primary flex items-center gap-2 px-2 py-1 transition-colors font-medium"
          >
            <span className="material-symbols-outlined !text-[16px]">help</span>
            Support
          </Link>
          <button
            className="text-xs text-gray-500 hover:text-red-600 flex items-center gap-2 px-2 py-1 transition-colors font-medium text-left"
          >
            <span className="material-symbols-outlined !text-[16px]">logout</span>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
