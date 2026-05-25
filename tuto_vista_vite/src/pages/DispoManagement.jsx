import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import AcademicCalendar from '../features/dashboard/AcademicCalendar/AcademicCalendar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { HourlyRateCard } from '../features/tutors/HourlyRateCard/HourlyRateCard';
import StatCard from '../components/ui/StatCard/StatCard';

const DispoManagement = () => {
   const { user } = useAuth();
   const [disponibilidad, setDisponibilidad] = useState([]);
   const [hourlyRate, setHourlyRate] = useState(0); 
   const [loading, setLoading] = useState(true);

   const mapDispoToEvents = useCallback((dispoList) => {
      return dispoList.map(d => {
         const startFmt = d.horaInicio.substring(0, 5); 
         const endFmt = d.horaFin.substring(0, 5);
         return {
            id: d.id,
            title: `${startFmt} - ${endFmt}`,
            daysOfWeek: [d.diaSemana],
            startTime: d.horaInicio,
            endTime: d.horaFin,
            extendedProps: { type: 'Disponibilidad', status: 'Activo', time: `${startFmt} - ${endFmt}` },
            color: '#aa3bff',
         };
      });
   }, []);

   const loadDisponibilidad = useCallback(async () => {
      if (!user?.id) return;
      try {
         const [dispoData, tutorProfile] = await Promise.all([
            api.get(`/disponibilidad/tutor/${user.id}`),
            api.get(`/tutores/${user.id}`)
         ]);

         setDisponibilidad(mapDispoToEvents(dispoData));
         setHourlyRate(tutorProfile?.precio_por_hora || 0);
      } catch (err) {
         console.error('Error cargando los datos de configuración:', err);
      } finally {
         setLoading(false);
      }
   }, [user, mapDispoToEvents]);

   useEffect(() => {
      loadDisponibilidad();
   }, [loadDisponibilidad]);

   const handleSaveRate = async (newRate) => {
      try {
         await api.patch(`/perfiles/tutor/${user.id}`, {
            precio_por_hora: newRate
         });
         setHourlyRate(newRate); 
      } catch (err) {
         console.error('Error actualizando la tarifa:', err);
         alert('No se pudo guardar la nueva tarifa.');
         throw err; 
      }
   };

   const handleSelect = async (info) => {
      const diaSemana = info.start.getDay();
      const horaInicio = info.start.toTimeString().split(' ')[0];
      const horaFin = info.end.toTimeString().split(' ')[0];

      try {
         await api.post('/disponibilidad', {
            tutorId: user.id,
            diaSemana,
            horaInicio,
            horaFin,
            estaActivo: true
         });
         const data = await api.get(`/disponibilidad/tutor/${user.id}`);
         setDisponibilidad(mapDispoToEvents(data));
      } catch (err) {
         console.error('Error guardando bloque:', err);
         alert('Error guardando bloque de disponibilidad.');
      }
   };

   const handleEventClick = async (info) => {
      if (window.confirm('¿Deseas eliminar este bloque de disponibilidad?')) {
         try {
            await api.delete(`/disponibilidad/${info.event.id}`);
            const data = await api.get(`/disponibilidad/tutor/${user.id}`);
            setDisponibilidad(mapDispoToEvents(data));
         } catch (err) {
            console.error('Error eliminando bloque:', err);
         }
      }
   };

   const formattedRate = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
   }).format(hourlyRate || 0);

   return (
      <MainLayout>
         <div className="flex flex-col flex-1 w-full">
            {/* Cabecera extendida con px-6 lg:px-12 */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-6 lg:px-12 py-5 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
               <span className="text-xl font-bold text-primary font-display">Configuración de Horarios</span>
               <div className="flex gap-4">
                  <p className="text-sm text-gray-500 my-auto">Tus cambios se guardan automáticamente</p>
               </div>
            </header>

            {/* MEJORA 1: Cambiado p-4 md:p-10 a px-6 lg:px-12 py-8 para dar más aire en los bordes de la pantalla */}
            <main className="flex-1 px-6 lg:px-12 py-8 w-full">
               
               {/* MEJORA 2: Reemplazado max-w-7xl por max-w-[1800px] o w-full para obligar a los elementos a estirarse horizontalmente */}
               <div className="w-full max-w-[1700px] mx-auto">
                  
                  <header className="mb-8">
                     <h1 className="text-3xl md:text-4xl font-extrabold text-primary font-display mb-2">Gestión de Disponibilidad</h1>
                     <p className="text-gray-600 text-sm md:text-base">Haz click y arrastra sobre las horas para definir tus bloques disponibles.</p>
                  </header>

                  {loading ? (
                     <div className="text-center p-12 text-gray-500">Cargando configuraciones de tutoría...</div>
                  ) : (
                     
                     /* MEJORA 3: Ajustada la proporción del Grid en escritorios (xl:). 
                        El calendario ahora toma 9 columnas (75%) y las tarjetas bajan a 3 columnas (25%) para dar máximo espacio al calendario */
                     <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-8 items-start w-full">

                        {/* Columna Izquierda: Calendario (Ampliado a lg:col-span-8 y xl:col-span-9) */}
                        <div className="lg:col-span-8 xl:col-span-9 bg-white p-5 md:p-8 rounded-xl shadow-sm border border-gray-100 w-full">
                           <AcademicCalendar
                              events={disponibilidad}
                              initialView="timeGridWeek"
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

                        {/* Columna Derecha: Tarjetas Laterales (Ajustadas a lg:col-span-4 y xl:col-span-3) */}
                        <div className="lg:col-span-4 xl:col-span-3 space-y-6 w-full">

                           {/* Widget Informativo Superior */}
                           <StatCard
                              label="Tarifa Vigente Actual"
                              value={formattedRate}
                              icon="payments"
                              gradient={true}
                           />

                           {/* Formulario de Modificación de Honorarios */}
                           <HourlyRateCard
                              initialRate={hourlyRate}
                              onSaveRate={handleSaveRate}
                           />
                        </div>

                     </div>
                  )}
               </div>
            </main>
         </div>
      </MainLayout>
   );
};

export default DispoManagement;