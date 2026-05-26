import React from 'react';
import Pagination from '../../../components/ui/Pagination/Pagination';
import ActivityCard from '../ActivityCard/ActivityCard';

const NextSessions = ({ sessions = [], isTutor = false }) => {
  const now = new Date();
  
  const paidSessions = sessions.filter(session => {
    // Verificamos si efectivamente ya fue pagada
    const isPaid = session.pagada === true || session.pagado === true || session.estadoPago === 'COMPLETADO' || session.estadoPago === 'APROBADO';
    
    const dateFormatted = session.programadaPara ? session.programadaPara.replace(" ", "T") : null;
    const sessionDate = dateFormatted ? new Date(dateFormatted) : null;
    const isFuture = sessionDate && !isNaN(sessionDate) ? sessionDate > now : true;
    
    return isPaid && isFuture;
  });

  return (
    <article className="space-y-8">
      <h2 className="text-2xl font-bold font-headline text-primary">Próximas Sesiones</h2>
      <div className="space-y-4">
        {paidSessions.map((session, i) => {
          const initial = session.materiaNombre ? session.materiaNombre.charAt(0) : 'S';
          const otherPerson = isTutor ? session.estudianteNombre : session.tutorNombre;
          const dateStr = session.programadaPara ? new Date(session.programadaPara.replace(" ", "T")).toLocaleString() : 'Pendiente';
          
          return (
            <ActivityCard 
              key={session.id || i}
              initial={initial}
              title={session.materiaNombre || 'Sesión'}
              subtitle={`${otherPerson || 'Usuario'} • ✅ PAGADA y CONFIRMADA`}
              time={dateStr}
              buttonText="Unirse a sesión"
              actionPath={session.enlaceReunion || "#"}
            />
          );
        })}
        
        {paidSessions.length === 0 && (
          <p className="text-gray-500 italic text-sm">No hay sesiones pagadas programadas próximamente.</p>
        )}
      </div>
      
      {sessions.length > 0 && <Pagination />}
    </article>
  );
};

export default NextSessions;