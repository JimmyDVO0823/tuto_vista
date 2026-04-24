import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import SubjectTable from '../components/ui/SubjectTable/SubjectTable';
import Button from '../components/ui/Button/Button';
import Searcher from '../components/ui/Searcher/Searcher';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import AddSubjectModal from '../components/features/tutors/AddSubjectModal/AddSubjectModal';

/**
 * SubjectsManagement Page.
 * Logic Rationale: Orchestrates the view for both Students (enrolled courses) 
 * and Tutors (taught subjects). It dynamically adjusts the UI hierarchy 
 * based on the authenticated role and persists data to Supabase.
 * 
 * @component
 */
const SubjectsManagement = () => {
  const { user } = useAuth();
  /** @type {'student'|'tutor'} */
  const role = user?.role || 'student';
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Data Fetching Orchestrator.
   * Logic Rationale: Retrieves the subject catalog for the current user. 
   * If tutor, it resolves the 'perfiles_tutor' identity to filter 'tutor_materias'.
   */
  useEffect(() => {
    const fetchTutorSubjects = async () => {
      if (!user?.email) return;

      setLoading(true);
      try {
        // Resolve Tutor Profile ID using email (consistent across Auth and DB)
        const { data: tutorProfile, error: profileError } = await supabase
          .from('perfiles_tutor')
          .select('id, perfiles!inner(id, correo)')
          .eq('perfiles.correo', user.email)
          .single();

        if (profileError) {
          console.warn('Este usuario no tiene un perfil de tutor activo:', profileError);
          setSubjects([]);
          return;
        }

        // 2. Fetch Subjects using the resolved integer tutor_id
        const { data, error } = await supabase
          .from('tutor_materias')
          .select(`
            materia_id,
            materias (
              id,
              nombre,
              departamentos (nombre)
            )
          `)
          .eq('tutor_id', tutorProfile.id);

        if (error) throw error;

        // 3. Map to UI format
        const mappedSubjects = data.map(tm => ({
          name: tm.materias.nombre,
          dept: tm.materias.departamentos?.nombre || 'General',
          status: 'ACTIVO',
          sem: '2024-A',
          tutor: user.name,
          nextActivity: 'Pendiente',
          completedActivities: 2,
          totalActivities: 5
        }));

        setSubjects(mappedSubjects);
      } catch (err) {
        console.error('Error fetching tutor subjects:', err);
      } finally {
        setLoading(false);
      }
    };

    if (role === 'tutor') {
      fetchTutorSubjects();
    } else {
      setSubjects([
        { name: 'Cálculo Diferencial', dept: 'Matemáticas', status: 'ACTIVO', sem: 'Semestre A', tutor: 'Dr. Roberto Gómez', nextActivity: 'Mañana', completedActivities: 3, totalActivities: 5 }
      ]);
      setLoading(false);
    }
  }, [user, role]);

  /**
   * Action Handlers.
   * Logic Rationale: Persists the new tutor-subject relationship to 
   * the 'tutor_materias' junction table using resolved IDs.
   */
  const handleAddSubject = async (newSubjectData) => {
    try {
      if (!user?.email) throw new Error('Usuario no autenticado');

      // Resolve Tutor Profile ID first to avoid UUID/Integer mismatch
      const { data: tutorProfile, error: profileError } = await supabase
        .from('perfiles_tutor')
        .select('id, perfiles!inner(correo)')
        .eq('perfiles.correo', user.email)
        .single();

      if (profileError || !tutorProfile) {
        throw new Error('No se pudo encontrar tu perfil de tutor.');
      }

      const { error } = await supabase
        .from('tutor_materias')
        .insert([{ 
          tutor_id: tutorProfile.id, 
          materia_id: newSubjectData.materia_id 
        }]);

      if (error) throw error;

      // Update local state for immediate feedback
      setSubjects(prev => [{
        name: newSubjectData.name,
        dept: newSubjectData.dept,
        status: 'ACTIVO',
        sem: 'Reciente',
        tutor: user.name,
        nextActivity: 'Por programar',
        completedActivities: 0,
        totalActivities: 5
      }, ...prev]);

    } catch (err) {
      console.error('Error adding subject:', err);
      alert(`Error: ${err.message || 'No se pudo añadir la materia'}`);
    }
  };

  const normalizeString = (str) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

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
