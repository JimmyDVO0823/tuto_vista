import React, { useState } from 'react';

/**
 * SessionCard Component
 * Displays a scheduled tutoring session and allows tutors to manage the meeting link.
 */
const SessionCard = ({ session, onCancel, onUpdateLink, isLoading = false }) => {
  const {
    id,
    estudianteNombre,
    materiaNombre,
    programadaPara,
    duracionMin,
    enlaceReunion,
    estado
  } = session;

  // Estados locales para la edición del enlace
  const [isEditing, setIsEditing] = useState(false);
  const [linkInput, setLinkInput] = useState(enlaceReunion || '');
  const [isSavingLink, setIsSavingLink] = useState(false);

  // Timezone-proof date calculations
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

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(estudianteNombre)}&background=f2f4f6&color=002045&size=100`;

  const handleSave = async () => {
    if (!linkInput.trim()) {
      alert("Por favor, ingresa un enlace válido.");
      return;
    }

    setIsSavingLink(true);
    try {
      await onUpdateLink(id, linkInput);
      setIsEditing(false); // Solo cierra la edición si no hubo excepciones
    } catch (err) {
      // El error ya lo reporta el alert de GestionTutorias, mantenemos el modo edición abierto
    } finally {
      setIsSavingLink(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest p-5 md:p-8 rounded-2xl shadow-ambient hover:-translate-y-1 transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-8 items-start">

        {/* Columna Izquierda: Info del Estudiante */}
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

        {/* Columna Derecha: Detalles de la Sesión */}
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

            {/* SECCIÓN DINÁMICA DEL ENLACE DE REUNIÓN */}
            <div className="mt-4">
              {isEditing ? (
                <div className="bg-surface-container-low p-4 rounded-xl flex flex-col md:flex-row gap-3 items-end md:items-center">
                  <div className="flex-1 w-full">
                    <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1">Asignar Link de Reunión</span>
                    <input
                      type="text"
                      className="w-full text-sm p-2.5 border border-outline-variant/30 rounded-lg bg-surface-container-lowest focus:outline-none focus:border-primary text-primary"
                      placeholder="Ej: https://meet.google.com/abc-defg-hij"
                      value={linkInput}
                      onChange={(e) => setLinkInput(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 w-full md:w-auto justify-end shrink-0">
                    <button
                      onClick={() => { setIsEditing(false); setLinkInput(enlaceReunion || ''); }}
                      className="px-4 py-2 bg-gray-200 text-elegant-gray rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-gray-300 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSavingLink}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-colors disabled:opacity-50"
                    >
                      {isSavingLink ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {enlaceReunion ? (
                    <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between">
                      <div className="overflow-hidden mr-2">
                        <span className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1">Enlace de Reunión</span>
                        <a href={enlaceReunion} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:text-academic-gold transition-colors break-all line-clamp-1">
                          {enlaceReunion}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-3 py-2 border border-outline-variant/30 hover:border-elegant-gray rounded-md text-xs font-bold text-elegant-gray uppercase tracking-wider transition-colors"
                        >
                          Editar
                        </button>
                        <a
                          href={enlaceReunion}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-primary text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-colors"
                        >
                          Unirse
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-dashed border-primary/40 p-4 rounded-xl flex items-center justify-between bg-blue-50/20">
                      <div>
                        <p className="text-sm text-elegant-gray font-medium">Aún no has agregado el enlace para este encuentro.</p>
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-200 shrink-0"
                      >
                        ➕ Agregar Enlace
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>

          {/* Acciones de la Tarjeta */}
          <div className="flex gap-3 pt-4 justify-end border-t border-outline-variant/10">
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