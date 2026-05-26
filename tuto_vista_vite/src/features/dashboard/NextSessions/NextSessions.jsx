/**
 * @fileoverview Dashboard Feature - Upcoming Sessions Registry
 * @module components/features/dashboard/NextSessions
 * @description Orchestrates the visualization of future academic encounters. 
 * It maps a local session registry into highly interactive ActivityCards, 
 * integrating pagination for navigable session history.
 */

import React from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import ActivityCard from '../ActivityCard/ActivityCard';
import { BotonPagoMercadoPago } from '../../../components/ui/Button/BotonPagoMercadoPago';

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
        {sessions
          .filter(session => {
            const isProgrammed = session.estado?.toUpperCase() === 'PROGRAMADA' || session.estado?.toUpperCase() === 'COMPLETADA'; // Mostramos programadas
            const sessionDate = session.programadaPara ? new Date(session.programadaPara) : null;
            const isFuture = sessionDate && sessionDate > new Date();
            return isProgrammed && isFuture;
          })
          .length > 0 ? sessions
          .filter(session => {
            const isProgrammed = session.estado?.toUpperCase() === 'PROGRAMADA';
            const sessionDate = session.programadaPara ? new Date(session.programadaPara) : null;
            return isProgrammed && sessionDate && sessionDate > new Date();
          })
          .map((session, i) => {
            const initial = session.materiaNombre ? session.materiaNombre.charAt(0) : 'S';
            const otherPerson = isTutor ? session.estudianteNombre : session.tutorNombre;
            // Usamos locale local para mostrar la hora real
            const dateStr = session.programadaPara ? new Date(session.programadaPara).toLocaleString() : 'Pendiente';
            
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
          <p className="text-gray-500 italic text-sm">No hay sesiones programadas próximamente.</p>
        )}
      </div>
      
      {/* Pagination Component */}
      {sessions.length > 0 && <Pagination />}
    </article>
  );
};

export default NextSessions;

