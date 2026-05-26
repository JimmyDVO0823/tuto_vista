import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const MyTutorsHistory = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await api.get(`/sesiones/estudiante/${user.id}`);
        // Sort sessions by date descending
        const sorted = (data || []).sort((a, b) => new Date(b.programadaPara) - new Date(a.programadaPara));
        setSessions(sorted);
      } catch (err) {
        console.error('Error fetching student sessions:', err);
        setError('No se pudo cargar el historial de tutorías.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [user]);

  // Formatter for date and time
  const formatFechaHistorial = (fechaIso) => {
    if (!fechaIso) return '';
    const d = new Date(fechaIso);
    const dateStr = d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr} a las ${timeStr}`;
  };

  // Filter sessions based on search query
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
      default:
        return { text: status || 'Desconocido', className: 'bg-gray-50 text-gray-500 border border-gray-200' };
    }
  };

  return (
    <MainLayout>
      <main className="p-4 md:p-10 max-w-7xl mx-auto min-h-screen">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-academic-gold uppercase tracking-widest mb-2 block">Académico</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight font-display">Mi Historial de Tutorías</h1>
            <p className="text-gray-500 mt-2 text-sm">Consulta todos tus encuentros de tutoría programados, activos y completados.</p>
          </div>
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
        </header>

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

        {!loading && !error && (
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
