import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import SubjectTable from '../components/ui/SubjectTable/SubjectTable';
import Button from '../components/ui/Button/Button';
import Searcher from '../components/ui/Searcher/Searcher';
import { useAuth } from '../context/AuthContext';
import AddSubjectModal from '../components/features/tutors/AddSubjectModal/AddSubjectModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Mock Data Registry.
   * Logic Rationale: Initial set of subjects. For tutors, we augment 
   * this state when they add a new subject via the modal.
   */
  const initialSubjects = [
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

  const [subjects, setSubjects] = useState(initialSubjects);

  /**
   * Action Handlers.
   * Logic Rationale: Local state persistence to simulate database updates 
   * in the absence of a live backend.
   */
  const handleAddSubject = (newSubject) => {
    setSubjects(prev => [{ ...newSubject, tutor: user?.name || 'Tutor Actual' }, ...prev]);
  };

  // Logic Rationale: If tutor, we show their specific portfolio.
  const displaySubjects = role === 'tutor' 
    ? subjects.filter(s => s.tutor === (user?.name || 'Dr. Roberto Gómez') || s.tutor === 'Tutor Actual')
    : subjects;

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
            <Button 
              variant="primary" 
              className="shadow-xl"
              onClick={() => setIsModalOpen(true)}
            >
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

        <AddSubjectModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddSubject}
        />
      </main>
    </MainLayout>
  );
};

export default SubjectsManagement;
