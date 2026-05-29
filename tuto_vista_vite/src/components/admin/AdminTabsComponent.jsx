import React from 'react';

const AdminTabsComponent = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'usuarios', label: 'Usuarios', icon: 'group' },
    { id: 'reportes', label: 'Reportes', icon: 'gavel' },
    { id: 'insignias', label: 'Insignias', icon: 'verified' },
    { id: 'comision', label: 'Comisión Plataforma', icon: 'percent' },
    { id: 'academic', label: 'Departamentos y Materias', icon: 'auto_stories' },
    { id: 'faq', label: 'Preguntas Frecuentes', icon: 'quiz' }
  ];

  return (
    <div className="flex border-b border-outline-variant/10 mb-8 overflow-x-auto whitespace-nowrap px-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`py-3 px-6 font-bold text-sm border-b-2 flex items-center gap-2 transition-all ${activeTab === tab.id
              ? 'border-academic-gold text-academic-gold font-extrabold'
              : 'border-transparent text-elegant-gray hover:text-primary'
            }`}
        >
          <span className="material-symbols-outlined text-base">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AdminTabsComponent;
