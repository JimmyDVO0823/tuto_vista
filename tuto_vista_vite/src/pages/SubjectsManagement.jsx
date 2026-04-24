import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import SubjectTable from '../components/ui/SubjectTable/SubjectTable';
import Button from '../components/ui/Button/Button';
import Searcher from '../components/ui/Searcher/Searcher';
import { useAuth } from '../context/AuthContext';

/**
 * SubjectsManagement Page.
 * Logic Rationale: Orchestrates the view for both Students (enrolled courses) 
 * and Tutors (taught subjects). It dynamically adjusts the UI hierarchy 
 * based on the authenticated role.
 * 
 * @component
 */
const SubjectsManagement = () => {
  const { user } = useAuth();
  /** @type {'student'|'tutor'} */
  const role = user?.role || 'student';
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Mock Data Registry.
   * Logic Rationale: For tutors, we filter or mock subjects where they 
   * are the primary instruction lead.
   */
  const allSubjects = [
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

  // Logic Rationale: If tutor, we mock their specific portfolio. 
  // In a real scenario, this would be a filtered API call to 'tutor_materias'.
  const displaySubjects = role === 'tutor' 
    ? allSubjects.slice(0, 2).map(s => ({ ...s, tutor: user?.name || 'Tutor Actual' }))
    : allSubjects;

  const normalizeString = (str) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredSubjects = displaySubjects.filter((s) =>
    normalizeString(s.name).includes(normalizeString(searchQuery)) ||
    normalizeString(s.dept).includes(normalizeString(searchQuery))
  );

  return (
    <MainLayout>
      <main className="p-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">
              {role === 'tutor' ? 'Catálogo del Tutor' : 'Administración del Sistema'}
            </p>
            <h2 className="text-5xl font-extrabold font-headline text-primary tracking-tight leading-tight">
              {role === 'tutor' ? 'Mis Materias Dictadas' : 'Gestión de Materias Académicas'}
            </h2>
          </div>
          
          {role === 'tutor' && (
            <Button variant="primary" className="shadow-xl">
              <span className="material-symbols-outlined">add</span>
              Añadir materias
            </Button>
          )}
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

        <SubjectTable 
          subjects={filteredSubjects} 
          showTutorColumn={role !== 'tutor'}
        />
      </main>
    </MainLayout>
  );
};

export default SubjectsManagement;
