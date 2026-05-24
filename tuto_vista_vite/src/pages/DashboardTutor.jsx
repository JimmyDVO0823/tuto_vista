import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import IncomeChart from "../features/dashboard/IncomeChart/IncomeChart";
import StatCard from "../components/ui/StatCard/StatCard"; // Importación del nuevo componente

const DashboardTutor = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [stats, setStats] = useState({
    hoursThisMonth: 0,
    averageRating: 0,
    incomeLastMonth: 0,
  });

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
    }
  }, [user]);

  // Formateador de moneda colombiana integrado
  const formattedIncome = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0 // Quita decimales innecesarios para pesos colombianos
  }).format(stats.incomeLastMonth || 0);

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
                Disponible para clases
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input defaultChecked className="sr-only peer" type="checkbox" />
              <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-academic-gold after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full" />
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
        <div className="grid grid-cols-12 gap-8 mt-12">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-primary tracking-tight">
              Próximas Sesiones
            </h2>
            <div className="space-y-4">
              {sessions.length > 0 ? (
                sessions.map((s, i) => (
                  <div
                    key={s.id || i}
                    className="bg-white p-6 rounded-lg flex items-center justify-between group hover:translate-x-2 transition-transform duration-300 shadow-sm border border-gray-50"
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
            <div className="bg-academic-gold/10 text-primary p-8 rounded-lg relative overflow-hidden">
              <h3 className="font-headline font-bold text-xl mb-3">
                Sugerencia Editorial
              </h3>
              <p className="text-sm leading-relaxed mb-6 opacity-90">
                Mejora tus materiales para el próximo trimestre.
              </p>
              <button className="bg-primary text-white py-2 px-6 rounded-md text-xs font-bold uppercase tracking-wider">
                Revisar Biblioteca
              </button>
            </div>
          </aside>
        </div>
      </main>
    </MainLayout>
  );
};

export default DashboardTutor;