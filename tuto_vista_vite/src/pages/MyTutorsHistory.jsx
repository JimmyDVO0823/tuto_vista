import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const MyTutorsHistory = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]); // 👈 🆕 Estado para las solicitudes del alumno
  const [activeTab, setActiveTab] = useState('clases'); // 'clases' | 'solicitudes'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cancelingId, setCancelingId] = useState(null); // Para loading del botón cancelar

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      setError(null);

      // Traemos las sesiones y las solicitudes en paralelo
      const [sessionsData, solicitudesData] = await Promise.all([
        api.get(`/sesiones/estudiante/${user.id}`).catch(() => []),
        api.get(`/solicitudes/estudiante/${user.id}`).catch(() => []) // 👈 Asegúrate de tener este endpoint en el backend
      ]);

      // Filtrar y ordenar sesiones por fecha descendente
      const sortedSessions = (sessionsData || []).sort((a, b) => new Date(b.programadaPara) - new Date(a.programadaPara));
      setSessions(sortedSessions);

      // Filtrar solicitudes activas (solo pendientes o aceptadas esperando pago)
      const solicitudesActivas = (solicitudesData || []).filter(
        s => s.estado === 'pendiente' || s.estado === 'aceptada'
      );
      setSolicitudes(solicitudesActivas);

    } catch (err) {
      console.error('Error fetching student data:', err);
      setError('No se pudo cargar el historial de tutorías ni solicitudes.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🆕 Función para que el estudiante cancele su postulación
  const handleCancelarSolicitud = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta solicitud de tutoría?")) return;

    try {
      setCancelingId(id);
      // Enviamos el patch con el estado 'cancelada'
      await api.patch(`/solicitudes/${id}/estado?estado=cancelada`);
      alert("Solicitud cancelada exitosamente.");
      fetchData(); // Refrescar listas
    } catch (err) {
      console.error('Error canceling solicitud:', err);
      alert(err.message || 'Error al cancelar la solicitud.');
    } finally {
      setCancelingId(null);
    }
  };

  // Formatter for date and time
  const formatFechaHistorial = (fechaIso) => {
    if (!fechaIso) return '';
    const d = new Date(fechaIso);
    const dateStr = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} a las ${timeStr}`;
  };

  // Filtrar sesiones según la barra de búsqueda
  const filteredSessions = sessions.filter(session =>
    session.materiaNombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.tutorNombre?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status mapping to color/text style
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'completada':
        return { text: 'Completada', className: 'bg-green-50 text-green-700 border border-green-200' };
      case 'programada':
        return { text: 'Programada', className: 'bg-blue-50 text-blue-700 border border-blue-200' };
      case 'en_progreso':
        return { text: 'En Progreso', className: 'bg-amber-50 text-amber-700 border border-amber-200' };
      case 'cancelada':
        return { text: 'Cancelada', className: 'bg-red-50 text-red-700 border border-red-200' };
      case 'no_asistio':
        return { text: 'No Asistió', className: 'bg-gray-100 text-gray-600 border border-gray-200' };
      // Estados de Solicitud por si acaso
      case 'pendiente':
        return { text: '⏳ Pendiente de Tutor', className: 'bg-amber-50 text-amber-700 border border-amber-200' };
      case 'aceptada':
        return { text: '💳 Aceptada (Por Pagar)', className: 'bg-purple-50 text-purple-700 border border-purple-200' };
      default:
        return { text: status || 'Desconocido', className: 'bg-gray-50 text-gray-500 border border-gray-200' };
    }
  };

  return (
    <MainLayout>
      <main className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-academic-gold uppercase tracking-widest mb-2 block">Académico</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight font-display">Mi Historial Académico</h1>
            <p className="text-gray-500 mt-2 text-sm">Gestiona tus solicitudes enviadas y consulta el historial de tus encuentros.</p>
          </div>

          {activeTab === 'clases' && (
            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest rounded-full border border-outline-variant/30 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm text-primary"
                placeholder="Buscar por materia o tutor..."
              />
            </div>
          )}
        </header>

        {/* 🆕 Sistema de Tabs para alternar vistas */}
        <div className="flex border-b border-outline-variant/10 mb-8 overflow-x-auto whitespace-nowrap">
          <button
            onClick={() => setActiveTab('clases')}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${activeTab === 'clases'
              ? 'border-academic-gold text-academic-gold font-extrabold'
              : 'border-transparent text-elegant-gray hover:text-primary'
              }`}
          >
            Mis Clases ({sessions.length})
          </button>
          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`py-3 px-6 font-bold text-sm border-b-2 transition-all ${activeTab === 'solicitudes'
              ? 'border-academic-gold text-academic-gold font-extrabold'
              : 'border-transparent text-elegant-gray hover:text-primary'
              }`}
          >
            Mis Solicitudes ({solicitudes.length})
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 p-6 rounded-xl text-center max-w-md mx-auto">
            <span className="material-symbols-outlined text-red-500 text-4xl mb-2">error</span>
            <h4 className="font-bold text-red-800">Error</h4>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* TAB 1: LISTA DE CLASES (TU TABLA ORIGINAL) */}
        {!loading && !error && activeTab === 'clases' && (
          <section className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-x-auto">
            {filteredSessions.length === 0 ? (
              <div className="p-16 text-center">
                <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">calendar_today</span>
                <h3 className="text-xl font-bold text-primary mb-2 font-display">No se encontraron tutorías</h3>
                <p className="text-gray-500 text-sm">No posees registros de tutoría que coincidan con la búsqueda.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant/10">
                  <tr>
                    {['Materia', 'Tutor', 'Fecha y Hora', 'Duración', 'Estado', 'Enlace / Detalles'].map(h => (
                      <th key={h} className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-elegant-gray">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {filteredSessions.map((row) => {
                    const badge = getStatusBadge(row.estado);
                    return (
                      <tr key={row.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                        <td className="px-8 py-6">
                          <span className="font-bold text-primary block text-sm">{row.materiaNombre}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-surface-container-low overflow-hidden flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-gray-500 text-lg">person</span>
                            </div>
                            <span className="text-sm font-semibold text-primary">{row.tutorNombre || 'Tutor Académico'}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-primary">
                          {formatFechaHistorial(row.programadaPara)}
                        </td>
                        <td className="px-8 py-6 text-sm text-elegant-gray">
                          {row.duracionMin} min
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${badge.className}`}>
                            {badge.text}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm">
                          {row.estado?.toLowerCase() === 'programada' || row.estado?.toLowerCase() === 'en_progreso' ? (
                            row.enlaceReunion ? (
                              <a
                                href={row.enlaceReunion}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-primary bg-academic-gold/20 hover:bg-academic-gold/40 px-3 py-1.5 rounded transition-colors inline-block"
                              >
                                Ir a la reunión
                              </a>
                            ) : (
                              <span className="text-xs text-elegant-gray italic">Enlace pendiente</span>
                            )
                          ) : row.motivoCancelacion ? (
                            <span className="text-xs text-red-700 bg-red-50 px-2.5 py-1 rounded border border-red-100 italic block max-w-xs truncate" title={row.motivoCancelacion}>
                              Cancelada: "{row.motivoCancelacion}"
                            </span>
                          ) : (
                            <span className="text-xs text-elegant-gray">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* 🆕 TAB 2: RENDEREAR SOLICITUDES ENVIADAS POR EL ESTUDIANTE */}
        {!loading && !error && activeTab === 'solicitudes' && (
          <section className="space-y-4 max-w-4xl">
            {solicitudes.length === 0 ? (
              <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-12 text-center shadow-sm">
                <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">send_and_archive</span>
                <h3 className="text-xl font-bold text-primary mb-2 font-display">No tienes solicitudes activas</h3>
                <p className="text-gray-500 text-sm">Aquí se listarán las propuestas que envíes a los tutores y estén esperando gestión o pago.</p>
              </div>
            ) : (
              solicitudes.map((sol) => {
                const badge = getStatusBadge(sol.estado);
                return (
                  <div key={sol.id} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-outline-variant/30 transition-all">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-primary">Tutor: {sol.tutorNombre || 'Por Asignar'}</span>
                        <span className="text-xs text-elegant-gray">•</span>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-surface-container-low text-primary rounded">
                          {sol.materiaNombre}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-elegant-gray">
                        <p>📅 <strong>Fecha prop.:</strong> {new Date(`${sol.fechaPreferida}T00:00:00`).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        <p>⏰ <strong>Hora:</strong> {sol.horaPreferida.substring(0, 5)} ({sol.duracionMin} min)</p>
                      </div>

                      {sol.mensaje && (
                        <p className="text-xs text-primary/70 bg-surface-container-low px-3 py-2 rounded italic mt-1">
                          "{sol.mensaje}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                      {/* Badge indicador del estado */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${badge.className}`}>
                        {badge.text}
                      </span>

                      {/* Botón estratégico para cancelar la solicitud */}
                      <button
                        onClick={() => handleCancelarSolicitud(sol.id)}
                        disabled={cancelingId === sol.id}
                        className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded-md text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        {cancelingId === sol.id ? 'Cancelando...' : 'Cancelar'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        )}

        <footer className="mt-24 pt-10 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary">© 2024 THE ACADEMIC EDITORIAL</p>
          <div className="flex gap-6">
            {['Privacy', 'Legal', 'Contact'].map(l => (
              <a key={l} href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors text-primary">{l}</a>
            ))}
          </div>
        </footer>
      </main>
    </MainLayout>
  );
};

export default MyTutorsHistory;