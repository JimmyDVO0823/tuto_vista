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
      
      {/* Dynamic Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out min-h-screen ${
          isCollapsed ? 'ml-20' : 'ml-64'
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
