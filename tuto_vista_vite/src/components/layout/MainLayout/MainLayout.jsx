/**
 * @fileoverview Layout Component - Authenticated Shell
 * @module components/layout/MainLayout
 * @description The primary architectural wrapper for the dashboard experience. 
 * Orchestrates the collapsible sidebar state and manages the dynamic 
 * margin transition for content fluidity.
 */

import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

/**
 * MainLayout Component.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Route-specific content.
 * @component
 */
const MainLayout = ({ children }) => {
  /**
   * Encapsulates the visibility state of the expanded navigation.
   * Logic Rationale: Toggled via mouse entry/leave to maximize 
   * horizontal space for academic data while maintaining navigation accessibility.
   * @state {boolean} isCollapsed
   */
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] font-body relative">
      {/* Sidebar with state control */}
      <Sidebar
        isCollapsed={isCollapsed}
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        onToggle={toggleSidebar}
      />

      {/* Mobile backdrop — tapping closes sidebar */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
          aria-hidden="true"
        />
      )}

      {/* Mobile hamburger — visible only on mobile when sidebar is closed */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 md:hidden w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-primary"
          aria-label="Abrir menú de navegación"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      )}

      {/* Dynamic Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-screen ${isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'
          }`}
      >
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
