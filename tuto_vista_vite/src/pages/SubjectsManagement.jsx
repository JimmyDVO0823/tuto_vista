import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import SubjectTable from '../components/ui/SubjectTable/SubjectTable';
import Button from '../components/ui/Button/Button';
import Searcher from '../components/ui/Searcher/Searcher';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import AddSubjectModal from '../features/tutors/AddSubjectModal/AddSubjectModal';

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
          // Obtener materias del tutor con progreso y próxima sesión
          const data = await api.get(`/tutores/${user.id}/materias`);
          setSubjects(data || []);
        } else {
          // Obtener materias reales del estudiante
          const data = await api.get(`/api/v1/students/${user.id}/materias`);
          setSubjects(data || []);
        }
      } catch (err) {
        console.error('Error cargando materias:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [user, role]);

  const handleToggleStatus = async (materiaId) => {
    try {
      await api.patch(`/tutores/${user.id}/materias/${materiaId}/toggle`);
      setSubjects(prev => prev.map(s => 
        s.materiaId === materiaId ? { ...s, activo: !s.activo } : s
      ));
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      alert('No se pudo cambiar el estado de la materia.');
    }
  };

  const handleDeleteMateria = async (materiaId) => {
    if (!window.confirm('¿Estás seguro de que deseas darte de baja de esta materia?')) return;
    
    try {
      await api.delete(`/tutores/${user.id}/materias/${materiaId}`);
      setSubjects(prev => prev.filter(s => s.materiaId !== materiaId));
    } catch (err) {
      console.error('Error al borrar materia:', err);
      alert(err.message || 'No se pudo eliminar la materia. Verifica si tienes sesiones programadas.');
    }
  };

  const handleAddSubject = async (newSubjectData) => {
    try {
      if (!user?.id) throw new Error('Usuario no autenticado');

      await api.post(
        `/tutores/${user.id}/materias`,
        { materiaId: newSubjectData.materiaId },
        token
      );

      // Recargar para obtener la estructura completa del DTO
      const data = await api.get(`/tutores/${user.id}/materias`);
      setSubjects(data || []);
    } catch (err) {
      console.error('Error añadiendo materia:', err);
      alert(`Error: ${err.message || 'No se pudo añadir la materia'}`);
    }
  };

  const normalizeString = (str) => {
    if (!str) return '';
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  const filteredSubjects = subjects.filter((s) => {
    const name = s.nombre || s.name || '';
    const dept = s.departamento || s.dept || '';
    return (
      normalizeString(name).includes(normalizeString(searchQuery)) ||
      normalizeString(dept).includes(normalizeString(searchQuery))
    );
  });

  return (
    <MainLayout>
      <main className="p-3 md:p-8 lg:p-12">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">
              {role === 'tutor' ? 'Catálogo del Tutor' : 'Administración del Sistema'}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold font-headline text-primary tracking-tight leading-tight">
              {role === 'tutor' ? 'Mis Materias Dictadas' : 'Gestión de Materias Académicas'}
            </h2>
          </div>

          {role === 'tutor' && (
            <div className="w-full md:w-auto">
              <Button
                variant="primary"
                className="shadow-xl w-full md:w-auto"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="material-symbols-outlined">add</span>
                Añadir materias
              </Button>
            </div>
          )}
        </header>

        <div className="bg-[#f2f4f6] p-2 rounded-2xl mb-8 flex flex-col md:flex-row items-center gap-3 w-full overflow-hidden">
          <div className="w-full md:flex-1">
            <Searcher
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar materia o departamento..."
            />
          </div>
          <div className="w-full md:w-auto flex gap-2">
            <Button variant="boring" className="w-full md:w-auto">Filtros</Button>
          </div>
        </div>

        <div className="w-full overflow-x-auto rounded-xl">
          <SubjectTable
            subjects={filteredSubjects}
            showTutorColumn={role !== 'tutor'}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteMateria}
          />
        </div>

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
