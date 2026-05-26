import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import NextSessions from "../features/dashboard/NextSessions/NextSessions";
import PendingAssignments from "../features/dashboard/PendingAssignments/PendingAssignments";
import AcademicCalendar from "../features/dashboard/AcademicCalendar/AcademicCalendar";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import NotificationsWidget from "../features/dashboard/NotificationWidget/NotificationWidget";
import SemesterProgressWidget from "../features/dashboard/SemesterProgressWidget/SemesterProgressWidget";
import { BotonPagoMercadoPago } from "../components/ui/Button/BotonPagoMercadoPago";
import PorPagarSessions from "../features/dashboard/PorPagarSessions/PorPagarSessions";

const DashboardStudent = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      // Cargar sesiones y solicitudes en paralelo
      Promise.all([
        api.get(`/sesiones/estudiante/${user.id}`).then(setSessions),
        api.get(`/solicitudes/estudiante/${user.id}`).then(setSolicitudes),
      ])
        .catch((err) =>
          console.error("Error cargando datos del dashboard:", err),
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const now = new Date();

    // 1. Formatear sesiones (Ya pagadas y programadas) - SOLO FUTURAS
    const formattedSessions = sessions
      .filter(s => {
        const fechaLocalString = s.programadaPara ? s.programadaPara.replace(/Z$|\+00:00$/, "") : "";
        return new Date(fechaLocalString) > now;
      })
      .map((s) => {
        const fechaLocalString = s.programadaPara ? s.programadaPara.replace(/Z$|\+00:00$/, "") : "";
        const fechaBase = new Date(fechaLocalString);

        return {
          id: `session-${s.id}`,
          title: `Tutoría: ${s.materiaNombre}`,
          start: fechaLocalString,
          end: new Date(fechaBase.getTime() + (s.duracionMin || 60) * 60000)
            .toISOString()
            .replace(/Z$|\+00:00$/, ""),
          extendedProps: {
            ...s,
            type: "Sesión",
            category: s.materiaNombre,
            status: s.estado,
            colorType: "academic-blue",
          },
        };
      });

    // 2. FILTRAR Y FORMATEAR SOLICITUDES
    // - PENDIENTES: Van al calendario con color oro (Solo futuras)
    const formattedCalendarSolicitudes = solicitudes
      .filter((s) => {
        const isPending = s.estado?.toUpperCase() === "PENDIENTE";
        const dateStr = `${s.fechaPreferida}T${s.horaPreferida}`;
        return isPending && new Date(dateStr) > now;
      })
      .map((s) => ({
        id: `solicitud-${s.id}`,
        title: `Solicitud: ${s.materiaNombre}`,
        start: `${s.fechaPreferida}T${s.horaPreferida}`,
        end: new Date(
          new Date(`${s.fechaPreferida}T${s.horaPreferida}`).getTime() +
            (s.duracionMin || 60) * 60000,
        ).toISOString(),
        extendedProps: {
          ...s,
          type: "Solicitud",
          category: s.materiaNombre,
          status: s.estado,
          colorType: "academic-gold",
        },
      }));

    // 3. Fusionar para el calendario
    setEvents([...formattedSessions, ...formattedCalendarSolicitudes]);
  }, [sessions, solicitudes]);

  return (
    <MainLayout>
      <main className="p-4 md:p-10">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">
              Estudiante Pregrado
            </p>
            <h1 className="text-3xl md:text-6xl font-extrabold font-headline text-primary tracking-tight leading-tight">
              Mi Librería de Aprendizaje
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
              <span className="material-symbols-outlined text-academic-gold">
                military_tech
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Scholar Level 4
              </span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-20">
            <article className="col-span-12 md:col-span-8 space-y-12">
              <div className="bg-white p-4 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-6 font-headline">
                  Calendario Académico
                </h3>
                <AcademicCalendar events={events} />
              </div>

              {/* Nueva sección modularizada */}
              <PorPagarSessions solicitudes={solicitudes} />
              
              <NextSessions sessions={sessions} isTutor={false} />
              <PendingAssignments />
            </article>

            <aside className="col-span-12 md:col-span-4 space-y-10">
              <SemesterProgressWidget />
              <NotificationsWidget />
            </aside>
          </section>
        )}
      </main>
    </MainLayout>
  );
};

export default DashboardStudent;
