import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import IncomeChart from "../features/dashboard/IncomeChart/IncomeChart";
import StatCard from "../components/ui/StatCard/StatCard"; // Importación del nuevo componente
import EditChart from "../features/dashboard/Perfil/EditChart";
import BadgeIcon from "../components/common/BadgeIcon";

const DashboardTutor = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    hoursThisMonth: 0,
    incomeLastMonth: 0,
  });
  const [tutorData, setTutorData] = useState(null);

  useEffect(() => {
    if (user?.id) {
      // Cargar sesiones próximas
      api
        .get(`/sesiones/tutor/${user.id}`)
        .then((data) => setSessions(data || []))
        .catch((err) => console.error("Error cargando sesiones:", err));

      // Cargar estadísticas
      api
        .get(`/tutores/${user.id}/stats`)
        .then((data) => setStats(data))
        .catch((err) => console.error("Error cargando estadísticas:", err));

      // Cargar data completa del tutor (incluye insignias)
      api
        .get(`/tutores/${user.id}`)
        .then((data) => setTutorData(data))
        .catch((err) => console.error("Error cargando data del tutor:", err));
    }
  }, [user]);

  // Formateador de moneda colombiana integrado
  const formattedIncome = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0 // Quita decimales innecesarios para pesos colombianos
  }).format(stats.incomeLastMonth || 0);

  const handleToggleAvailability = async () => {
    if (!tutorData) return;
    const nuevoEstado = !tutorData.esta_disponible;
    const mensajeAlerta = nuevoEstado 
      ? "¿Deseas volver a estar disponible para recibir nuevas solicitudes?" 
      : "⚠️ Al desactivar tu disponibilidad, recuerda que debes cumplir con las tutorías ya agendadas o cancelarlas debidamente para evitar reportes. ¿Deseas continuar?";
    
    if (window.confirm(mensajeAlerta)) {
      try {
        await api.patch(`/tutores/${user.id}/disponibilidad?estado=${nuevoEstado}`);
        setTutorData(prev => ({ ...prev, esta_disponible: nuevoEstado }));
      } catch (err) {
        console.error("Error al cambiar disponibilidad:", err);
        alert("No se pudo cambiar el estado de disponibilidad.");
      }
    }
  };

  return (
    <MainLayout>
      <main className="p-4 md:p-10">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-academic-gold mb-2">
              Panel del Instructor
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">
              Bienvenido, {user?.name || "Tutor"}.
            </h1>
          </div>
          <div className="bg-white p-4 rounded-xl flex items-center gap-6 shadow-sm border border-gray-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Estado
              </p>
              <p className="text-sm font-semibold text-primary">
                {tutorData?.esta_disponible ? "Disponible para clases" : "No disponible"}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer group">
              <input 
                type="checkbox"
                className="sr-only peer"
                checked={tutorData?.esta_disponible || false} 
                onChange={handleToggleAvailability}
              />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-academic-gold after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full shadow-inner" />
            </label>
          </div>
        </header>
        {/* Grid de Estadísticas Limpio empleando el componente genérico */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 md:mb-12">
          <StatCard
            label="Horas dictadas este mes"
            value={stats.hoursThisMonth?.toFixed(1) || "0.0"}
            icon="history_edu"
            color="border-primary"
          />

          <StatCard
            label="Calificación promedio"
            value={stats.averageRating?.toFixed(2) || "0.00"}
            icon="star"
            color="border-academic-gold"
            highlight={stats.averageRating >= 4.5 ? "TOP" : null}
          />

          <StatCard
            label="Ingresos el mes pasado"
            value={formattedIncome}
            icon="payments"
            gradient={true}
          />
        </div>

        <IncomeChart tutorId={user?.id} />

        {/* Session List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 mt-12">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary tracking-tight">
              Próximas Sesiones
            </h2>
            <div className="space-y-4">
              {sessions.filter(s => s.programadaPara && new Date(s.programadaPara) >= new Date()).length > 0 ? (
                sessions
                  .filter(s => s.programadaPara && new Date(s.programadaPara) >= new Date())
                  .map((s, i) => (
                    <div
                      key={s.id || i}
                      className="bg-white p-6 rounded-lg flex flex-col md:flex-row items-center justify-between group hover:translate-x-2 transition-transform duration-300 shadow-sm border border-gray-50 gap-4 md:gap-8"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-mini-gray overflow-hidden border-2 border-white flex items-center justify-center text-xl font-bold text-gray-500">
                          {s.estudianteNombre
                            ? s.estudianteNombre.charAt(0)
                            : "E"}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-primary">
                            {s.estudianteNombre || `Estudiante ${i + 1}`}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {s.materiaNombre || "Materia Académica"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-primary font-bold mb-1">
                          <span className="material-symbols-outlined text-sm">
                            schedule
                          </span>
                          <span>
                            {s.programadaPara
                              ? new Date(s.programadaPara).toLocaleString([], {
                                timeZone: "UTC",
                              })
                              : "Pendiente"}
                          </span>
                        </div>
                        <span className="text-[0.65rem] uppercase tracking-widest font-bold text-academic-gold px-2 py-1 bg-academic-gold/10 rounded">
                          {s.estado || "Programada"}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">No tienes sesiones programadas.</p>
              )}
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4 space-y-8">
            

            {/* Nueva Sección de Insignias */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10 shadow-sm space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-headline font-bold text-xl text-primary tracking-tight">Mis Logros</h3>
                <span className="material-symbols-outlined text-academic-gold" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              
              {tutorData?.insignias?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {tutorData.insignias.map(insignia => (
                    <div key={insignia.id} className="flex flex-col items-center gap-2">
                      <BadgeIcon insignia={insignia} size="md" />
                      <span className="text-[10px] font-bold text-center uppercase tracking-tighter text-elegant-gray line-clamp-1 w-full">
                        {insignia.nombre}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-outline-variant/10 rounded-xl">
                  <p className="text-sm text-elegant-gray mb-1">Aún no tienes insignias.</p>
                  <p className="text-[10px] text-gray-400">¡Sigue dictando clases para obtenerlas!</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </MainLayout>
  );
};

export default DashboardTutor;