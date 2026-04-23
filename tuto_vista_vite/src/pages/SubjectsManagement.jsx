import React from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import SubjectTable from '../components/SubjectTable';

const SubjectsManagement = () => {
  const subjects = [
    { 
      name: 'Cálculo Diferencial e Integral I', 
      dept: 'Departamento de Matemáticas', 
      status: 'ACTIVO', 
      sem: 'Semestre A',
      tutor: 'Dr. Roberto Gómez',
      nextActivity: 'Mañana, 08:30 AM',
      completedActivities: 3,
      totalActivities: 5
    },
    { 
      name: 'Programación Web Avanzada', 
      dept: 'Ciencias de la Computación', 
      status: 'ACTIVO', 
      sem: 'Semestre B',
      tutor: 'Ing. Elena Torres',
      nextActivity: '24 Abr, 10:00 AM',
      completedActivities: 2,
      totalActivities: 4
    },
    { 
      name: 'Física Mecánica', 
      dept: 'Departamento de Física', 
      status: 'INACTIVO', 
      sem: 'Semestre A',
      tutor: 'MSc. Carlos Ruiz',
      nextActivity: 'Pendiente',
      completedActivities: 1,
      totalActivities: 6
    },
    { 
      name: 'Ética y Pensamiento Crítico', 
      dept: 'Humanidades y Artes', 
      status: 'ACTIVO', 
      sem: 'Transversal',
      tutor: 'Dra. Sofía Mora',
      nextActivity: '25 Abr, 02:00 PM',
      completedActivities: 4,
      totalActivities: 4
    },
  ];

  return (
    <MainLayout>
      <main className="p-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">Administración del Sistema</p>
            <h2 className="text-5xl font-extrabold font-headline text-primary tracking-tight leading-tight">Gestión de Materias Académicas</h2>
          </div>
          <button className="signature-gradient text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg transition-all active:scale-95">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Agregar Nueva Materia</span>
          </button>
        </header>

        <div className="bg-[#f2f4f6] p-2 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1">
             <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
             <input className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 text-sm" placeholder="Buscar materia..." />
          </div>
          <div className="flex gap-2">
             <button className="bg-white px-6 py-4 rounded-xl text-sm font-semibold border border-gray-100 shadow-sm">Filtros</button>
             <button className="bg-white px-6 py-4 rounded-xl text-sm font-semibold border border-gray-100 shadow-sm">Exportar</button>
          </div>
        </div>

        <SubjectTable subjects={subjects} />

        <footer className="mt-20 border-t border-gray-100 py-12 flex justify-between items-center text-[0.75rem] uppercase tracking-[0.05em] font-medium text-gray-500">
          <p>© 2024 The Academic Editorial. All rights reserved.</p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => <a key={l} href="#" className="hover:text-primary transition-colors">{l}</a>)}
          </div>
        </footer>
      </main>
    </MainLayout>
  );
};

export default SubjectsManagement;
