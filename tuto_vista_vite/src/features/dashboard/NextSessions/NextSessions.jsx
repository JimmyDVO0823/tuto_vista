import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import ActivityCard from '../ActivityCard/ActivityCard';
import { api } from '../../../services/api';

/**
 * NextSessions Component.
 * 
 * @component
 */
const NextSessions = ({ userId, isTutor = false }) => {
  const [sessionsData, setSessionsData] = useState({
    content: [],
    totalPages: 0,
    currentPage: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchSessions = async (page = 0) => {
    try {
      setLoading(true);
      const endpoint = isTutor 
        ? `/sesiones/tutor/${userId}/proximas` 
        : `/sesiones/estudiante/${userId}/proximas`;
      
      const response = await api.get(endpoint, { page, size: 5 });
      setSessionsData(response);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSessions(0);
    }
  }, [userId, isTutor]);

  const handlePageChange = (newPage) => {
    fetchSessions(newPage);
  };

  return (
    <article className="space-y-8">
      <h2 className="text-2xl font-bold font-headline text-primary">Próximas Sesiones</h2>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {sessionsData.content.length > 0 ? sessionsData.content.map((session, i) => {
            const initial = session.materiaNombre ? session.materiaNombre.charAt(0) : 'S';
            const otherPerson = isTutor ? session.estudianteNombre : session.tutorNombre;
            const dateStr = session.programadaPara ? new Date(session.programadaPara).toLocaleString([], { timeZone: 'UTC' }) : 'Pendiente';
            
            return (
              <ActivityCard 
                key={session.id || i}
                initial={initial}
                title={session.materiaNombre || 'Sesión'}
                subtitle={`${otherPerson || 'Usuario'} • ${session.estado || 'PROGRAMADA'}`}
                time={dateStr}
                buttonText="Unirse a sesión"
                actionPath={session.enlaceReunion || "#"}
              />
            );
          }) : (
            <p className="text-gray-500">No hay sesiones programadas.</p>
          )}
        </div>
      )}
      
      {/* Pagination Component */}
      {!loading && sessionsData.totalPages > 1 && (
        <Pagination 
          currentPage={sessionsData.currentPage}
          totalPages={sessionsData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </article>
  );
};

export default NextSessions;

