import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import NextSessions from "../features/dashboard/NextSessions/NextSessions";
import PendingAssignments from "../features/dashboard/PendingAssignments/PendingAssignments";
import PendingPayments from "../features/dashboard/PendingPayments/PendingPayments";
import AcademicCalendar from "../features/dashboard/AcademicCalendar/AcademicCalendar";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import NotificationWidget from "../features/dashboard/NotificationWidget/NotificationWidget";
import SemesterProgressWidget from "../features/dashboard/SemesterProgressWidget/SemesterProgressWidget";

const DashboardStudent = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    upcomingSessionsCount: 0,
    activeCoursesCount: 0,
    notificationCount: 0,
    semesterProgress: 0,
  });

  useEffect(() => {
    if (user?.id) {
      api
        .get(`/estudiantes/${user.id}/dashboard-stats`)
        .then((data) => setStats(data))
        .catch((err) => console.error("Error cargando estadísticas:", err));
      
      // Cargar datos para el calendario
      api.get(`/sesiones/estudiante/${user.id}`)
        .then(data => setSessions(data || []))
        .catch(err => console.error("Error cargando sesiones para calendario:", err));
        
      api.get(`/solicitudes/estudiante/${user.id}`)
        .then(data => setSolicitudes(data || []))
        .catch(err => console.error("Error cargando solicitudes para calendario:", err));
    }
  }, [user]);

  useEffect(() => {
    const handlePaymentConfirmation = async () => {
      const fullUrl = window.location.href;
      const urlObj = new URL(fullUrl.replace('#/', ''));
      const searchParams = new URLSearchParams(urlObj.search || window.location.search);

      const status = searchParams.get('status');
      const externalReference = searchParams.get('external_reference');

      if (status === 'approved' && externalReference) {
        try {
          await api.post('/pagos/confirmar', { solicitudId: externalReference });
          alert("¡Pago confirmado exitosamente!");
          window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
        } catch (error) {
          console.error("Error al confirmar el pago:", error);
        }
      }
    };
    handlePaymentConfirmation();
  }, []);

  useEffect(() => {
    const activeSessions = sessions.filter(s => s.estado !== 'cancelada' && s.estado !== 'no_asistio');
    
    const formattedSessions = activeSessions.map((s) => {
      // Usamos el string original y eliminamos UTC/Z para tratarlo como local
      const startStr = s.programadaPara ? s.programadaPara.replace(/Z$|\+00:00$/, "") : "";
      const startDate = new Date(startStr);
      
      // Calculamos fin basado en duración
      const endDate = new Date(startDate.getTime() + (s.duracionMin || 90) * 60000);
      
      // Formateamos horas para el tooltip/vista
      const horaInicio = startDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const horaFin = endDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

      // IMPORTANTE: Para evitar que FullCalendar estire el block si cruza la medianoche en vista mes,
      // formateamos el ISO local manualmente sin milisegundos si es posible
      const pad = (n) => String(n).padStart(2, '0');
      const toLocalISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

      return {
        id: `session-${s.id}`,
        title: `Tutoría: ${s.materiaNombre}`,
        start: toLocalISO(startDate),
        end: toLocalISO(endDate),
        extendedProps: {
          ...s,
          type: "Sesión",
          category: s.materiaNombre,
          status: s.estado,
          time: `${horaInicio} - ${horaFin}`,
          colorType: "academic-blue",
        },
      };
    });

    const calendarSolicitudes = solicitudes.filter((s) => {
      const estadoUpper = s.estado?.toUpperCase();
      return (estadoUpper === "PENDIENTE" || estadoUpper === "ACEPTADA") && !s.pagada;
    });

    const formattedCalendarSolicitudes = calendarSolicitudes.map((s) => {
      try {
        const [yy, mm, dd] = s.fechaPreferida.split('-');
        const [hh, min] = s.horaPreferida.split(':');
        
        const startDate = new Date(yy, mm - 1, dd, hh, min);
        const endDate = new Date(startDate.getTime() + (s.duracionMin || 90) * 60000);

        const pad = (n) => String(n).padStart(2, '0');
        const toLocalISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

        const horaInicioShort = `${pad(hh)}:${pad(min)}`;
        const horaFinShort = `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;

        return {
          id: `solicitud-${s.id}`,
          title: s.estado?.toUpperCase() === "ACEPTADA" ? `⚠️ Pagar: ${s.materiaNombre}` : `Solicitud: ${s.materiaNombre}`,
          start: toLocalISO(startDate),
          end: toLocalISO(endDate),
          extendedProps: { 
            ...s, 
            type: "Solicitud", 
            category: s.materiaNombre, 
            status: s.estado, 
            statusLabel: s.estado?.toUpperCase() === "ACEPTADA" ? "Aceptada (Por Pagar)" : s.estado, 
            time: `${horaInicioShort} - ${horaFinShort}`, 
            colorType: "academic-gold" 
          },
        };
      } catch (err) {
        return null;
      }
    }).filter(Boolean);

    setEvents([...formattedSessions, ...formattedCalendarSolicitudes]);
  }, [sessions, solicitudes]);

  return (
    <MainLayout>
      <main className="p-4 md:p-10">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-16">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">Estudiante Pregrado</p>
            <h1 className="text-3xl md:text-6xl font-extrabold font-headline text-primary tracking-tight leading-tight">Mi Librería de Aprendizaje</h1>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mb-10 md:mb-20">
          <article className="col-span-12 md:col-span-8 space-y-12">
            <div className="bg-white p-2 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-6 font-headline">Calendario Académico</h3>
              <div className="w-full overflow-x-auto">
                <div className="min-w-[600px]">
                  <AcademicCalendar events={events} />
                </div>
              </div>
            </div>

            <PendingPayments userId={user?.id} />
            <NextSessions userId={user?.id} isTutor={false} />
            <PendingAssignments userId={user?.id} />
          </article>

          <aside className="col-span-12 md:col-span-4 space-y-10">
            <SemesterProgressWidget 
              title="Tutorías del Semestre"
              metricLabel="Sesiones Tomadas"
              endpoint="/students/{id}/sessions-progress"
            />
            <SemesterProgressWidget 
              title="Tareas y Actividades"
              metricLabel="Actividades Completadas"
              endpoint="/students/{id}/activities-progress"
            />
          </aside>
        </section>
      </main>
    </MainLayout>
  );
};

export default DashboardStudent;