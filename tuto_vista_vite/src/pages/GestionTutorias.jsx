import React, { useState, useEffect, useCallback, useMemo } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

// Importación de subcomponentes modulares
import SolicitudesTab from '../features/gestion-tutorias/tabs/SolicitudesTab';
import AceptadasTab from '../features/gestion-tutorias/tabs/AceptadasTab';
import SesionesTab from '../features/gestion-tutorias/tabs/SesionesTab';
import HistorialTab from '../features/gestion-tutorias/tabs/HistorialTab';
import AsignarActividadModal from '../features/gestion-tutorias/modals/AsignarActividadModal';

const GestionTutorias = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [aceptadas, setAceptadas] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [activeTab, setActiveTab] = useState('solicitudes'); // 'solicitudes' | 'aceptadas' | 'sesiones' | 'historial'

  // Estados para los filtros avanzados del Historial
  const [filterDate, setFilterDate] = useState('');
  const [filterMateria, setFilterMateria] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  // Estado para el modal de asignación de actividad
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

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
      setSolicitudes(solicitudesData.filter(s => s.estado === 'pendiente'));

      // 2. Filtrar solicitudes aceptadas (esperando por el pago)
      setAceptadas(solicitudesData.filter(s => s.estado === 'aceptada'));

      // 3. Filtrar tutorías activas (programadas o en progreso)
      setSesiones(sesionesData.filter(s => s.estado === 'programada' || s.estado === 'en_progreso'));

      // 4. Filtrar historial
      setHistorial(sesionesData.filter(s =>
        s.estado === 'completada' || s.estado === 'cancelada' || s.estado === 'no_asistio'
      ));
    } catch (err) {
      console.error('Error fetching tutoring data:', err);
      setError('No se pudieron cargar los datos de las tutorías.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAccept = async (id) => {
    try {
      setProcessingId(id);
      await api.patch(`/solicitudes/${id}/estado?estado=aceptada`);
      alert("¡Solicitud aceptada! En espera de pago por parte del alumno.");
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al aceptar la solicitud.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleRejectOrCancel = async (id, nuevoEstado = 'rechazada') => {
    const msg = nuevoEstado === 'rechazada' ? "¿Rechazar solicitud?" : "¿Cancelar solicitud aceptada?";
    if (!window.confirm(msg)) return;

    try {
      setProcessingId(id);
      await api.patch(`/solicitudes/${id}/estado?estado=${nuevoEstado}`);
      fetchData();
    } catch (err) {
      alert(err.message || 'Error al procesar la solicitud.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateStatus = async (id, estadoNuevo, motivoCancelacion = null) => {
    try {
      setProcessingId(id);
      await api.patch(`/sesiones/${id}/estado`, { estado: estadoNuevo, motivoCancelacion });
      fetchData();
      alert("Estado actualizado correctamente.");
    } catch (err) {
      alert(err.message || 'Error al actualizar el estado.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleUpdateLink = async (id, nuevoEnlace) => {
    try {
      await api.patch(`/sesiones/${id}/enlace`, { enlaceReunion: nuevoEnlace });
      setSesiones(prev => prev.map(s => s.id === id ? { ...s, enlaceReunion: nuevoEnlace } : s));
      alert("¡Enlace actualizado!");
    } catch (err) {
      alert(err.message || 'Error al actualizar el enlace.');
    }
  };

  // --- Lógica de Actividades ---
  const handleOpenAsignarActividad = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleActividadAsignada = () => {
    // Podríamos recargar datos si la UI muestra indicadores de actividad
    fetchData();
  };

  const formatFecha = (fechaIso) => {
    const d = new Date(fechaIso);
    return `${d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })} a las ${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
  };

  const listaMaterias = useMemo(() => [...new Set(historial.map(s => s.materiaNombre).filter(Boolean))], [historial]);

  const historialFiltradoYOrdenado = useMemo(() => {
    return historial
      .filter(sesion => {
        const cumpleMateria = filterMateria === '' || sesion.materiaNombre === filterMateria;
        const fechaSesionStr = new Date(sesion.programadaPara).toISOString().split('T')[0];
        const cumpleFecha = !filterDate || fechaSesionStr === filterDate;
        return cumpleMateria && cumpleFecha;
      })
      .sort((a, b) => new Date(b.programadaPara) - new Date(a.programadaPara));
  }, [historial, filterMateria, filterDate]);

  return (
    <MainLayout>
      <main className="flex-1 p-4 md:p-8 lg:p-12 min-h-screen">
        <header className="mb-12 max-w-4xl">
          <span className="text-xs font-bold text-academic-gold uppercase tracking-[0.2em] mb-4 block">Panel de Control</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary tracking-tight font-display mb-4">Gestionar Tutorías</h1>
          <p className="text-base text-gray-500 leading-relaxed border-l-4 border-academic-gold/50 pl-4">
            Administra tus encuentros académicos y materiales de apoyo aquí.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-outline-variant/10 mb-8 max-w-4xl overflow-x-auto whitespace-nowrap">
          {[
            { id: 'solicitudes', label: `Solicitudes (${solicitudes.length})` },
            { id: 'aceptadas', label: `Aceptadas (${aceptadas.length})` },
            { id: 'sesiones', label: `Agendadas (${sesiones.length})` },
            { id: 'historial', label: `Historial (${historial.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-6 font-bold text-sm border-b-2 transition-all ${activeTab === tab.id ? 'border-academic-gold text-academic-gold' : 'border-transparent text-elegant-gray hover:text-primary'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <section className="max-w-4xl">
          {loading && <div className="flex justify-center py-20 animate-pulse text-primary font-bold">Cargando datos...</div>}
          {error && <div className="bg-red-50 p-6 rounded-xl text-red-700 font-bold border border-red-100">{error}</div>}

          {!loading && !error && (
            <>
              {activeTab === 'solicitudes' && (
                <SolicitudesTab 
                  solicitudes={solicitudes} 
                  onAccept={handleAccept} 
                  onReject={(id) => handleRejectOrCancel(id, 'rechazada')} 
                  processingId={processingId} 
                />
              )}
              {activeTab === 'aceptadas' && (
                <AceptadasTab 
                  aceptadas={aceptadas} 
                  onCancelar={(id) => handleRejectOrCancel(id, 'cancelada')} 
                  processingId={processingId} 
                />
              )}
              {activeTab === 'sesiones' && (
                <SesionesTab 
                  sesiones={sesiones} 
                  onUpdateStatus={handleUpdateStatus} 
                  onUpdateLink={handleUpdateLink}
                  onAsignarActividad={handleOpenAsignarActividad}
                  processingId={processingId} 
                />
              )}
              {activeTab === 'historial' && (
                <HistorialTab 
                  sessions={historialFiltradoYOrdenado}
                  filterMateria={filterMateria}
                  setFilterMateria={setFilterMateria}
                  filterDate={filterDate}
                  setFilterDate={setFilterDate}
                  listaMaterias={listaMaterias}
                  formatFecha={formatFecha}
                />
              )}
            </>
          )}
        </section>

        {/* Modal de Asignación */}
        <AsignarActividadModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          sesion={selectedSession}
          onAsignada={handleActividadAsignada}
        />
      </main>
    </MainLayout>
  );
};

export default GestionTutorias;