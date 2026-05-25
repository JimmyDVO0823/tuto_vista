import React from 'react';

/**
 * SessionCard Component
 * Displays a scheduled tutoring session.
 * Adheres to the "Academic Editorial" design pattern.
 *
 * @param {Object} props
 * @param {Object} props.session - The session object (SesionTutoriaDTO)
 * @param {Function} props.onCancel - Handler for canceling the session
 * @param {boolean} props.isLoading - Whether an action is loading
 */
const SessionCard = ({ session, onCancel, isLoading = false }) => {
  const {
    id,
    estudianteNombre,
    materiaNombre,
    programadaPara,
    duracionMin,
    enlaceReunion,
    estado
  } = session;

  // Timezone-proof date calculations (using UTC as backend stores local time in UTC)
  const start = new Date(programadaPara);
  const end = new Date(start.getTime() + duracionMin * 60000);

  const dateStr = start.toLocaleDateString('es-ES', {
    timeZone: 'UTC',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const startStr = start.toLocaleTimeString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  const endStr = end.toLocaleTimeString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
  const timeStr = `${startStr} - ${endStr}`;

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
            <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-blue-50 text-primary">
              {estado === 'programada' ? 'Programada' : 'En Progreso'}
            </span>
          </div>
        </div>

        {/* Right column: Session details */}
        <div className="flex-1 w-full flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-surface-container-low rounded-md">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">{materiaNombre}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1">Fecha</span>
                <p className="text-sm font-medium text-primary capitalize">{dateStr}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1">Horario & Duración</span>
                <p className="text-sm font-medium text-primary">{timeStr} <span className="text-elegant-gray ml-1">({duracionMin} min)</span></p>
              </div>
            </div>

            {enlaceReunion && (
              <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1">Enlace de Reunión</span>
                  <a href={enlaceReunion} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:text-academic-gold transition-colors break-all">
                    {enlaceReunion}
                  </a>
                </div>
                <a 
                  href={enlaceReunion} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-4 px-4 py-2 bg-primary text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-colors shrink-0"
                >
                  Unirse
                </a>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 justify-end">
            <button
              onClick={() => onCancel(id)}
              disabled={isLoading}
              className="px-6 py-2.5 rounded-md text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Cancelando...' : 'Cancelar Tutoría'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
