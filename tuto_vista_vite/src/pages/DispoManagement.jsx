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
         // Paralelizar las peticiones de disponibilidad y el perfil según tu API_TUTO.json
         const [dispoData, tutorProfile] = await Promise.all([
            api.get(`/disponibilidad/tutor/${user.id}`),
            api.get(`/tutores/${user.id}`) // <- CORREGIDO: Endpoint correcto para obtener los datos del tutor
         ]);

         setDisponibilidad(mapDispoToEvents(dispoData));
         // <- CORREGIDO: Mapeamos con el campo real de tu DTO/Esquema 'precio_por_hora'
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

   // Manejador para actualizar los honorarios desde el backend
   const handleSaveRate = async (newRate) => {
      try {
         // <- CORREGIDO: Apunta de forma exacta al @PatchMapping("/tutor/{id}") de tu PerfilController
         // e incluye en el cuerpo el campo estructurado de tu TutorUpdateDTO: precio_por_hora
         await api.patch(`/perfiles/tutor/${user.id}`, {
            precio_por_hora: newRate
         });

         setHourlyRate(newRate); // Sincroniza el estado local de forma reactiva
      } catch (err) {
         console.error('Error actualizando la tarifa:', err);
         alert('No se pudo guardar la nueva tarifa.');
         throw err; // Lanza el error para que HourlyRateCard muestre su feedback visual de error
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

   // Formateador de moneda integrado localmente para representar el valor de forma elegante
   const formattedRate = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
   }).format(hourlyRate || 0);

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
                  <header className="mb-8 md:mb-12">
                     <h1 className="text-3xl md:text-4xl font-extrabold text-primary font-display mb-3 md:mb-4">Gestión de Disponibilidad</h1>
                     <p className="text-gray-600 text-md md:text-lg">Haz click y arrastra sobre las horas para definir tus bloques disponibles.</p>
                  </header>

                  {loading ? (
                     <div className="text-center p-12 text-gray-500">Cargando configuraciones de tutoría...</div>
                  ) : (
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Columna Izquierda: Calendario (8 de 12 columnas) */}
                        <div className="lg:col-span-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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

                        {/* Columna Derecha: Widgets de Tarifa y Modificación (4 de 12 columnas) */}
                        <div className="lg:col-span-4 space-y-8">

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