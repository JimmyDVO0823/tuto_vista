import React, { useState, useEffect, useCallback } from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import AcademicCalendar from '../features/dashboard/AcademicCalendar/AcademicCalendar';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { HourlyRateCard } from '../features/tutors/HourlyRateCard/HourlyRateCard';

const DispoManagement = () => {
   const { user } = useAuth();
   const [disponibilidad, setDisponibilidad] = useState([]);
   const [hourlyRate, setHourlyRate] = useState(0); // Estado para el precio por hora
   const [loading, setLoading] = useState(true);

   // Mapeo de 0=Sunday..6=Saturday a estándar de FullCalendar
   const mapDispoToEvents = useCallback((dispoList) => {
      return dispoList.map(d => {
         const startFmt = d.horaInicio.substring(0, 5); // "06:00"
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
         // Paralelizar las peticiones de disponibilidad y tarifa del tutor para optimizar la carga
         const [dispoData, tutorProfile] = await Promise.all([
            api.get(`/disponibilidad/tutor/${user.id}`),
            api.get(`/api/v1/tutors/profile`) // Ajusta este endpoint según tu backend real
         ]);

         setDisponibilidad(mapDispoToEvents(dispoData));
         setHourlyRate(tutorProfile?.hourlyRate || 45); // Setea la tarifa inicial (ej: 45 por defecto)
      } catch (err) {
         console.error('Error cargando los datos de configuración:', err);
      } finally {
         setLoading(false);
      }
   }, [user, mapDispoToEvents]);

   useEffect(() => {
      loadDisponibilidad();
   }, [loadDisponibilidad]);

   // Manejador para actualizar los honorarios desde el backend
   const handleSaveRate = async (newRate) => {
      // Petición PATCH/PUT para guardar el nuevo precio
      await api.patch('/api/v1/tutors/hourly-rate', { hourlyRate: newRate });
      setHourlyRate(newRate); // Sincroniza el estado local tras una respuesta 2xx exitosa
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
         // Refrescar únicamente los bloques del calendario
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

   return (
      <MainLayout>
         <div className="flex flex-col flex-1">
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
               <span className="text-xl font-bold text-primary font-display">Configuración de Horarios</span>
               <div className="flex gap-4">
                  <p className="text-sm text-gray-500 my-auto">Tus cambios se guardan automáticamente</p>
               </div>
            </header>

            <main className="flex-1 p-10">
               <div className="max-w-7xl mx-auto">
                  <header className="mb-12">
                     <h1 className="text-4xl font-extrabold text-primary font-display mb-4">Gestión de Disponibilidad</h1>
                     <p className="text-gray-600 text-lg">Haz click y arrastra sobre las horas para definir tus bloques disponibles.</p>
                  </header>

                  {loading ? (
                     <div className="text-center p-12 text-gray-500">Cargando configuraciones de tutoría...</div>
                  ) : (
                     /* Layout Grid en dos columnas: 12 columnas en total */
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Columna Izquierda: Calendario (8 de 12 columnas) */}
                        <div className="lg:col-span-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                           <AcademicCalendar
                              events={disponibilidad}
                              initialView="timeGridWeek" // Cambiado a vista semanal por usabilidad al arrastrar horas
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

                        {/* Columna Derecha: Configuración de Honorarios (4 de 12 columnas) */}
                        <div className="lg:col-span-4 space-y-8">
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