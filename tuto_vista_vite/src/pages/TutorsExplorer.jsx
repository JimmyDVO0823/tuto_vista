import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import TutorSearchHeader from '../components/features/tutors/TutorSearchHeader/TutorSearchHeader';
import SearchFilters from '../components/features/tutors/SearchFilters/SearchFilters';
import TutorCard from '../components/features/tutors/TutorCard/TutorCard';
import Pagination from '../components/ui/Pagination/Pagination';
import { api } from '../lib/api';

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
  });

  // Cargar metadata (departamentos y materias) al inicio
  useEffect(() => {
    fetchMetadata();
  }, []);

  // Buscar tutores con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTutors();
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, searchQuery, applyFilters]);

  const fetchMetadata = async () => {
    try {
      const [deptData, subjData] = await Promise.all([
        api.get('/departamentos'),
        api.get('/materias'),
      ]);
      setDepartments(deptData || []);
      setSubjects(subjData || []);
    } catch (err) {
      console.error('Error cargando metadata:', err);
    }
  };

  const fetchTutors = async () => {
    try {
      setLoading(true);

      // Construir query params
      const params = new URLSearchParams();
      if (applyFilters) {
        if (filters.minPrice) params.append('minPrecio', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrecio', filters.maxPrice);
        if (filters.minRating) params.append('minCalificacion', filters.minRating);
        if (filters.subjectId) params.append('materiaId', filters.subjectId);
      }

      const queryString = params.toString();
      const data = await api.get(`/tutores${queryString ? `?${queryString}` : ''}`);

      // Filtrar por nombre en el cliente (búsqueda rápida)
      const filtered = searchQuery
        ? data.filter(t =>
            t.nombre_completo?.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : data;

      const mappedTutors = filtered.map(t => ({
        id: t.id,
        name: t.nombre_completo || 'Tutor Anónimo',
        image: t.url_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.nombre_completo || 'T')}&background=002045&color=fff`,
        subject: t.materias?.slice(0, 2).map(m => m.nombre).join(', ') || 'Varias materias',
        price: t.precio_por_hora || 0,
        rating: t.calificacion_promedio || 0,
        reviews: t.total_sesiones || 0,
        quote: t.biografia || 'Comprometido con la excelencia académica y el éxito del estudiante.',
        isTopRated: (t.calificacion_promedio || 0) >= 4.8,
      }));

      setTutors(mappedTutors);
    } catch (err) {
      console.error('Error cargando tutores:', err);
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