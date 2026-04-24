import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import SessionView from './SessionView';
import { useAuth } from '../../../context/AuthContext';
import { supabase } from '../../../lib/supabase';

/**
 * Sidebar Component - The Academic Editorial
 * Enhanced with collapsible/mini mode support
 */
const Sidebar = ({ isCollapsed, onMouseEnter, onMouseLeave, onToggle }) => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Connect the true logged user or null
  const currentUser = user ? {
    name: user.name,
    role: user.role === 'tutor' ? 'Tutor Académico' : 'Estudiante',
    avatar: user.user_metadata?.avatar_url || ''
  } : null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Dashboard', path: '/dashboard/student', icon: 'dashboard' },
    { label: 'Find Tutors', path: '/tutors', icon: 'search' },
    { label: 'My Sessions', path: '/dispo', icon: 'calendar_today' },
    { label: 'Assignments', path: '/subjects', icon: 'menu_book' },
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
      <SessionView user={currentUser} isCollapsed={isCollapsed} />

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
        {navLinks.map((link) => (
          <SidebarItem
            key={link.label}
            label={link.label}
            path={link.path}
            icon={link.icon}
            isCollapsed={isCollapsed}
            isActive={location.pathname === link.path}
          />
        ))}
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
          
          {currentUser ? (
            <button
              onClick={handleLogout}
              className={`text-xs text-gray-500 hover:text-red-600 flex items-center gap-2 px-2 py-1 transition-colors font-medium text-left ${isCollapsed ? 'p-0' : ''}`}
              title="Logout"
            >
              <span className="material-symbols-outlined !text-[18px]">logout</span>
              {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
            </button>
          ) : (
            <Link
              to="/loginform"
              className={`text-xs text-gray-500 hover:text-primary flex items-center gap-2 px-2 py-1 transition-colors font-medium ${isCollapsed ? 'p-0' : ''}`}
              title="Login"
            >
              <span className="material-symbols-outlined !text-[18px]">login</span>
              {!isCollapsed && <span className="whitespace-nowrap">Login</span>}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
