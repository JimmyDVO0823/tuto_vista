import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import SubjectTable from '../components/ui/SubjectTable/SubjectTable';
import Button from '../components/ui/Button/Button';
import Searcher from '../components/ui/Searcher/Searcher';

const SubjectsManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

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

  const normalizeString = (str) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredSubjects = subjects.filter((s) =>
    normalizeString(s.name).includes(normalizeString(searchQuery)) ||
    normalizeString(s.dept).includes(normalizeString(searchQuery))
  );

  return (
    <MainLayout>
      <main className="p-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">Administración del Sistema</p>
            <h2 className="text-5xl font-extrabold font-headline text-primary tracking-tight leading-tight">Gestión de Materias Académicas</h2>
          </div>
          <Button variant="primary" className="rounded-xl px-10">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Agregar Nueva Materia</span>
          </Button>
        </header>

        <div className="bg-[#f2f4f6] p-2 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-4">
          <Searcher 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Buscar materia o departamento..." 
          />
          <div className="flex gap-2">
             <Button variant="boring">Filtros</Button>
          </div>
        </div>

        <SubjectTable subjects={filteredSubjects} />
      </main>
    </MainLayout>
  );
};

export default SubjectsManagement;
