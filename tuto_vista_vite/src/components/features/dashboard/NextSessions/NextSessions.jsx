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
const NextSessions = () => {
  const upcomingSessions = [
    { 
      title: 'Econometría Avanzada', 
      time: '14:00 - 15:30', 
      tutor: 'Dra. Elena Vargas', 
      type: 'Editorial',
      initial: 'E'
    },
    { 
      title: 'Escritura Académica II', 
      time: '17:00 - 18:30', 
      tutor: 'Dr. Julián Reed', 
      type: 'Revision',
      initial: 'A'
    },
    { 
      title: 'Cálculo Multivariable', 
      time: '09:00 - 10:30', 
      tutor: 'Dra. Sarah Jenkins', 
      type: 'Masterclass',
      initial: 'C'
    }
  ];

  return (
    <article className="space-y-8">
      <h2 className="text-2xl font-bold font-headline text-primary">Próximas Sesiones</h2>
      <div className="space-y-4">
        {upcomingSessions.map((session, i) => (
          <ActivityCard 
            key={i}
            initial={session.initial}
            title={session.title}
            subtitle={`${session.tutor} • ${session.type}`}
            time={session.time}
            buttonText="Unirse a sesión"
            actionPath="#"
          />
        ))}
      </div>
      
      {/* Pagination Component */}
      <Pagination />
    </article>
  );
};

export default NextSessions;

