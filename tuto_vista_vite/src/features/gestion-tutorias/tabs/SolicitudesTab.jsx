import React from 'react';
import RequestCard from '../../tutors/RequestCard/RequestCard';

const SolicitudesTab = ({ solicitudes, onAccept, onReject, processingId }) => {
  if (solicitudes.length === 0) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-16 text-center shadow-sm">
        <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">inbox</span>
        <h3 className="text-xl font-bold text-primary mb-2 font-display">No hay solicitudes pendientes</h3>
        <p className="text-gray-500 text-sm">Cuando un estudiante te envíe una propuesta de tutoría, la verás aquí.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {solicitudes.map(solicitud => (
        <RequestCard
          key={solicitud.id}
          solicitud={solicitud}
          onAccept={onAccept}
          onReject={onReject}
          isLoading={processingId === solicitud.id}
        />
      ))}
    </div>
  );
};

export default SolicitudesTab;
