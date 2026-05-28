import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import ActivityCard from '../ActivityCard/ActivityCard';
import Pagination from '../../../components/ui/Pagination/Pagination';

/**
 * PendingAssignments Component.
 * Fetches real activities assigned by tutors from the backend.
 */
const PendingAssignments = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const data = await api.get(`/actividades/estudiante/${user.id}/pendientes`);
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  const handleCompleteActivity = async (id) => {
    try {
      await api.patch(`/actividades/${id}/completar`);
      setActivities(prev => prev.filter(act => act.id !== id));
    } catch (error) {
      console.error("Error completing activity:", error);
      alert("Error al completar la actividad: " + (error.message || error));
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 mt-16 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded"></div>
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <article className="space-y-8 mt-16">
      <h2 className="text-2xl font-bold font-headline text-primary">Compromisos pendientes</h2>
      
      {activities.length === 0 ? (
        <div className="bg-surface-container-low/30 border border-dashed border-outline-variant/50 rounded-2xl p-8 text-center">
          <span className="material-symbols-outlined text-gray-300 text-4xl mb-2">task</span>
          <p className="text-gray-400 italic text-sm">No tienes actividades pendientes por el momento.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((act) => (
            <ActivityCard 
              key={act.id}
              initial={act.sesionMateria?.charAt(0) || 'A'}
              title={act.recursoTitulo}
              subtitle={`${act.sesionMateria} • ${act.estado}`}
              time="Pendiente"
              buttonText="Ir a actividad"
              actionPath={act.recursoUrl}
              isExternal={true}
              extraContent={
                <button
                  onClick={() => handleCompleteActivity(act.id)}
                  className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-green-700 bg-green-50 hover:bg-green-100 rounded-xl transition-all border border-green-200 w-full md:w-auto justify-center text-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Actividad terminada
                </button>
              }
            />
          ))}
        </div>
      )}
      
      {activities.length > 5 && <Pagination />}
    </article>
  );
};

export default PendingAssignments;
