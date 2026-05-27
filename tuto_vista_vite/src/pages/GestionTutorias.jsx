import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RequestCard from '../features/tutors/RequestCard/RequestCard';
import SessionCard from '../features/tutors/SessionCard/SessionCard';

const GestionTutorias = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [aceptadas, setAceptadas] = useState([]); // 👈 🆕 Estado para guardar las solicitudes aceptadas (esperando pago)
  const [sesiones, setSesiones] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [activeTab, setActiveTab] = useState('solicitudes'); // 'solicitudes' | 'aceptadas' | 'sesiones' | 'historial'

  // Estados para los filtros avanzados del Historial
  const [filterDate, setFilterDate] = useState('');
  const [filterMateria, setFilterMateria] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user || !user.id) return;
    try {
      setLoading(true);
      setError(null);

      const [solicitudesData, sesionesData] = await Promise.all([
        api.get(`/solicitudes/tutor/${user.id}`),
        api.get(`/sesiones/tutor/${user.id}`).catch(() => [])
      ]);

      // 1. Filtrar solicitudes pendientes
      const pendientes = solicitudesData.filter(s => s.estado === 'pendiente');
      setSolicitudes(pendientes);

      // 2. 🆕 Filtrar solicitudes aceptadas (esperando por el pago del alumno)
      const aprobadas = solicitudesData.filter(s => s.estado === 'aceptada');
      setAceptadas(aprobadas);

      // 3. Filtrar tutorías activas (programadas o en progreso)
      const agendadas = sesionesData.filter(s => s.estado === 'programada' || s.estado === 'en_progreso');
      setSesiones(agendadas);

      // 4. Filtrar historial (completadas, canceladas o inasistencias)
      const terminadas = sesionesData.filter(s =>
        s.estado === 'completada' || s.estado === 'cancelada' || s.estado === 'no_asistio'
      );
      setHistorial(terminadas);
    } catch (err) {
      console.error('Error fetching tutoring data:', err);
      setError('No se pudieron cargar los datos de las tutorías. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Extraer la lista única de materias del historial para alimentar el selector (<select>)
  const listaMaterias = useMemo(() => {
    const materias = historial.map(s => s.materiaNombre).filter(Boolean);
    return [...new Set(materias)];
  }, [historial]);

  // Filtrar y ordenar el historial por fecha de forma descendente
  const historialFiltradoYOrdenado = useMemo(() => {
    return historial
      .filter(sesion => {
        const cumpleMateria = filterMateria === '' || sesion.materiaNombre === filterMateria;
        let cumpleFecha = true;
        if (filterDate) {
          const fechaSesionStr = new Date(sesion.programadaPara).toISOString().split('T')[0];
          cumpleFecha = fechaSesionStr === filterDate;
        }
        return cumpleMateria && cumpleFecha;
      })
      .sort((a, b) => new Date(b.programadaPara) - new Date(a.programadaPara));
  }, [historial, filterMateria, filterDate]);

  const handleAccept = async (id) => {
    try {
      setProcessingId(id);
      await api.patch(`/solicitudes/${id}/estado?estado=aceptada`);

      alert("¡Solicitud de tutoría aceptada! Ha sido movida a la sección de Aceptadas, en espera de pago.");
      fetchData(); // Recarga limpia para distribuir estados
    } catch (err) {
      console.error('Error accepting solicitud:', err);
      alert(err.message || 'Error al aceptar la solicitud.');
      fetchData();
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas rechazar esta solicitud?")) return;

    try {
      setProcessingId(id);
      await api.patch(`/solicitudes/${id}/estado?estado=rechazada`);
      fetchData();
    } catch (err) {
      console.error('Error rejecting solicitud:', err);
      alert(err.message || 'Error al rechazar la solicitud.');
    } finally {
      setProcessingId(null);
    }
  };

  // 🆕 Función para cancelar una solicitud que ya habías aceptado pero aún no pagan
  const handleCancelarAceptada = async (id) => {
    if (!window.confirm("¿Deseas cancelar esta solicitud aceptada? El estudiante ya no podrá pagarla.")) return;

    try {
      setProcessingId(id);
      await api.patch(`/solicitudes/${id}/estado?estado=cancelada`);
      alert("Solicitud cancelada correctamente.");
      fetchData();
    } catch (err) {
      console.error('Error al cancelar solicitud aceptada:', err);
      alert(err.message || 'Error al cancelar la solicitud.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateStatus = async (id, estadoNuevo, motivoCancelacion = null) => {
    try {
      setProcessingId(id);
      await api.patch(`/sesiones/${id}/estado`, {
        estado: estadoNuevo,
        motivoCancelacion: motivoCancelacion
      });

      await fetchData();

      const mensajes = {
        en_progreso: "¡La tutoría ha iniciado! Está ahora en progreso.",
        completada: "¡Excelente! Tutoría marcada como completada.",
        cancelada: "La tutoría ha sido cancelada.",
        no_asistio: "Se registró la inasistencia del estudiante."
      };

      alert(mensajes[estadoNuevo] || "Estado de la tutoría actualizado.");
    } catch (err) {
      console.error('Error al actualizar el estado de la sesión:', err);
      alert(err.message || 'Error al procesar el cambio de estado.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateLink = async (id, nuevoEnlace) => {
    try {
      await api.patch(`/sesiones/${id}/enlace`, {
        enlaceReunion: nuevoEnlace
      });

      setSesiones(prev => prev.map(s => s.id === id ? { ...s, enlaceReunion: nuevoEnlace } : s));
      alert("¡Enlace de reunión actualizado con éxito!");
    } catch (err) {
      console.error('Error updating session link:', err);
      alert(err.message || 'Error al actualizar el enlace de la reunión.');
      throw err;
    }
  };

  const formatFechaHistorial = (fechaIso) => {
    const d = new Date(fechaIso);
    const dateStr = d.toLocaleDateString('es-ES', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('es-ES', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
    return `${dateStr} a las ${timeStr}`;
  };

  return (
    <MainLayout>
      <main className="flex-1 p-4 md:p-8 lg:p-12 min-h-screen">
        <header className="mb-12 max-w-4xl">
          <span className="text-xs font-bold text-academic-gold uppercase tracking-[0.2em] mb-4 block">Panel de Control</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight font-display mb-4">
            Gestionar Tutorías
          </h1>
          <p className="text-base md:text-lg text-gray-500 leading-relaxed border-l-4 border-academic-gold/50 pl-4">
            Administra tus encuentros académicos. Responde a solicitudes entrantes, gestiona tus tutorías agendadas y revisa tu historial de clases dictadas.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-outline-variant/10 mb-8 max-w-4xl overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`min-h-[2.75rem] py-3 px-4 md:py-4 md:px-6 font-bold text-sm border-b-2 transition-all ${activeTab === 'solicitudes'
              ? 'border-academic-gold text-academic-gold font-extrabold'
              : 'border-transparent text-elegant-gray hover:text-primary'
              }`}
          >
            Solicitudes Pendientes ({solicitudes.length})
          </button>

          {/* 🆕 NUEVO TAB ADICIONAL */}
          <button
            onClick={() => setActiveTab('aceptadas')}
            className={`min-h-[2.75rem] py-3 px-4 md:py-4 md:px-6 font-bold text-sm border-b-2 transition-all ${activeTab === 'aceptadas'
              ? 'border-academic-gold text-academic-gold font-extrabold'
              : 'border-transparent text-elegant-gray hover:text-primary'
              }`}
          >
            Aceptadas (Por Pagar) ({aceptadas.length})
          </button>

          <button
            onClick={() => setActiveTab('sesiones')}
            className={`min-h-[2.75rem] py-3 px-4 md:py-4 md:px-6 font-bold text-sm border-b-2 transition-all ${activeTab === 'sesiones'
              ? 'border-academic-gold text-academic-gold font-extrabold'
              : 'border-transparent text-elegant-gray hover:text-primary'
              }`}
          >
            Tutorías Agendadas ({sesiones.length})
          </button>
          <button
            onClick={() => setActiveTab('historial')}
            className={`min-h-[2.75rem] py-3 px-4 md:py-4 md:px-6 font-bold text-sm border-b-2 transition-all ${activeTab === 'historial'
              ? 'border-academic-gold text-academic-gold font-extrabold'
              : 'border-transparent text-elegant-gray hover:text-primary'
              }`}
          >
            Historial de Clases ({historial.length})
          </button>
        </div>

        <section className="max-w-4xl">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 p-6 rounded-xl flex items-start gap-4">
              <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
              <div>
                <h4 className="font-bold text-red-800">Error</h4>
                <p className="text-red-700">{error}</p>
                <button onClick={fetchData} className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm font-bold hover:bg-red-200">
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: SOLICITUDES */}
          {!loading && !error && activeTab === 'solicitudes' && (
            <>
              {solicitudes.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-16 text-center shadow-sm">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">inbox</span>
                  <h3 className="text-xl font-bold text-primary mb-2 font-display">No hay solicitudes pendientes</h3>
                  <p className="text-gray-500 text-sm">Cuando un estudiante te envíe una propuesta de tutoría, la verás aquí.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {solicitudes.map(solicitud => (
                    <RequestCard
                      key={solicitud.id}
                      solicitud={solicitud}
                      onAccept={handleAccept}
                      onReject={handleReject}
                      isLoading={processingId === solicitud.id}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* 🆕 TAB 新: SOLICITUDES ACEPTADAS EN ESPERA DE PAGO */}
          {!loading && !error && activeTab === 'aceptadas' && (
            <>
              {aceptadas.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-16 text-center shadow-sm">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">hourglass_empty</span>
                  <h3 className="text-xl font-bold text-primary mb-2 font-display">No hay solicitudes por pagar</h3>
                  <p className="text-gray-500 text-sm">Aquí verás las tutorías que aceptaste y cuyos alumnos están por pagar.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {aceptadas.map(solicitud => (
                    <RequestCard
                      key={solicitud.id}
                      solicitud={solicitud}
                      onAccept={null} // Ocultamos el botón aceptar pasándole null
                      onReject={handleCancelarAceptada} // Mapeamos el botón de rechazar para "Cancelar Aceptada"
                      isLoading={processingId === solicitud.id}
                      // Pasamos una propiedad para que la tarjeta sepa cambiar el texto del botón si tu RequestCard lo soporta
                      isAcceptedView={true}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* TAB 2: TUTORÍAS AGENDADAS */}
          {!loading && !error && activeTab === 'sesiones' && (
            <>
              {sesiones.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-16 text-center shadow-sm">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">calendar_today</span>
                  <h3 className="text-xl font-bold text-primary mb-2 font-display">No tienes tutorías agendadas</h3>
                  <p className="text-gray-500 text-sm">Tus próximas sesiones de tutoría confirmadas se listarán en esta pestaña.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {sesiones.map(session => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      onUpdateStatus={handleUpdateStatus}
                      onUpdateLink={handleUpdateLink}
                      isLoading={processingId === session.id}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* TAB 3: HISTORIAL DE TUTORÍAS CON FILTROS */}
          {!loading && !error && activeTab === 'historial' && (
            <div className="space-y-6">
              {/* Contenedor de Filtros Avanzados */}
              <div className="bg-surface-container-low p-4 rounded-xl flex flex-col md:flex-row gap-4 items-end shadow-sm border border-outline-variant/5">
                <div className="w-full md:w-1/3">
                  <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1.5">Filtrar por Materia</label>
                  <select
                    value={filterMateria}
                    onChange={(e) => setFilterMateria(e.target.value)}
                    className="w-full text-sm p-2.5 border border-outline-variant/30 rounded-lg bg-surface-container-lowest text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="">Todas las materias</option>
                    {listaMaterias.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-1/3">
                  <label className="text-[10px] font-bold text-elegant-gray uppercase tracking-widest block mb-1.5">Filtrar por Fecha</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full text-sm p-2 border border-outline-variant/30 rounded-lg bg-surface-container-lowest text-primary focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="w-full md:w-auto flex gap-2 shrink-0">
                  <button
                    onClick={() => { setFilterMateria(''); setFilterDate(''); }}
                    className="w-full md:w-auto px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-elegant-gray rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              </div>

              {/* Renderizado de la lista del historial */}
              {historialFiltradoYOrdenado.length === 0 ? (
                <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 md:p-12 text-center shadow-sm">
                  <span className="material-symbols-outlined text-gray-300 text-5xl mb-3">manage_search</span>
                  <h3 className="text-lg font-bold text-primary mb-1">No se encontraron clases</h3>
                  <p className="text-gray-500 text-sm">No posees registros finalizados o que coincidan con los filtros seleccionados.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historialFiltradoYOrdenado.map(sesion => (
                    <div
                      key={sesion.id}
                      className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-outline-variant/30 transition-all"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-primary">{sesion.estudianteNombre}</span>
                          <span className="text-xs text-elegant-gray">•</span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-surface-container-low text-primary rounded">
                            {sesion.materiaNombre}
                          </span>
                        </div>

                        <p className="text-xs text-elegant-gray">
                          🗓️ {formatFechaHistorial(sesion.programadaPara)} ({sesion.duracionMin} min)
                        </p>

                        {sesion.motivoCancelacion && (
                          <p className="text-xs text-red-700 bg-red-50/60 px-3 py-1.5 rounded border border-red-100/40 italic mt-1">
                            <strong>Detalle del cierre:</strong> "{sesion.motivoCancelacion}"
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 self-start md:self-center">
                        <span className={`text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full ${sesion.estado === 'completada' ? 'bg-green-50 text-green-700 border border-green-200' :
                          sesion.estado === 'cancelada' ? 'bg-red-50 text-red-700 border border-red-200' :
                            'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                          {sesion.estado === 'completada' ? '✅ Completada' :
                            sesion.estado === 'cancelada' ? '❌ Cancelada' :
                              '⚠️ No Asistió'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </MainLayout>
  );
};

export default GestionTutorias;