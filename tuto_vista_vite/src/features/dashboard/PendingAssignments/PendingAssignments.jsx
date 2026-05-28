/**
 * @fileoverview Dashboard Feature - Pending Assignments Registry
 * @module components/features/dashboard/PendingAssignments
 * @description Manages the display of outstanding academic tasks. 
 * Combines a list of pending activities with pagination controls 
 * for optimized task management.
 */

import React, { useState, useEffect } from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import ActivityCard from '../ActivityCard/ActivityCard';
import { api } from '../../../services/api';

/**
 * PendingAssignments Component.
 * 
 * @component
 */
const PendingAssignments = ({ userId }) => {
  const [assignmentsData, setAssignmentsData] = useState({
    content: [],
    totalPages: 0,
    currentPage: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async (page = 0) => {
    try {
      setLoading(true);
      const response = await api.get(`/actividades/estudiante/${userId}/pendientes/paginado`, { page, size: 5 });
      setAssignmentsData(response);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAssignments(0);
    }
  }, [userId]);

  const handlePageChange = (newPage) => {
    fetchAssignments(newPage);
  };

  const handleComplete = async (id) => {
    try {
      await api.patch(`/actividades/${id}/completar`);
      // Re-fetch current page or next page if current becomes empty
      fetchAssignments(assignmentsData.currentPage);
    } catch (error) {
      console.error("Error completing activity:", error);
    }
  };

  return (
    <article className="space-y-8 mt-16">
      <h2 className="text-2xl font-bold font-headline text-primary">Compromisos pendientes</h2>
      
      {loading ? (
        <div className="bg-surface-container-low/30 rounded-2xl p-8 animate-pulse">
          <div className="space-y-4">
            {[1, 2].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl"></div>)}
          </div>
        </div>
      ) : assignmentsData.content.length === 0 ? (
        <div className="bg-surface-container-low/30 border border-dashed border-outline-variant/50 rounded-2xl p-8 text-center">
          <span className="material-symbols-outlined text-gray-300 text-4xl mb-2">task</span>
          <p className="text-gray-400 italic text-sm">No tienes actividades pendientes por el momento.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignmentsData.content.map((activity) => (
            <ActivityCard 
              key={activity.id}
              initial={activity.sesionMateria?.charAt(0) || 'A'}
              title={activity.recursoTitulo}
              subtitle={`${activity.sesionMateria} • Pendiente`}
              time="Pendiente"
              buttonText="Ir a actividad"
              actionPath={activity.recursoUrl}
              isExternal={true}
              extraContent={
                <button
                  onClick={() => handleComplete(activity.id)}
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
      
      {/* Pagination Component */}
      {!loading && assignmentsData.totalPages > 1 && (
        <div className="pt-4">
          <Pagination 
            currentPage={assignmentsData.currentPage}
            totalPages={assignmentsData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </article>
  );
};

export default PendingAssignments;
