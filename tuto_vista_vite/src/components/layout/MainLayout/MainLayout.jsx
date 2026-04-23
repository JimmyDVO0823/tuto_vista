import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex min-h-screen bg-[#f7f9fb] font-body">
      {/* Sidebar with state control */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        onMouseEnter={() => setIsCollapsed(false)}
        onMouseLeave={() => setIsCollapsed(true)}
        onToggle={toggleSidebar}
      />
      
      {/* Dynamic Content Area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
