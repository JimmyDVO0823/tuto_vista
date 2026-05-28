import React from 'react';
import SessionCard from '../../tutors/SessionCard/SessionCard';

const SesionesTab = ({ sesiones, onUpdateStatus, onUpdateLink, onAsignarActividad, processingId }) => {
  if (sesiones.length === 0) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-16 text-center shadow-sm">
        <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">calendar_today</span>
        <h3 className="text-xl font-bold text-primary mb-2 font-display">No tienes tutorías agendadas</h3>
        <p className="text-gray-500 text-sm">Tus próximas sesiones de tutoría confirmadas se listarán en esta pestaña.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sesiones.map(session => (
        <SessionCard
          key={session.id}
          session={session}
          onUpdateStatus={onUpdateStatus}
          onUpdateLink={onUpdateLink}
          onAsignarActividad={onAsignarActividad}
          isLoading={processingId === session.id}
        />
      ))}
    </div>
  );
};

export default SesionesTab;
