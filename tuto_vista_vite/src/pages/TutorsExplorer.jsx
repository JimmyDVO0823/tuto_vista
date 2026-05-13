import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import TutorSearchHeader from '../components/features/tutors/TutorSearchHeader/TutorSearchHeader';
import SearchFilters from '../components/features/tutors/SearchFilters/SearchFilters';
import TutorCard from '../components/features/tutors/TutorCard/TutorCard';
import Pagination from '../components/ui/Pagination/Pagination';
import { supabase } from '../lib/supabase';

const TutorsExplorer = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [applyFilters, setApplyFilters] = useState(true);
  const [filters, setFilters] = useState({
    departmentId: '',
    subjectId: '',
    minPrice: 20,
    maxPrice: 150,
    minRating: 4,
    availability: 'Esta semana'
  });

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTutors();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [filters, searchQuery, applyFilters]);

  const fetchMetadata = async () => {
    try {
      const { data: deptData } = await supabase.from('departamentos').select('*').order('nombre');
      const { data: subjData } = await supabase.from('materias').select('*').order('nombre');
      setDepartments(deptData || []);
      setSubjects(subjData || []);
    } catch (err) {
      console.error('Error fetching metadata:', err);
    }
  };

  const fetchTutors = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('perfiles_tutor')
        .select(`
          id,
          biografia,
          precio_por_hora,
          calificacion_promedio,
          total_sesiones,
          perfiles!inner (
            nombre_completo,
            url_avatar
          ),
          tutor_materias!inner (
            materia_id,
            materias (
              nombre,
              departamento_id
            )
          )
        `)
        .eq('esta_disponible', true);

      // Search by name (always applied if present)
      if (searchQuery) {
        query = query.ilike('perfiles.nombre_completo', `%${searchQuery}%`);
      }

      // Other filters (conditionally applied)
      if (applyFilters) {
        query = query
          .gte('precio_por_hora', filters.minPrice)
          .lte('precio_por_hora', filters.maxPrice)
          .gte('calificacion_promedio', filters.minRating);

        if (filters.subjectId) {
          query = query.eq('tutor_materias.materia_id', filters.subjectId);
        } else if (filters.departmentId) {
          query = query.eq('tutor_materias.materias.departamento_id', filters.departmentId);
        }
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      const mappedTutors = data.map(t => ({
        id: t.id,
        name: t.perfiles?.nombre_completo || 'Tutor Anónimo',
        image: t.perfiles?.url_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.perfiles?.nombre_completo || 'T')}&background=002045&color=fff`,
        subject: t.tutor_materias?.map(tm => tm.materias?.nombre).filter(Boolean).slice(0, 2).join(', ') || 'Varias materias',
        price: t.precio_por_hora || 0,
        rating: t.calificacion_promedio || 0,
        reviews: t.total_sesiones || 0,
        quote: t.biografia || 'Comprometido con la excelencia académica y el éxito del estudiante.',
        isTopRated: (t.calificacion_promedio || 0) >= 4.8
      }));

      setTutors(mappedTutors);
    } catch (err) {
      console.error('Error fetching tutors:', err);
      setError('No se pudieron cargar los tutores. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <MainLayout>
      <main className="flex-1 p-10 min-h-screen">
        <TutorSearchHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="grid grid-cols-12 gap-10 mt-12">
          {/* Filters Column */}
          <aside className="col-span-3">
             <SearchFilters 
               departments={departments}
               subjects={subjects}
               filters={filters}
               onFilterChange={handleFilterChange}
               applyFilters={applyFilters}
               onToggleFilters={setApplyFilters}
             />
          </aside>

          {/* Results Column */}
          <section className="col-span-9 space-y-10">
             {loading ? (
               <div className="grid grid-cols-2 gap-8">
                 {[1, 2, 3, 4].map((n) => (
                   <div key={n} className="bg-surface-container-lowest animate-pulse rounded-xl h-80"></div>
                 ))}
               </div>
             ) : error ? (
               <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl">
                 {error}
               </div>
             ) : tutors.length === 0 ? (
               <div className="p-8 text-center bg-surface-container-low text-on-surface-variant rounded-xl">
                 No se encontraron tutores disponibles en este momento.
               </div>
             ) : (
               <div className="grid grid-cols-2 gap-8">
                 {tutors.map((tutor) => (
                   <TutorCard key={tutor.id} {...tutor} />
                 ))}
               </div>
             )}
             
             {!loading && !error && tutors.length > 0 && (
               <div className="pt-10 border-t border-gray-100 flex justify-center">
                 <Pagination />
               </div>
             )}
          </section>
        </div>
      </main>
    </MainLayout>
  );
};

export default TutorsExplorer;