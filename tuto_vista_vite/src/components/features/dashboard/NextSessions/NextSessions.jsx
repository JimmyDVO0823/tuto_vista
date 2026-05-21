/**
 * @fileoverview Dashboard Feature - Upcoming Sessions Registry
 * @module components/features/dashboard/NextSessions
 * @description Orchestrates the visualization of future academic encounters. 
 * It maps a local session registry into highly interactive ActivityCards, 
 * integrating pagination for navigable session history.
 */

import React from 'react';
import Pagination from '../../../ui/Pagination/Pagination';
import ActivityCard from '../ActivityCard/ActivityCard';

/**
 * NextSessions Component.
 * 
 * @component
 */
const NextSessions = ({ sessions = [], isTutor = false }) => {
  return (
    <article className="space-y-8">
      <h2 className="text-2xl font-bold font-headline text-primary">Próximas Sesiones</h2>
      <div className="space-y-4">
        {sessions.length > 0 ? sessions.map((session, i) => {
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
      
      {/* Pagination Component */}
      {sessions.length > 0 && <Pagination />}
    </article>
  );
};

export default NextSessions;

