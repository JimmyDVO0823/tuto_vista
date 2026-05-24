import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import AcademicCalendar from '../features/dashboard/AcademicCalendar/AcademicCalendar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const DispoManagement = () => {
   const { user } = useAuth();
   const [disponibilidad, setDisponibilidad] = useState([]);
   const [loading, setLoading] = useState(true);

   // Map 0=Sunday..6=Saturday to strings or standard dates for FullCalendar
   const mapDispoToEvents = useCallback((dispoList) => {
      return dispoList.map(d => {
         const startFmt = d.horaInicio.substring(0, 5); // "06:00"
         const endFmt = d.horaFin.substring(0, 5);
         return {
            id: d.id,
            title: `${startFmt} - ${endFmt}`,
            daysOfWeek: [d.diaSemana], // 0=Sunday
            startTime: d.horaInicio,
            endTime: d.horaFin,
            extendedProps: { type: 'Disponibilidad', status: 'Activo', time: `${startFmt} - ${endFmt}` },
            color: '#aa3bff', // Accent color to differentiate
         };
      });
   }, []);

   const loadDisponibilidad = useCallback(async () => {
      if (!user?.id) return;
      try {
         const data = await api.get(`/disponibilidad/tutor/${user.id}`);
         setDisponibilidad(mapDispoToEvents(data));
      } catch (err) {
         console.error('Error cargando disponibilidad:', err);
      } finally {
         setLoading(false);
      }
   }, [user, mapDispoToEvents]);

   useEffect(() => {
      loadDisponibilidad();
   }, [loadDisponibilidad]);

   const handleSelect = async (info) => {
      const diaSemana = info.start.getDay(); // 0=Sun, 1=Mon, etc.
      const horaInicio = info.start.toTimeString().split(' ')[0]; // HH:mm:ss
      const horaFin = info.end.toTimeString().split(' ')[0];

      try {
         await api.post('/disponibilidad', {
            tutorId: user.id,
            diaSemana,
            horaInicio,
            horaFin,
            estaActivo: true
         });
         loadDisponibilidad(); // Reload from backend
      } catch (err) {
         console.error('Error guardando bloque:', err);
         alert('Error guardando bloque de disponibilidad.');
      }
   };

   const handleEventClick = async (info) => {
      if (window.confirm('¿Deseas eliminar este bloque de disponibilidad?')) {
         try {
            await api.delete(`/disponibilidad/${info.event.id}`);
            loadDisponibilidad();
         } catch (err) {
            console.error('Error eliminando bloque:', err);
         }
      }
   };

   return (
      <MainLayout>
         <div className="flex flex-col flex-1">
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-4 md:px-8 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
               <span className="text-xl font-bold text-primary font-display">Configuración de Horarios</span>
               <div className="flex gap-4">
                  <p className="text-sm text-gray-500 my-auto">Tus cambios se guardan automáticamente</p>
               </div>
            </header>

            <main className="flex-1 p-4 md:p-10">
               <div className="max-w-7xl mx-auto">
                  <header className="mb-12">
                     <h1 className="text-2xl md:text-4xl font-extrabold text-primary font-display mb-4">Gestión de Disponibilidad</h1>
                     <p className="text-gray-600 text-lg">Haz click y arrastra sobre las horas para definir tus bloques disponibles.</p>
                  </header>

                  {!loading && (
                     <div className="overflow-x-auto">
                        <AcademicCalendar
                           events={disponibilidad}
                           initialView="dayGridMonth"
                           headerToolbar={{
                              left: 'prev,next today',
                              center: 'title',
                              right: 'dayGridMonth,timeGridWeek'
                           }}
                           selectable={true}
                           editable={false}
                           onSelect={handleSelect}
                           onEventClick={handleEventClick}
                           slotMinTime="06:00:00"
                           slotMaxTime="22:00:00"
                           allDaySlot={false}
                        />
                     </div>
                  )}
               </div>
            </main>
         </div>
      </MainLayout>
   );
};

export default DispoManagement;
