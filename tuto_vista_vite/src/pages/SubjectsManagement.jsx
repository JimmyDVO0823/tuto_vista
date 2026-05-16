import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import SubjectTable from '../components/ui/SubjectTable/SubjectTable';
import Button from '../components/ui/Button/Button';
import Searcher from '../components/ui/Searcher/Searcher';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import AddSubjectModal from '../components/features/tutors/AddSubjectModal/AddSubjectModal';

/**
 * SubjectsManagement Page.
 * Migrada de Supabase a Spring Boot backend.
 */
const SubjectsManagement = () => {
  const { user, token } = useAuth();
  const role = user?.role || 'estudiante';
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        if (role === 'tutor') {
          // Obtener materias del tutor desde el backend
          const data = await api.get(`/tutores/${user.id}/materias`);
          const mapped = (data || []).map(m => ({
            name: m.nombre,
            dept: m.departamento_nombre || 'General',
            status: 'ACTIVO',
            sem: '2024-A',
            tutor: user.name,
            nextActivity: 'Pendiente',
            completedActivities: 2,
            totalActivities: 5,
          }));
          setSubjects(mapped);
        } else {
          // Mock para estudiantes (hasta que exista el endpoint)
          setSubjects([
            { name: 'Cálculo Diferencial', dept: 'Matemáticas', status: 'ACTIVO', sem: 'Semestre A', tutor: 'Dr. Roberto Gómez', nextActivity: 'Mañana', completedActivities: 3, totalActivities: 5 },
          ]);
        }
      } catch (err) {
        console.error('Error cargando materias:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [user, role]);

  const handleAddSubject = async (newSubjectData) => {
    try {
      if (!user?.id) throw new Error('Usuario no autenticado');

      await api.post(
        `/tutores/${user.id}/materias`,
        { materiaId: newSubjectData.materiaId },
        token
      );

      setSubjects(prev => [{
        name: newSubjectData.name,
        dept: newSubjectData.dept,
        status: 'ACTIVO',
        sem: 'Reciente',
        tutor: user.name,
        nextActivity: 'Por programar',
        completedActivities: 0,
        totalActivities: 5,
      }, ...prev]);
    } catch (err) {
      console.error('Error añadiendo materia:', err);
      alert(`Error: ${err.message || 'No se pudo añadir la materia'}`);
    }
  };

  const normalizeString = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const filteredSubjects = subjects.filter((s) =>
    normalizeString(s.name).includes(normalizeString(searchQuery)) ||
    normalizeString(s.dept || '').includes(normalizeString(searchQuery))
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
