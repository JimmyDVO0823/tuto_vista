import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import NextSessions from "../features/dashboard/NextSessions/NextSessions";
import PendingAssignments from "../features/dashboard/PendingAssignments/PendingAssignments";
import AcademicCalendar from "../features/dashboard/AcademicCalendar/AcademicCalendar";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import NotificationsWidget from "../features/dashboard/NotificationWidget/NotificationWidget";
import SemesterProgressWidget from "../features/dashboard/SemesterProgressWidget/SemesterProgressWidget";
import { BotonPagoSimulado } from "../components/ui/Button/BotonPagoSimulado";
import ActivityCard from "../features/dashboard/ActivityCard/ActivityCard";

const DashboardStudent = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentConfirmation = async () => {
      const fullUrl = window.location.href;
      const urlObj = new URL(fullUrl.replace('#/', ''));
      const searchParams = new URLSearchParams(urlObj.search || window.location.search);

      const status = searchParams.get('status');
      const externalReference = searchParams.get('external_reference');

      if (status === 'approved' && externalReference) {
        try {
          setLoading(true);
          await api.post('/pagos/confirmar', { solicitudId: externalReference });
          alert("¡Pago confirmado exitosamente! Tu sesión de tutoría ha sido programada.");

          const cleanUrl = window.location.href.split('?')[0];
          window.history.replaceState({}, document.title, cleanUrl);
        } catch (error) {
          console.error("Error al confirmar el pago:", error);
          alert("Hubo un error al confirmar tu pago en el servidor.");
        }
      }
    };

    if (user?.id) {
      handlePaymentConfirmation().then(() => {
        Promise.all([
          api.get(`/sesiones/estudiante/${user.id}`).then(setSessions),
          api.get(`/solicitudes/estudiante/${user.id}`).then(setSolicitudes),
        ])
          .catch((err) =>
            console.error("Error cargando datos del dashboard:", err),
          )
          .finally(() => setLoading(false));
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // 1. Formatear sesiones (Ya pagadas y programadas, excluyendo canceladas o inasistencias)
    const activeSessions = sessions.filter(s => s.estado !== 'cancelada' && s.estado !== 'no_asistio');
    const formattedSessions = activeSessions.map((s) => {
      const fechaLocalString = s.programadaPara
        ? s.programadaPara.replace(/Z$|\+00:00$/, "")
        : "";
      const fechaBase = new Date(fechaLocalString);

      const horaInicio = fechaBase.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const horaFin = new Date(fechaBase.getTime() + (s.duracionMin || 60) * 60000)
        .toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

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
          time: `${horaInicio} - ${horaFin}`,
          colorType: "academic-blue",
        },
      };
    });

    // 2. Filtrar y formatear solicitudes (Pendientes y Aceptadas)
    const calendarSolicitudes = solicitudes.filter((s) => {
      const estadoUpper = s.estado?.toUpperCase();
      return (estadoUpper === "PENDIENTE" || estadoUpper === "ACEPTADA") && !s.pagada;
    });

    const formattedCalendarSolicitudes = calendarSolicitudes.map((s) => {
      try {
        const fecha = s.fechaPreferida;
        const horaCompleta = s.horaPreferida;

        const [hh, mm] = horaCompleta.split(':');
        const horaInicioShort = `${hh.padStart(2, '0')}:${mm.padStart(2, '0')}`;
        const startISO = `${fecha}T${horaInicioShort}:00`;

        const duracion = s.duracionMin || 60;
        const totalMinutosInicio = parseInt(hh, 10) * 60 + parseInt(mm, 10);
        const totalMinutosFin = totalMinutosInicio + duracion;

        const horasFinNum = Math.floor(totalMinutosFin / 60);
        const minutosFinNum = totalMinutosFin % 60;

        const hrsFinStr = String(horasFinNum).padStart(2, '0');
        const minsFinStr = String(minutosFinNum).padStart(2, '0');
        const endISO = `${fecha}T${hrsFinStr}:${minsFinStr}:00`;

        return {
          id: `solicitud-${s.id}`,
          title: s.estado?.toUpperCase() === "ACEPTADA" ? `⚠️ Pagar: ${s.materiaNombre}` : `Solicitud: ${s.materiaNombre}`,
          start: startISO,
          end: endISO,
          extendedProps: {
            ...s,
            type: "Solicitud",
            category: s.materiaNombre,
            status: s.estado, // 👈 Se mantiene limpio ("aceptada") para que pase los filtros de FullCalendar
            statusLabel: s.estado?.toUpperCase() === "ACEPTADA" ? "Aceptada (Por Pagar)" : s.estado, // 👈 Para la tarjeta Hover
            time: `${horaInicioShort} - ${hrsFinStr}:${minsFinStr}`,
            colorType: "academic-gold",
          },
        };
      } catch (err) {
        console.error(`Error procesando solicitud ID ${s?.id}:`, err);
        return null;
      }
    }).filter(Boolean);

    setEvents([...formattedSessions, ...formattedCalendarSolicitudes]);
  }, [sessions, solicitudes]);

  // Helper para validar la vigencia de la sección inferior "Por Pagar" usando texto plano
  const filtrarPorPagarVigente = (s) => {
    if (s.estado?.toUpperCase() !== "ACEPTADA" || s.pagada) return false;

    const hoyString = new Date().toISOString().split('T')[0];
    if (s.fechaPreferida > hoyString) return true;
    if (s.fechaPreferida === hoyString) {
      const ahoraHora = new Date().toLocaleTimeString('es-ES', { hour12: false, hour: '2-digit', minute: '2-digit' });
      return s.horaPreferida >= ahoraHora;
    }
    return false;
  };

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
              <div className="bg-white p-2 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-2xl font-bold text-primary mb-6 font-headline">
                  Calendario Académico
                </h3>
                <div className="w-full overflow-x-auto">
                  <div className="min-w-[600px]">
                    <AcademicCalendar events={events} />
                  </div>
                </div>
              </div>

              {/* Sección de Tutorías Aceptadas esperando Pago */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-primary font-headline">
                  Por Pagar
                </h3>
                <div className="space-y-4">
                  {solicitudes
                    .filter(filtrarPorPagarVigente)
                    .map((soli, i) => {
                      const montoTotal = Math.round(
                        (soli.duracionMin / 60) * (soli.precioPorHora || 0),
                      );
                      return (
                        <ActivityCard
                          key={soli.id || i}
                          initial={soli.materiaNombre?.charAt(0) || "A"}
                          title={soli.materiaNombre || "Solicitud Aceptada"}
                          subtitle={`Tutor: ${soli.tutorNombre || "Pendiente"}`}
                          time={`${soli.fechaPreferida} ${soli.horaPreferida}`}
                          buttonText="Ver Detalles"
                          actionPath="#"
                          extraContent={
                            <BotonPagoSimulado monto={montoTotal} solicitudId={soli.id} />
                          }
                        />
                      );
                    })}
                  {solicitudes.filter(filtrarPorPagarVigente).length === 0 && (
                    <p className="text-gray-400 italic text-sm">
                      No tienes tutorías pendientes de pago.
                    </p>
                  )}
                </div>
              </div>

              <NextSessions sessions={sessions.filter(s => s.estado === 'programada' && s.programadaPara && new Date(s.programadaPara) >= new Date())} isTutor={false} />
              <PendingAssignments />
            </article>

            <aside className="col-span-12 md:col-span-4 space-y-10">
              {/*<SemesterProgressWidget />*/}
              {/*<NotificationsWidget />*/}
            </aside>
          </section>
        )}
      </main>
    </MainLayout>
  );
};

export default DashboardStudent;