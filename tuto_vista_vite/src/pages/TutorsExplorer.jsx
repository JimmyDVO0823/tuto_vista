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

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('perfiles_tutor')
        .select(`
          id,
          biografia,
          precio_por_hora,
          calificacion_promedio,
          total_sesiones,
          perfiles:usuario_id (
            nombre_completo,
            url_avatar
          ),
          tutor_materias (
            materias (
              nombre
            )
          )
        `)
        .eq('esta_disponible', true);

      if (fetchError) throw fetchError;

      const mappedTutors = data.map(t => ({
        id: t.id,
        name: t.perfiles?.nombre_completo || 'Tutor Anónimo',
        image: t.perfiles?.url_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.perfiles?.nombre_completo || 'T')}&background=002045&color=fff`,
        subject: t.tutor_materias?.map(tm => tm.materias?.nombre).filter(Boolean).join(', ') || 'Varias materias',
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

  return (
    <MainLayout>
      <main className="flex-1 p-10 min-h-screen">
        <TutorSearchHeader />
        
        <div className="grid grid-cols-12 gap-10 mt-12">
          {/* Filters Column */}
          <aside className="col-span-3">
             <SearchFilters />
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