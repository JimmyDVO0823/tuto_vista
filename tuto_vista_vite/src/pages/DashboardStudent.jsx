import React, { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import NextSessions from '../components/features/dashboard/NextSessions/NextSessions';
import PendingAssignments from '../components/features/dashboard/PendingAssignments/PendingAssignments';
import AcademicCalendar from '../components/features/dashboard/AcademicCalendar/AcademicCalendar';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import NotificationsWidget from '../components/features/dashboard/NotificationWidget/NotificationWidget';

const DashboardStudent = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user?.id) {
      // Cargar sesiones aceptadas
      api.get(`/sesiones/estudiante/${user.id}`)
         .then(data => setSessions(data || []))
         .catch(err => console.error('Error cargando sesiones:', err));

      // Cargar solicitudes pendientes/rechazadas/etc.
      api.get(`/solicitudes/estudiante/${user.id}`)
         .then(data => setSolicitudes(data || []))
         .catch(err => console.error('Error cargando solicitudes:', err));
    }
  }, [user]);

  useEffect(() => {
    const formattedSessions = sessions.map(s => ({
      id: `session-${s.id}`,
      title: `Tutoría: ${s.materiaNombre}`,
      start: s.programadaPara,
      end: new Date(new Date(s.programadaPara).getTime() + (s.duracionMin || 60) * 60000).toISOString(),
      extendedProps: {
        type: 'Sesión',
        category: s.materiaNombre,
        time: new Date(s.programadaPara).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: s.estado,
        colorType: 'academic-blue'
      }
    }));

    const formattedSolicitudes = solicitudes.map(s => ({
      id: `solicitud-${s.id}`,
      title: `Solicitud: ${s.materiaNombre}`,
      start: `${s.fechaPreferida}T${s.horaPreferida}`,
      end: new Date(new Date(`${s.fechaPreferida}T${s.horaPreferida}`).getTime() + (s.duracionMin || 60) * 60000).toISOString(),
      extendedProps: {
        type: 'Solicitud',
        category: s.materiaNombre,
        time: s.horaPreferida,
        status: s.estado,
        colorType: 'academic-gold'
      }
    }));

    setEvents([...formattedSessions, ...formattedSolicitudes]);
  }, [sessions, solicitudes]);

  return (
    <MainLayout>
      <main className="p-10">
        <header className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.15em] font-medium text-academic-gold mb-3">Estudiante Pregrado</p>
            <h1 className="text-6xl font-extrabold font-headline text-primary tracking-tight leading-tight">Mi Librería de Aprendizaje</h1>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
               <span className="material-symbols-outlined text-academic-gold">military_tech</span>
               <span className="text-xs font-bold uppercase tracking-widest">Scholar Level 4</span>
             </div>
          </div>
        </header>

        <section className="grid grid-cols-12 gap-10 mb-20">
          <article className="col-span-8 space-y-10">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-6 font-headline">Calendario Académico</h3>
              <AcademicCalendar events={events} />
            </div>
            <NextSessions sessions={sessions} isTutor={false} />
            <PendingAssignments />
          </article>

          <aside className="col-span-4 space-y-10">
             <div className="bg-[#f2f4f6] p-8 rounded-2xl space-y-6">
                <h3 className="text-xl font-bold text-primary border-b border-gray-200 pb-4">Progreso Semestral</h3>
                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-xs font-bold uppercase text-gray-500">Objetivo del Semestre</span>
                      <span className="text-2xl font-black text-primary">78%</span>
                   </div>
                   <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                      <div className="h-full bg-academic-gold w-[78%]"></div>
                   </div>
                </div>
                <div className="pt-4 space-y-3">
                   <div className="flex items-center gap-3 text-sm font-bold text-primary">
                      <span className="material-symbols-outlined text-green-500">check_circle</span>
                      <span>Ensayo de Filosofía entregado</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm font-bold text-gray-400">
                      <span className="material-symbols-outlined">pending</span>
                      <span>Revisión de Tesis pendiente</span>
                   </div>
                </div>
             </div>

             <NotificationsWidget />
          </aside>
        </section>
      </main>
    </MainLayout>
  );
};

export default DashboardStudent;
