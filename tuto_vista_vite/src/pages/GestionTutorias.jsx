import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import RequestCard from '../components/features/tutors/RequestCard/RequestCard';
import SessionCard from '../components/features/tutors/SessionCard/SessionCard';

const GestionTutorias = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [sesiones, setSesiones] = useState([]);
  const [activeTab, setActiveTab] = useState('solicitudes'); // 'solicitudes' | 'sesiones'

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
      
      const pendientes = solicitudesData.filter(s => s.estado === 'pendiente');
      setSolicitudes(pendientes);

      const agendadas = sesionesData.filter(s => s.estado === 'programada' || s.estado === 'en_progreso');
      setSesiones(agendadas);
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

  const handleAccept = async (id) => {
    try {
      setProcessingId(id);
      await api.post(`/sesiones/desde-solicitud/${id}`);
      setSolicitudes(prev => prev.filter(s => s.id !== id));
      alert("¡Tutoría aceptada y agendada exitosamente!");
      // Reload both lists so the session is added to the sessions list
      fetchData();
    } catch (err) {
      console.error('Error accepting solicitud:', err);
      alert(err.message || 'Error al aceptar la solicitud. Es posible que haya un cruce de horarios.');
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
      setSolicitudes(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error rejecting solicitud:', err);
      alert(err.message || 'Error al rechazar la solicitud.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancelSession = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta tutoría ya programada?")) return;
    
    try {
      setProcessingId(id);
      await api.patch(`/sesiones/${id}/estado?estado=cancelada`);
      setSesiones(prev => prev.filter(s => s.id !== id));
      alert("¡Tutoría cancelada exitosamente!");
    } catch (err) {
      console.error('Error canceling session:', err);
      alert(err.message || 'Error al cancelar la tutoría.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <MainLayout>
      <main className="flex-1 p-8 lg:p-12 min-h-screen">
        <header className="mb-12 max-w-4xl">
          <span className="text-xs font-bold text-academic-gold uppercase tracking-[0.2em] mb-4 block">Panel de Control</span>
          <h1 className="text-4xl font-extrabold text-primary tracking-tight font-display mb-4">
            Gestionar Tutorías
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed border-l-4 border-academic-gold/50 pl-4">
            Administra tus encuentros académicos. Responde a solicitudes entrantes y gestiona o cancela tus tutorías ya programadas.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex border-b border-outline-variant/10 mb-8 max-w-4xl">
          <button
            onClick={() => setActiveTab('solicitudes')}
            className={`min-h-[2.75rem] py-3 px-4 md:py-4 md:px-6 font-bold text-sm border-b-2 transition-all ${
              activeTab === 'solicitudes'
                ? 'border-academic-gold text-academic-gold font-extrabold'
                : 'border-transparent text-elegant-gray hover:text-primary'
            }`}
          >
            Solicitudes Pendientes ({solicitudes.length})
          </button>
          <button
            onClick={() => setActiveTab('sesiones')}
            className={`min-h-[2.75rem] py-3 px-4 md:py-4 md:px-6 font-bold text-sm border-b-2 transition-all ${
              activeTab === 'sesiones'
                ? 'border-academic-gold text-academic-gold font-extrabold'
                : 'border-transparent text-elegant-gray hover:text-primary'
            }`}
          >
            Tutorías Agendadas ({sesiones.length})
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
                      onCancel={handleCancelSession}
                      isLoading={processingId === session.id}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </MainLayout>
  );
};

export default GestionTutorias;
