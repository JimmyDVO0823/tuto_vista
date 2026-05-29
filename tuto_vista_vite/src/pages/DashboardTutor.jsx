import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import IncomeChart from "../features/dashboard/IncomeChart/IncomeChart";
import StatCard from "../components/ui/StatCard/StatCard";
import NextSessions from "../features/dashboard/NextSessions/NextSessions";
import BadgeIcon from "../components/common/BadgeIcon";

const DashboardTutor = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    hoursThisMonth: 0,
    incomeLastMonth: 0,
  });
  const [tutorData, setTutorData] = useState(null);

  useEffect(() => {
    if (user?.id) {
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

  const formattedIncome = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(stats.incomeLastMonth || 0);

  return (
    <MainLayout>
      <main className="p-4 md:p-10">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.1em] text-academic-gold mb-2">Panel del Instructor</p>
            <h1 className="text-3xl md:text-5xl font-extrabold font-headline text-primary tracking-tight">Bienvenido, {user?.name || "Tutor"}.</h1>
          </div>
          <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-6 shadow-sm border border-gray-100">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Estado Actual</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${tutorData?.esta_disponible ? "bg-academic-gold" : "bg-gray-300"}`} />
                <p className={`text-sm font-bold ${tutorData?.esta_disponible ? "text-primary" : "text-gray-400"}`}>
                  {tutorData?.esta_disponible ? "Disponible para Clases" : "No Disponible"}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 md:mb-12">
          <StatCard label="Horas dictadas este mes" value={stats.hoursThisMonth?.toFixed(1) || "0.0"} icon="history_edu" color="border-primary" />
          <StatCard label="Calificación promedio" value={stats.averageRating?.toFixed(2) || "0.00"} icon="star" color="border-academic-gold" highlight={stats.averageRating >= 4.5 ? "TOP" : null} />
          <StatCard label="Ingresos el mes pasado" value={formattedIncome} icon="payments" gradient={true} />
        </div>

        <IncomeChart tutorId={user?.id} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 mt-12">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <NextSessions userId={user?.id} isTutor={true} />
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