import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import TutorSearchHeader from '../features/tutors/TutorSearchHeader/TutorSearchHeader';
import SearchFilters from '../features/tutors/SearchFilters/SearchFilters';
import TutorCard from '../features/tutors/TutorCard/TutorCard';
import Pagination from '../components/ui/Pagination/Pagination';
import { api, getCached } from '../services/api';

const TutorsExplorer = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationInfo, setPaginationInfo] = useState({
    totalPages: 0,
    totalElements: 0,
    size: 10
  });
  const [filters, setFilters] = useState({
    departmentId: '',
    subjectId: '',
    minPrice: '',
    maxPrice: '',
    minRating: '',
  });

  // Cargar metadata (departamentos y materias) al inicio — con caché
  useEffect(() => {
    fetchMetadata();
  }, []);

  // Buscar tutores con debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTutors(currentPage);
    }, 300);
    return () => clearTimeout(timer);
  }, [filters, searchQuery, currentPage]);

  const fetchMetadata = async () => {
    try {
      const [deptData, subjData] = await Promise.all([
        getCached('/departamentos'),
        getCached('/materias'),
      ]);
      setDepartments(deptData || []);
      setSubjects(subjData || []);
    } catch (err) {
      console.error('Error cargando metadata:', err);
    }
  };

  const fetchTutors = async (page = 0) => {
    try {
      setLoading(true);

      const params = {};
      if (searchQuery) params.nombre = searchQuery;
      if (filters.minPrice) params.minPrecio = filters.minPrice;
      if (filters.maxPrice) params.maxPrecio = filters.maxPrice;
      if (filters.minRating) params.minCalificacion = filters.minRating;
      if (filters.subjectId) params.materiaId = filters.subjectId;
      if (filters.departmentId) params.departamentoId = filters.departmentId;
      params.page = page;
      params.size = 10;

      const response = await api.get('/tutores', params);
      
      const data = response.content || [];
      setPaginationInfo({
        totalPages: response.totalPages || 0,
        totalElements: response.totalElements || 0,
        size: response.size || 10
      });

      const mappedTutors = data.map(t => ({
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
    setCurrentPage(0); // Reset a primera página al filtrar
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MainLayout>
      <main className="flex-1 p-4 md:p-10 min-h-screen">
        <TutorSearchHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mt-6 md:mt-12">
          <aside className="col-span-12 md:col-span-3">
            <SearchFilters
              departments={departments}
              subjects={subjects}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          <section className="col-span-12 md:col-span-9 space-y-10">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {tutors.map((tutor) => (
                  <TutorCard key={tutor.id} {...tutor} />
                ))}
              </div>
            )}

            {!loading && !error && tutors.length > 0 && (
              <div className="pt-10 border-t border-gray-100 flex justify-center">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={paginationInfo.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </section>
        </div>
      </main>
    </MainLayout>
  );
};

export default TutorsExplorer;