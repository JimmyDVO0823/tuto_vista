import React, { useState, useEffect } from 'react';

const SessionCard = ({ session, onUpdateStatus, onUpdateLink, onAsignarActividad, isLoading = false }) => {
  const {
    id,
    estudianteNombre,
    materiaNombre,
    programadaPara,
    duracionMin,
    enlaceReunion,
    estado
  } = session;

  // Estados de edición de link
  const [isEditing, setIsEditing] = useState(false);
  const [linkInput, setLinkInput] = useState(enlaceReunion || '');
  const [isSavingLink, setIsSavingLink] = useState(false);

  // Gestión del formulario de Cancelación / Inasistencia
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [tipoCancelacion, setTipoCancelacion] = useState('cancelada');
  const [motivo, setMotivo] = useState('');

  // --- CONTROL DE TIEMPO ---
  const [puedeIniciar, setPuedeIniciar] = useState(false);

  // Convertimos la fecha de la sesión a un objeto Date válido
  const start = new Date(programadaPara);
  const end = new Date(start.getTime() + duracionMin * 60000);

  useEffect(() => {
    const verificarTiempo = () => {
      const ahora = new Date();

      // Permitir iniciar desde 10 minutos antes de la hora programada
      const tiempoPermitido = new Date(start.getTime() - 10 * 60000);

      // Si ya pasó de ese tiempo permitido, se habilitan las acciones en tiempo real
      setPuedeIniciar(ahora >= tiempoPermitido);
    };

    // Validamos inmediatamente al montar el componente
    verificarTiempo();

    // Registramos un intervalo para que se habilite automáticamente si el tutor tiene la página abierta
    const interval = setInterval(verificarTiempo, 30000); // Revisa cada 30 segundos

    return () => clearInterval(interval);
  }, [programadaPara, start]);
  // -------------------------

  // Formateadores de fechas y horas
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

  const handleSaveLink = async () => {
    setIsSavingLink(true);
    try {
      await onUpdateLink(id, linkInput);
      setIsEditing(false);
    } catch (err) { }
    finally { setIsSavingLink(false); }
  };

  const handleConfirmCancel = async () => {
    if (!motivo.trim()) {
      alert("Por favor, introduce un motivo.");
      return;
    }
    await onUpdateStatus(id, tipoCancelacion, motivo);
    setShowCancelForm(false);
  };

  const handleDirectStatusChange = async (nuevoEstado) => {
    await onUpdateStatus(id, nuevoEstado);
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
            <span className={`inline-block mt-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${estado === 'en_progreso' ? 'bg-green-50 text-green-700 animate-pulse' : 'bg-blue-50 text-primary'
              }`}>
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

            {/* Link de Reunión */}
            {!showCancelForm && (
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
                        onClick={handleSaveLink}
                        disabled={isSavingLink}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary-container transition-colors"
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
                        <p className="text-sm text-elegant-gray font-medium">Aún no has agregado el enlace para este encuentro.</p>
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
            )}

            {/* FORMULARIO DE RESOLUCIÓN */}
            {showCancelForm && (
              <div className="bg-red-50/40 border border-red-100 p-5 rounded-xl space-y-4">
                <span className="text-xs font-extrabold text-red-800 uppercase tracking-wider block">Resolución de la Sesión</span>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Cancelar tutoría siempre está disponible */}
                  <label className="flex items-center gap-2 text-sm text-primary font-medium cursor-pointer">
                    <input
                      type="radio" name="tipoCancelacion" value="cancelada"
                      checked={tipoCancelacion === 'cancelada'}
                      onChange={() => setTipoCancelacion('cancelada')}
                      className="accent-primary w-4 h-4"
                    />
                    Cancelar Tutoría (Previo al encuentro)
                  </label>

                  {/* No asistió SOLO si está en el tiempo permitido */}
                  {puedeIniciar && (
                    <label className="flex items-center gap-2 text-sm text-primary font-medium cursor-pointer">
                      <input
                        type="radio" name="tipoCancelacion" value="no_asistio"
                        checked={tipoCancelacion === 'no_asistio'}
                        onChange={() => setTipoCancelacion('no_asistio')}
                        className="accent-primary w-4 h-4"
                      />
                      El estudiante NO asistió (Inasistencia)
                    </label>
                  )}
                </div>

                <div>
                  <textarea
                    rows="2"
                    placeholder={tipoCancelacion === 'cancelada' ? "Escribe el motivo de la cancelación por parte del tutor..." : "Detalles de la inasistencia (Ej: Se esperaron 15 minutos)..."}
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full text-sm p-3 border border-red-200/60 rounded-lg bg-surface-container-lowest focus:outline-none focus:border-red-400 text-primary resize-none"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => { setShowCancelForm(false); setMotivo(''); }}
                    className="px-4 py-2 bg-gray-200 text-elegant-gray rounded-md text-xs font-bold uppercase tracking-wider hover:bg-gray-300 transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleConfirmCancel}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
                  >
                    Confirmar Registro
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* BOTONERA DINÁMICA CON RESTRICCIÓN HORARIA */}
          {!showCancelForm && (
            <div className="flex flex-wrap gap-3 pt-4 justify-between border-t border-outline-variant/10 items-center">

              {/* Botón de Cancelación / Inasistencia */}
              <div>
                  <button
                    onClick={() => {
                      // Si ya es la hora y está en progreso, forzamos por defecto inasistencia
                      if (estado === 'en_progreso') {
                        setTipoCancelacion('no_asistio');
                      } else {
                        setTipoCancelacion('cancelada');
                      }
                      setShowCancelForm(true);
                    }}
                    disabled={isLoading}
                    className="px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors uppercase tracking-wider"
                  >
                    {estado === 'en_progreso' ? 'Reportar Inasistencia' : 'Cancelar / Resolver'}
                  </button>

                  {/* 🆕 Botón para Asignar Actividad */}
                  <button
                    onClick={() => onAsignarActividad(session)}
                    className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors uppercase tracking-wider flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">assignment_add</span>
                    Asignar Actividad
                  </button>
              </div>

              {/* Botones de flujo feliz (Iniciar / Completar) */}
              <div className="flex gap-2 items-center">
                {estado === 'programada' && (
                  <>
                    {!puedeIniciar && (
                      <span className="text-[11px] text-elegant-gray bg-gray-100 px-3 py-1.5 rounded-md font-medium">
                        ⏱️ Disponible 10 min antes de la hora
                      </span>
                    )}
                    <button
                      onClick={() => handleDirectStatusChange('en_progreso')}
                      disabled={isLoading || !puedeIniciar} // <-- BLOQUEADO SI NO ES LA HORA
                      className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-sm ${puedeIniciar
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      🚀 Iniciar Tutoría
                    </button>
                  </>
                )}

                {estado === 'en_progreso' && (
                  <button
                    onClick={() => handleDirectStatusChange('completada')}
                    disabled={isLoading}
                    className="px-5 py-2 bg-academic-gold text-primary font-extrabold text-xs uppercase tracking-wider rounded-md hover:bg-academic-gold/90 transition-all shadow-sm"
                  >
                    ✅ Completar Tutoría
                  </button>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SessionCard;