import React from 'react';
import RequestCard from '../../tutors/RequestCard/RequestCard';

const AceptadasTab = ({ aceptadas, onCancelar, processingId }) => {
  if (aceptadas.length === 0) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-16 text-center shadow-sm">
        <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">hourglass_empty</span>
        <h3 className="text-xl font-bold text-primary mb-2 font-display">No hay solicitudes por pagar</h3>
        <p className="text-gray-500 text-sm">Aquí verás las tutorías que aceptaste y cuyos alumnos están por pagar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {aceptadas.map(solicitud => (
        <RequestCard
          key={solicitud.id}
          solicitud={solicitud}
          onAccept={null}
          onReject={onCancelar}
          isLoading={processingId === solicitud.id}
          isAcceptedView={true}
        />
      ))}
    </div>
  );
};

export default AceptadasTab;
