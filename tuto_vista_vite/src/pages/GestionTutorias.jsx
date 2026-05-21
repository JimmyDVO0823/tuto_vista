import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import RequestCard from '../components/features/tutors/RequestCard/RequestCard';

const GestionTutorias = () => {
  const { user } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchSolicitudes = useCallback(async () => {
    if (!user || !user.id) return;
    try {
      setLoading(true);
      setError(null);
      // Backend returns all solicitudes for this tutor
      const data = await api.get(`/solicitudes/tutor/${user.id}`);
      // Filter only the pending ones
      const pendientes = data.filter(s => s.estado === 'pendiente');
      setSolicitudes(pendientes);
    } catch (err) {
      console.error('Error fetching solicitudes:', err);
      setError('No se pudieron cargar las solicitudes. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchSolicitudes();
  }, [fetchSolicitudes]);

  const handleAccept = async (id) => {
    try {
      setProcessingId(id);
      // POST /sesiones/desde-solicitud/{id} creates the session and updates the request to 'aceptada'
      await api.post(`/sesiones/desde-solicitud/${id}`);
      // Remove from list
      setSolicitudes(prev => prev.filter(s => s.id !== id));
      // You could also add a success toast here
      alert("¡Tutoría aceptada y agendada exitosamente!");
    } catch (err) {
      console.error('Error accepting solicitud:', err);
      alert(err.message || 'Error al aceptar la solicitud. Es posible que haya un cruce de horarios.');
      // Refresh list to sync state in case it was auto-rejected or already accepted
      fetchSolicitudes();
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas rechazar esta solicitud?")) return;
    
    try {
      setProcessingId(id);
      await api.patch(`/solicitudes/${id}/estado?estado=rechazada`);
      // Remove from list
      setSolicitudes(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error rejecting solicitud:', err);
      alert(err.message || 'Error al rechazar la solicitud.');
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
            Revisa y responde a las solicitudes de tutoría de los estudiantes. Las solicitudes aceptadas se programarán automáticamente en tu agenda.
          </p>
        </header>

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
                <button onClick={fetchSolicitudes} className="mt-3 px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm font-bold hover:bg-red-200">
                  Reintentar
                </button>
              </div>
            </div>
          )}

          {!loading && !error && solicitudes.length === 0 && (
             <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-16 text-center shadow-sm">
               <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">inbox</span>
               <h3 className="text-xl font-bold text-primary mb-2">No hay solicitudes pendientes</h3>
               <p className="text-gray-500">Cuando un estudiante solicite una tutoría contigo, aparecerá aquí.</p>
             </div>
          )}

          {!loading && !error && solicitudes.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10">
                <h3 className="font-bold text-primary">Solicitudes Pendientes</h3>
                <span className="bg-academic-gold/10 text-academic-gold font-bold py-1 px-3 rounded-full text-sm">
                  {solicitudes.length}
                </span>
              </div>
              
              <div className="grid gap-6">
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
            </div>
          )}
        </section>
      </main>
    </MainLayout>
  );
};

export default GestionTutorias;
