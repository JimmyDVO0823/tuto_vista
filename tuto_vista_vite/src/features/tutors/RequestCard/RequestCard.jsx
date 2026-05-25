import React from 'react';

/**
 * RequestCard Component
 * Displays a single tutoring request from a student to a tutor.
 * Adheres to the "Academic Editorial" design pattern.
 *
 * @param {Object} props
 * @param {Object} props.solicitud - The request object (SolicitudDTO)
 * @param {Function} props.onAccept - Handler for accepting the request
 * @param {Function} props.onReject - Handler for rejecting the request
 * @param {boolean} props.isLoading - Whether an action is currently loading
 */
const RequestCard = ({ solicitud, onAccept, onReject, isLoading = false }) => {
  const {
    id,
    estudianteNombre,
    materiaNombre,
    fechaPreferida,
    horaPreferida,
    duracionMin,
    mensaje,
    estado,
    creadoEn
  } = solicitud;

  // Convert dates for display
  const requestedDate = new Date(`${fechaPreferida}T00:00:00`).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Calculate end time
  const [hours, minutes] = horaPreferida.split(':').map(Number);
  const startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);
  const endDate = new Date(startDate.getTime() + duracionMin * 60000);
  const endTimeStr = endDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const timeStr = `${horaPreferida.substring(0, 5)} - ${endTimeStr}`;

  // Avatar fallback
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(estudianteNombre)}&background=f2f4f6&color=002045&size=100`;

  return (
    <div className="bg-surface-container-lowest p-5 md:p-8 rounded-2xl shadow-ambient hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left column: User info (Asymmetrical layout 30/70) */}
        <div className="flex items-center gap-4 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-outline-variant/10 pb-6 lg:pb-0 lg:pr-6">
          <img 
            src={avatarUrl} 
            alt={estudianteNombre} 
            className="w-16 h-16 rounded-full object-cover bg-surface-container-low"
          />
          <div>
            <h4 className="font-bold text-primary text-lg leading-tight">{estudianteNombre}</h4>
            <span className="text-xs font-bold text-academic-gold uppercase tracking-widest block mt-1">Estudiante</span>
            <span className="text-[10px] text-gray-400 mt-2 block">
              Recibida: {new Date(creadoEn).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Right column: Request details */}
        <div className="flex-1 w-full flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-surface-container-low rounded-md">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">{materiaNombre}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1">Fecha Propuesta</span>
                <p className="text-sm font-medium text-primary capitalize">{requestedDate}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1">Horario & Duración</span>
                <p className="text-sm font-medium text-primary">{timeStr} <span className="text-elegant-gray ml-1">({duracionMin} min)</span></p>
              </div>
            </div>

            {mensaje && (
              <div className="bg-surface-container-low p-4 rounded-xl mt-4">
                <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-2">Mensaje del Estudiante</span>
                <p className="text-sm text-primary/80 italic leading-relaxed">"{mensaje}"</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-end">
            <button
              onClick={() => onReject(id)}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-md text-sm font-bold bg-surface text-elegant-gray hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              Rechazar
            </button>
            <button
              onClick={() => onAccept(id)}
              disabled={isLoading}
              className="signature-gradient text-white px-8 py-2.5 rounded-md text-sm font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? 'Procesando...' : 'Aceptar Tutoría'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
